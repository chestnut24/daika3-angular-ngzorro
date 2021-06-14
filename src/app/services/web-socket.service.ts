import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';

import { API } from '../public/api';
import { AuthService } from './auth.service';

export interface CmdListOfOne {
    [key: string]: Array<{
        cmdId: number,
        entityId: string,
        unsubscribe: boolean
    }>;
}

@Injectable({
    providedIn: 'root'
})

export class WebSocketService {
    messageSubject;                                 // subject对象,用于发送事件
    private url;                                    // 默认请求的url
    private webSocket: WebSocket;                   // websocket对象
    connectSuccess = false;                         // websocket 连接成功
    period = 60 * 1000 * 15;                        // 15分钟检查一次
    serverTimeoutSubscription = null;               // 定时检测连接对象
    reconnectFlag = false;                          // 重连
    reconnectPeriod = 20 * 1000;                    // 重连失败,则20秒钟重连一次
    reconnectSubscription = null;                   // 重连订阅对象
    runTimeSubscription;                            // 记录运行连接subscription
    runTimePeriod = 60 * 10000;                     // 记录运行连接时间
    manualjudgement = false;                        // 判断是不是主动断开 false非主动，true主动

    // 自增ID
    cmdId = 0;
    // 发送过的数据组
    cmdList: Array<CmdListOfOne> = [];

    constructor(
        private tokenSer: AuthService,
    ) {
        this.messageSubject = new Subject();
        // console.log('开始心跳检测');
        // 进入程序就进行心跳检测,避免出现开始就连接中断,后续不重连
        this.heartCheckStart();
        this.calcRunTime();
    }

    /*发送消息*/
    sendMessage(message) {
        if (this.connectSuccess) {
            if (this.cmdList.indexOf(message) >= 0) {

            } else {
                this.cmdList.push(message);
            }
            this.webSocket.send(JSON.stringify(message));
        } else {
            this.cmdList.push(message);
        }
    }
    getReadyToConnect() {
        // 连接
        this.tokenSer.getAccessToken().subscribe(data => {
            if (data) {
                // 连接websocket-带参-职务人员等。
                const { hostname, port } = location;
                const wsUri = `${hostname}:${port}`;
                this.connect(`ws://${wsUri}${API.WS_TELEMETRY}?token=${data}`);
            }
        });
    }
    // 创建新连接
    connect(url) {
        if (!!url) {
            this.url = url;
        }
        // 创建websocket对象
        this.createWebSocket();
    }

    /*创建连接*/
    createWebSocket() {
        // 如果没有建立过连接，才建立连接并且添加时间监听
        this.webSocket = new WebSocket(this.url);
        this.manualjudgement = false;
        // 建立连接成功
        this.webSocket.onopen = (e) => this.onOpen(e);
        // 接收到消息
        this.webSocket.onmessage = (e) => this.onMessage(e);
        // 连接关闭
        this.webSocket.onclose = (e) => {
            if (this.manualjudgement) {
                // this.PageClose();
            } else {
                this.onClose(e);
            }
        };
        // 异常
        this.webSocket.onerror = (e) => this.onError(e);
    }

    /*连接打开*/
    onOpen(e) {
        // console.log('websocket 已连接');
        // 设置连接成功
        this.connectSuccess = true;
        if (this.cmdList && this.cmdList.length) {
            this.cmdList.forEach(item => {
                this.webSocket.send(JSON.stringify(item));
            });
        }

        // 如果是重连中
        if (this.reconnectFlag) {
            // 1.停止重连
            this.stopReconnect();
            // 2.重新开启心跳
            this.heartCheckStart();
            // 3.重新开始计算运行时间
            this.calcRunTime();
        }
    }

    /*接受到消息*/
    onMessage(event) {
        // console.log('接收到的消息', event.data);
        // 将接受到的消息发布出去
        const message = JSON.parse(event.data);
        // console.log('接收到消息时间', new Date().getTime());
        // 判断 sendList中id === message.id  next(new Map([[相同id的send对象, message]]))
        this.cmdList.forEach(item => {
            Object.values(item)[0].forEach(item2 => {
                if (item2.cmdId === message.subscriptionId) {
                    this.messageSubject.next(new Map([[item, message]]));
                }
            });
        });
    }

    /*连接关闭*/
    private onClose(e) {
        // console.log('连接关闭', e);
        this.connectSuccess = false;
        this.webSocket.close();
        // 关闭时开始重连
        this.reconnect();
        this.stopRunTime();
        // throw new Error('webSocket connection closed:)');
    }

    /*连接异常*/
    private onError(e) {
        // 出现异常时一定会进onClose,所以只在onClose做一次重连动作
        // console.log('连接异常', e);
        this.connectSuccess = false;
        // throw new Error('webSocket connection error:)');
    }

    /*开始重新连接*/
    reconnect() {
        // 如果已重连,则直接return,避免重复连接
        if (this.connectSuccess) {
            this.stopReconnect();
            // console.log('已经连接成功,停止重连');
            return;
        }
        // 如果正在连接中,则直接return,避免产生多个轮训事件
        if (this.reconnectFlag) {
            // console.log('正在重连,直接返回');
            return;
        }
        // 开始重连
        this.reconnectFlag = true;
        // 如果没能成功连接,则定时重连
        this.reconnectSubscription = interval(this.reconnectPeriod).subscribe(async (val) => {
            // console.log(`重连:${val}次`);
            // const url = this.url;
            // 重新连接
            // this.connect(url);
            this.getReadyToConnect();
        });
    }

    /*停止重连*/
    stopReconnect() {
        // 连接标识置为false
        this.reconnectFlag = false;
        // 取消订阅
        if (typeof this.reconnectSubscription !== 'undefined' && this.reconnectSubscription != null) {
            this.reconnectSubscription.unsubscribe();
        }
    }

    /*开始心跳检测*/
    heartCheckStart() {
        this.serverTimeoutSubscription = interval(this.period).subscribe((val) => {
            // 保持连接状态,重置下
            if (this.webSocket != null && this.webSocket.readyState === 1) {
                // console.log(val, '连接状态，发送消息保持连接');
            } else {
                // 停止心跳
                this.heartCheckStop();
                // 开始重连
                this.reconnect();
                // console.log('连接已断开,重新连接');
            }
        });
    }

    /*停止心跳检测*/
    heartCheckStop() {
        // 取消订阅停止心跳
        if (typeof this.serverTimeoutSubscription !== 'undefined' && this.serverTimeoutSubscription != null) {
            this.serverTimeoutSubscription.unsubscribe();
        }
    }

    /*开始计算运行时间*/
    calcRunTime() {
        this.runTimeSubscription = interval(this.runTimePeriod).subscribe(period => {
            // console.log('运行时间', `${period * 10}分钟`);
        });
    }

    /*停止计算运行时间*/
    stopRunTime() {
        if (typeof this.runTimeSubscription !== 'undefined' && this.runTimeSubscription !== null) {
            this.runTimeSubscription.unsubscribe();
        }
    }

    // 12-05新增，关闭连接，取消心跳监测
    PageClose() {
        if (this.connectSuccess) {
            this.connectSuccess = false;
            this.manualjudgement = true;
            this.stopReconnect();
            this.heartCheckStop();
            this.webSocket.close();
            // console.log('页面关闭前，关闭连接');
        } else {
            this.manualjudgement = true;
            this.stopReconnect();
            this.heartCheckStop();
        }
    }
    // 仅离开页面使用关闭该cmdId推送
    listDelete(data: CmdListOfOne): void {
        if (this.connectSuccess) {
            this.cmdList.splice(this.cmdList.indexOf(data), 1);
            Object.values(data)[0].forEach(val => {
                val.unsubscribe = true;
            });
            // 发送关闭
            this.webSocket.send(JSON.stringify(data));
        }
    }
}
