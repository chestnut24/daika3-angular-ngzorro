import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HeatTreatmentService } from '../../../../services/heat-treatment.service';
import {
    HtAlarms,
    HtAlarmsDevice,
    HtAlarmsStatus,
    HtDetail,
    MonitorStandard
} from '../../../../public/interface/heat-treatment';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { StandardProcessCurveModalComponent } from '../standard-process-curve-modal/standard-process-curve-modal.component';
import { AlarmRecordModalComponent } from '../alarm-record-modal/alarm-record-modal.component';
import { WebSocketService } from '../../../../services/web-socket.service';
import * as echarts from 'echarts';
import { SpeedupType, TemperatureType } from '../../../../public/interface/configuration-management';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

export interface RollAndFurnaceDevices {
    devices: HtAlarmsDevice[];
    deviation: number; // 偏差值
    targetTemp: number;
}
@Component({
    selector: 'app-heat-treatment-detail',
    templateUrl: './heat-treatment-detail.component.html',
    styleUrls: ['./heat-treatment-detail.component.scss']
})
export class HeatTreatmentDetailComponent implements OnInit, OnDestroy, AfterViewInit {
    dataDetail: HtDetail;
    deviceId: string;
    nowTime: number;
    timer;
    subscription;
    targetWebSocketData = {};
    historyWebSocketData = {};
    tsWebSocketData = {};
    alarmWebSocketData = {};
    canvasContainer;
    rollDevices: HtAlarmsDevice[] = [];
    furnaceDevices: HtAlarmsDevice[] = [];
    rollIndex = 0;
    furnaceIndex = 0;
    dataZoomStart = 80;
    dataZoomEnd = 100;
    alarmUpdate = new Subject();
    get otherTimes(): number {
        if (this.dataDetail && this.dataDetail.htRecord.correctSign && this.dataDetail.htRecord.correctTime) {
            if (this.dataDetail.htRecord.htPauses && this.dataDetail.htRecord.htPauses.length) {
                return Number((this.dataDetail.htRecord.correctSign === 'POSITIVE' ? '+' : '-') + this.dataDetail.htRecord.correctTime) * 60 * 1000 + this.getPauseTime();
            } else {
                return Number((this.dataDetail.htRecord.correctSign === 'POSITIVE' ? '+' : '-') + this.dataDetail.htRecord.correctTime) * 60 * 1000;
            }
        } else if (this.dataDetail && this.dataDetail.htRecord.htPauses && this.dataDetail.htRecord.htPauses.length) {
            return this.getPauseTime();
        }
        return 0;
    }
    option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '50px',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            // maxInterval: 30 * 60 * 1000
            splitNumber: 10
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '',
                type: 'line',
                // stack: '总量',
                data: [],
                lineStyle: {},
                itemStyle: {}
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                start: this.dataZoomStart,
                end: this.dataZoomEnd
            }, {
                start: this.dataZoomStart,
                end: this.dataZoomEnd,
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }
        ],
    };
    hasStart = false;
    correctTime = 0;
    selectedMonitorList: HtAlarmsDevice[] = [];
    htRecordId: string | number;
    startSuperviseHt: {
        findRollRorkRecordDtoList: [];
        startTime: number | string;
        superviseType: 'START' | 'END';
        htSuperviseEntityList: any;
    } = {
            findRollRorkRecordDtoList: [],
            startTime: null,
            superviseType: null,
            htSuperviseEntityList: null
        };
    resizeListener = () => {
        if (this.canvasContainer) {
            this.canvasContainer.resize();
        }
    }
    constructor(private heatTreatmentService: HeatTreatmentService,
        private route: ActivatedRoute,
        private message: NzMessageService,
        private modalService: NzModalService,
        private wsService: WebSocketService) { }

    ngOnInit() {
        this.deviceId = this.route.snapshot.paramMap.get('id');
        this.initDetail();
        this.nowTime = Date.now();
        this.timer = setInterval(() => {
            if (this.dataDetail && ((this.dataDetail.htRecord.htPauses
                && this.dataDetail.htRecord.htPauses.length
                && this.dataDetail.htRecord.htPauses.length % 2 === 0) || !this.dataDetail.htRecord.htPauses || (this.dataDetail.htRecord.htPauses && !this.dataDetail.htRecord.htPauses.length))) {
                this.nowTime = Date.now();
            }
        }, 1000);
        this.targetWebSocketData = {
            targetSubCmds: [
                {
                    cmdId: ++this.wsService.cmdId,
                    entityId: this.deviceId,
                    unsubscribe: false
                }
            ]
        };
        this.historyWebSocketData = {
            historyCmds: [
                {
                    cmdId: ++this.wsService.cmdId,
                    entityId: this.deviceId,
                    unsubscribe: false
                }
            ]
        };
        this.tsWebSocketData = {
            tsSubCmds: [
                {
                    cmdId: ++this.wsService.cmdId,
                    entityId: this.deviceId,
                    unsubscribe: false
                }
            ]
        };
        this.alarmWebSocketData = {
            alarmSubCmds: [
                {
                    cmdId: ++this.wsService.cmdId,
                    entityId: this.deviceId,
                    unsubscribe: false
                }
            ]
        };

        setInterval(() => { this.findStartSuperviseHt(); }, 60 * 1000);
    }
    ngOnDestroy() {
        clearInterval(this.timer);
        this.wsService.listDelete(this.targetWebSocketData);
        this.wsService.listDelete(this.historyWebSocketData);
        this.wsService.listDelete(this.tsWebSocketData);
        this.wsService.listDelete(this.alarmWebSocketData);
    }
    ngAfterViewInit() {
        this.canvasContainer = echarts.init(document.getElementById('canvasContainer'));
        this.initEChart();
        window.addEventListener('resize', this.resizeListener);
        document.getElementById('htContainer').scrollTop = 0;
    }
    getPauseTime(): number {
        if (this.dataDetail.htRecord.htPauses && this.dataDetail.htRecord.htPauses.length) {
            const htPauses = this.dataDetail.htRecord.htPauses;
            let count = 0;
            for (let i = 0; i < htPauses.length - 1; i += 2) {
                count += this.dataDetail.htRecord.htPauses[i + 1].time - this.dataDetail.htRecord.htPauses[i].time;
            }
            return count;
        } else {
            return 0;
        }

    }
    initHtDetailById(): void { // 用于刷新右侧炉温辊温值
        this.heatTreatmentService.getHtById(this.deviceId).subscribe(data => {
            this.dataDetail = data;
        });
    }
    initDetail(): void {
        this.heatTreatmentService.getHtById(this.deviceId).subscribe(data => {
            this.dataDetail = data;
            this.htRecordId = data.htRecord.id;
            this.findStartSuperviseHt();
            this.correctTime = this.dataDetail.htRecord.correctTime;
            this.rollDevices = data.device.monitorList.filter(item => item.type === TemperatureType.ROLL_TEMPERATURE).sort((a, b) => a.monitorPostion < b.monitorPostion ? -1 : 1);
            this.rollDevices.unshift({
                id: 99998,
                name: null, // 设备名称
                deviceNum: null, // 设备编号
                monitorPostion: '辊温平均值', // 监控位
                type: TemperatureType.ROLL_TEMPERATURE, // 温度类型
                jcUuid: null, // ws返回数据对应设备的key值
                otherInfo: { // 实际温度，方便数据传递
                    actualTemp: null,
                    deviation: null, // 偏差值
                    targetTemp: null,
                    history: [],
                    speedupType: null,
                },
                borderColor: 'active',
            });
            this.rollDevices.forEach((item, index) => {
                item.borderColor = 'default';
                if (index === 0) { item.borderColor = 'active'; }
            });
            this.furnaceDevices = data.device.monitorList.filter(item => item.type === TemperatureType.FURNACE_TEMPERATURE).sort((a, b) => a.monitorPostion < b.monitorPostion ? -1 : 1);
            this.furnaceDevices.unshift({
                id: 99999,
                name: null, // 设备名称
                deviceNum: null, // 设备编号
                monitorPostion: '炉温平均值', // 监控位
                type: TemperatureType.FURNACE_TEMPERATURE, // 温度类型
                jcUuid: null, // ws返回数据对应设备的key值
                otherInfo: { // 实际温度，方便数据传递
                    actualTemp: null,
                    deviation: null, // 偏差值
                    targetTemp: null,
                    history: [],
                    speedupType: null,
                },
                borderColor: 'active',
            });
            this.furnaceDevices.forEach((item, index) => {
                item.borderColor = 'default';
                if (index === 0) { item.borderColor = 'active'; }
            });
            if (this.dataDetail.htRecord.startTime && !this.dataDetail.htRecord.endTime && !this.hasStart) {
                this.startWs();
            }
            this.selectedMonitorList.push(this.furnaceDevices[0], this.rollDevices[0]);
        });
    }
    initHtById(): void {
        this.heatTreatmentService.getHtById(this.deviceId).subscribe(data => {
            this.dataDetail.htRecord.htAlarms = data.htRecord.htAlarms;
            this.alarmUpdate.next(data.htRecord.htAlarms);
        });
    }
    startTimer() {
        if (this.timer) { clearInterval(this.timer); }
        this.timer = setInterval(() => {
            this.nowTime = Date.now();
        }, 1000);
    }
    standardProcessCurve(): void {
        const modal = this.modalService.create({
            nzTitle: '标准工艺曲线',
            nzWidth: '700px',
            nzComponentParams: { dataDetail: this.dataDetail },
            nzContent: StandardProcessCurveModalComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
            ]
        });
    }

    alarmRecord(): void {
        const modal = this.modalService.create({
            nzTitle: '报警记录',
            nzWidth: '1000px',
            nzComponentParams: { htAlarms: this.dataDetail.htRecord.htAlarms, father: this },
            nzContent: AlarmRecordModalComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
            ]
        });
    }
    getAlarmsLength(htAlarms: HtAlarms[]) {
        return htAlarms.filter(item => item.status === HtAlarmsStatus.ACTIVE).length;
    }

    start0713Show = false;

    start0713reMonitor(num): void {
        this.modalService.create({
            nzTitle: '确认提示',
            nzContent: { 1: '确认进行 开始-热处理监控 的操作吗？', 2: '装炉轧辊与计划不一致，是否仍然开始进行热处理?' }[num],
            nzClosable: false,
            nzOnOk: () => {
                this.heatTreatmentService.startMonitor({
                    id: this.dataDetail.htRecord.id,
                    monitorStandard: this.dataDetail.htRecord.monitorStandard ? this.dataDetail.htRecord.monitorStandard : MonitorStandard.AVG
                }).subscribe(data => {
                    this.message.success('开始成功');
                    this.startTimer();
                    this.initHtDetailById();
                }, error => {
                    this.message.error(`开始失败 ${error.error.message}`);
                });
            }
        });
    }

    startOrEndMonitor(): void {
        this.nowTime = Date.now();
        this.startWs();
        if (!this.dataDetail.htRecord.startTime) {
            // 判断是不是一致
            this.start0713Show = true;
            console.log(this.dataDetail);
            this.heatTreatmentService.afterStartMonitor({
                id: this.dataDetail.htRecord.id,
                monitorStandard: this.dataDetail.htRecord.monitorStandard ? this.dataDetail.htRecord.monitorStandard : MonitorStandard.AVG
            }).subscribe(data => {
                this.start0713Show = false;
                // console.log(data);
                if (data.success) {
                    this.start0713reMonitor(1);
                } else {
                    this.start0713reMonitor(2);
                }
            }, error => {
                this.start0713Show = false;
                this.message.error(`开始失败 ${error.error.message}`);
            });
        } else {
            // 弹窗确认
            this.modalService.create({
                nzTitle: '确认提示',
                nzContent: '确认进行 停止-热处理监控 的操作吗？',
                nzClosable: false,
                nzOnOk: () => {
                    this.heatTreatmentService.endMonitor({ id: this.dataDetail.htRecord.id }).subscribe(data => {
                        this.message.success('停止成功');
                        this.initHtDetailById();
                        clearInterval(this.timer);
                    }, error => {
                        this.message.error(`停止失败 ${error.error.message}`);
                    });
                }
            });
        }
    }
    updateMonitor(): void {
        this.heatTreatmentService.updateMonitor({
            id: this.dataDetail.htRecord.id,
            monitorStandard: this.dataDetail.htRecord.monitorStandard,
            correctSign: this.dataDetail.htRecord.correctSign,
            correctTime: this.correctTime
        }).subscribe(data => {
            this.message.success('更新成功');
            // 时间矫正走接口后更新？
        }, error => {
            this.message.error(`更新失败 ${error.error.message}`);
        });
    }

    updateNumber() {
        this.heatTreatmentService.updateMonitor({
            id: this.dataDetail.htRecord.id,
            monitorStandard: this.dataDetail.htRecord.monitorStandard,
        }).subscribe(data => {
            this.message.success('切换成功');
            this.initHtDetailById();
        }, error => {
            this.message.error(`切换失败 ${error.error.message}`);
        });
    }
    pauseMonitor(status: 'START' | 'END') {
        this.nowTime = Date.now();
        this.heatTreatmentService.pauseMonitor({
            htRecordId: this.dataDetail.htRecord.id,
            type: status
        }).subscribe(() => {
            if (status === 'END') {
                this.message.success('已恢复');
                this.nowTime = Date.now();
                this.startTimer();
            } else {
                this.message.success('已暂停');
                clearInterval(this.timer);
            }
            this.initHtDetailById();
        }, error => {
            this.message.error(`暂停失败 ${error.error.message}`);
        });
    }

    startWs() {
        this.hasStart = true;
        this.wsService.sendMessage(this.targetWebSocketData);
        this.wsService.sendMessage(this.historyWebSocketData);
        this.wsService.sendMessage(this.tsWebSocketData);
        this.wsService.sendMessage(this.alarmWebSocketData);
        this.subscription = this.wsService.messageSubject.subscribe(
            data => {
                if (data.has(this.targetWebSocketData)) {
                    const webSocketData = data.get(this.targetWebSocketData).data;
                    if (webSocketData.temperatureType === 'FURNACE_TEMPERATURE') {
                        this.rollDevices.forEach(item => {
                            item.otherInfo.targetTemp = '-';
                            item.otherInfo.deviation = webSocketData.deviation;
                            item.otherInfo.speedupType = webSocketData.temperatureType;
                        });
                        this.furnaceDevices.forEach(item => {
                            item.otherInfo.targetTemp = webSocketData.temperature;
                            item.otherInfo.deviation = webSocketData.deviation;
                            item.otherInfo.speedupType = webSocketData.temperatureType;
                        });
                    } else {
                        this.rollDevices.forEach(item => {
                            item.otherInfo.targetTemp = webSocketData.temperature;
                            item.otherInfo.deviation = webSocketData.deviation;
                            item.otherInfo.speedupType = webSocketData.temperatureType;
                        });
                        this.furnaceDevices.forEach(item => {
                            item.otherInfo.targetTemp = '-';
                            item.otherInfo.deviation = webSocketData.deviation;
                            item.otherInfo.speedupType = webSocketData.temperatureType;
                        });
                    }
                }
                if (data.has(this.historyWebSocketData)) {
                    const webSocketData = data.get(this.historyWebSocketData).data;
                    if (Object.keys(webSocketData).length) {
                        Object.keys(webSocketData).forEach(item => {
                            this.furnaceDevices.forEach(device => {
                                if (device.id.toString() == item) {
                                    device.otherInfo.history = webSocketData[item];
                                }
                            });
                            this.rollDevices.forEach(device => {
                                if (device.id.toString() == item) {
                                    device.otherInfo.history = webSocketData[item];
                                }
                            });
                        });
                        this.drawECharts();
                    }
                }
                if (data.has(this.tsWebSocketData)) {
                    const webSocketData = data.get(this.tsWebSocketData).data;
                    Object.keys(webSocketData).forEach(item => {
                        this.rollDevices.forEach(device => {
                            if (device.id.toString() == item) {
                                device.otherInfo.actualTemp = webSocketData[item][0].value;
                            }
                        });
                        this.furnaceDevices.forEach(device => {
                            if (device.id.toString() == item) {
                                device.otherInfo.actualTemp = webSocketData[item][0].value;
                            }
                        });
                    });
                    if (this.rollDevices && this.rollDevices.length) {
                        const arr = this.rollDevices.map(item => item.otherInfo.actualTemp);
                        switch (this.dataDetail.htRecord.monitorStandard) {
                            case MonitorStandard.AVG: this.dataDetail.htRecord.rollTemp = Number((arr.reduce((a, b) => Number(a) + Number(b)) / arr.filter(rollTemp => Number(rollTemp) != 0).length).toFixed(1)); break;
                            case MonitorStandard.MAX: this.dataDetail.htRecord.rollTemp = Math.max(...arr); break;
                            case MonitorStandard.MIN: this.dataDetail.htRecord.rollTemp = Math.min(...arr); break;
                            default: this.dataDetail.htRecord.rollTemp = 0;
                        }
                    }
                    if (this.furnaceDevices && this.furnaceDevices.length) {
                        const arr = this.furnaceDevices.map(item => item.otherInfo.actualTemp);
                        switch (this.dataDetail.htRecord.monitorStandard) {
                            case MonitorStandard.AVG: this.dataDetail.htRecord.furnaceTemp = Number((arr.reduce((a, b) => Number(a) + Number(b)) / arr.filter(rollTemp => Number(rollTemp) != 0).length).toFixed(1)); break;
                            case MonitorStandard.MAX: this.dataDetail.htRecord.furnaceTemp = Math.max(...arr); break;
                            case MonitorStandard.MIN: this.dataDetail.htRecord.furnaceTemp = Math.min(...arr); break;
                            default: this.dataDetail.htRecord.furnaceTemp = 0;
                        }
                    }
                }
                if (data.has(this.alarmWebSocketData)) {
                    const webSocketData = data.get(this.alarmWebSocketData).data;
                    this.dataDetail.htRecord.htAlarms = [...this.dataDetail.htRecord.htAlarms, webSocketData];
                    this.initHtById();
                }
            },
        );
    }

    initEChart() {
        this.canvasContainer.setOption(this.option);
        this.canvasContainer.on('datazoom', (event) => {
            this.dataZoomStart = event.start;
            this.dataZoomEnd = event.end;
        });
    }
    changeDevice(index: number, rollOrFurnaceIndex: number, monitorList: HtAlarmsDevice) {
        try {
            if ((monitorList.otherInfo.history && monitorList.otherInfo.history.length) || this.startSuperviseHt) {
                const arrayIndex = this.selectedMonitorList.indexOf(monitorList);
                if (arrayIndex === -1) {
                    // if (monitorList.otherInfo.history && monitorList.otherInfo.history.length) {
                    this.selectedMonitorList.push(monitorList);
                    // } else {
                    //     this.message.error('暂无数据');
                    // }
                } else {
                    this.selectedMonitorList.splice(arrayIndex, 1);
                }
                if (index === 0) {
                    this.furnaceIndex = rollOrFurnaceIndex;
                    this.furnaceDevices[this.furnaceIndex].borderColor =
                        this.furnaceDevices[this.furnaceIndex].borderColor === 'active' ? 'default' : 'active';
                } else {
                    this.rollIndex = rollOrFurnaceIndex;
                    this.rollDevices[this.rollIndex].borderColor =
                        this.rollDevices[this.rollIndex].borderColor === 'active' ? 'default' : 'active';
                }
            } else {
                this.message.error('暂无数据');
            }
            this.drawECharts();
        } catch (e) {
            console.log(e);
        }
    }
    changeZoom() {
        this.option.dataZoom = [
            {
                type: 'inside',
                start: this.dataZoomStart,
                end: this.dataZoomEnd
            }, {
                start: this.dataZoomStart,
                end: this.dataZoomEnd,
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }
        ];
    }
    drawECharts() {
        this.option.series = [];
        if (this.selectedMonitorList && this.selectedMonitorList.length) {
            // this.option.xAxis = {
            //     type: 'category',
            //     boundaryGap: false,
            //     data: this.selectedMonitorList[0].otherInfo.history
            //         .map(item => new DatePipe('zh-Hans').transform(Number(item[0]), 'HH:mm:ss')),
            // };
            this.selectedMonitorList.forEach(monitor => {
                if (monitor && monitor.otherInfo && monitor.otherInfo.history) {
                    const dataArr = monitor.otherInfo.history.map(item => {
                        // @ts-ignore
                        if (item[1] !== 0 && !item[1]) {
                            // @ts-ignore
                            item[1] = undefined;
                        }
                        if (item[1] && ['START', 'END', 'PAUSE', 'RESUME', 'ALARM', 'CURVE_SWITCH'].includes(item[2])) {
                            return {
                                value: [item[0], Number(item[1])],
                                // showSymbol: true,
                                symbolSize: 4
                            };
                        }
                        return { value: [item[0], Number(item[1])] };
                    });
                    // 0923增加，将前一段红线和后一段红线连接
                    let Arr0923shi = [];
                    if (monitor.type === TemperatureType.FURNACE_TEMPERATURE) {
                        let firstRedLine = monitor['beforeData'].map(beforeData => {
                            return {
                                value: [beforeData.ts, Number(Number(beforeData.value).toFixed(2))]
                            };
                        });
                        if (firstRedLine[0].value[0] >= firstRedLine[firstRedLine.length - 1].value[0]){
                            firstRedLine = firstRedLine.reverse();
                        }
                        Arr0923shi = [...firstRedLine, ...dataArr]
                    } else {
                        Arr0923shi = dataArr;
                    }
                    // 第二段红线
                    this.option.series.push({
                        name: monitor.monitorPostion,
                        type: 'line',
                        // data: dataArr,
                        data: Arr0923shi,
                        lineStyle: {
                            color: monitor.type === TemperatureType.FURNACE_TEMPERATURE ? 'red' : 'blue'
                        },
                        itemStyle: {
                            color: monitor.type === TemperatureType.FURNACE_TEMPERATURE ? 'red' : 'blue'
                        },
                        // @ts-ignore
                        symbolSize: 1
                    });

                    if (monitor.type === TemperatureType.ROLL_TEMPERATURE) {
                        const historyArr = [];
                        let preIndex = 0;
                        monitor.otherInfo.history.forEach((item, index) => {
                            if (item[1] && item[2] === 'CURVE_SWITCH') {
                                historyArr.push(monitor.otherInfo.history.slice(preIndex, index));
                                preIndex = index;
                            }
                        });
                        historyArr.push(monitor.otherInfo.history.slice(preIndex, monitor.otherInfo.history.length));
                        const curves = this.dataDetail.linkDetail.craft.curves;
                        for (let i = 0; i < historyArr.length; i++) {
                            if (curves[i + 1] && curves[i + 1].speedupType === SpeedupType.CONSTANT && curves[i + 1].temperatureType === TemperatureType.ROLL_TEMPERATURE) {
                                const curveSwitchPoint = historyArr[i][historyArr[i].length - 1];
                                if (curveSwitchPoint[1] >= curves[i + 1].temperature + Number(curves[i + 1].deviation)
                                    || curveSwitchPoint[1] <= curves[i + 1].temperature - Number(curves[i + 1].deviation)) {
                                    if (historyArr[i + 1]) {
                                        let stopIndex = 0;
                                        for (let index = 0; index < historyArr[i + 1].length; index++) {
                                            if (historyArr[i + 1][index][1] <= curves[i + 1].temperature + Number(curves[i + 1].deviation)
                                                && historyArr[i + 1][index][1] >= curves[i + 1].temperature - Number(curves[i + 1].deviation)) {
                                                stopIndex = index;
                                                break;
                                            }
                                            if (index === historyArr[i + 1].length - 1) {
                                                stopIndex = index;
                                            }
                                        }
                                        this.option.series.push({
                                            name: monitor.monitorPostion,
                                            type: 'line',
                                            data: historyArr[i + 1].slice(0, stopIndex).map(item => {
                                                return {
                                                    value: [item[0], item[1]]
                                                };
                                            }),
                                            lineStyle: {
                                                color: 'yellow',
                                            },
                                            itemStyle: {
                                                color: 'yellow'
                                            },
                                            // @ts-ignore
                                            // symbolSize: 1
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                if (monitor['beforeData']) {
                    // 第一段红线
                    this.option.series.push({
                        name: monitor.monitorPostion,
                        type: 'line',
                        data: monitor['beforeData'].map(beforeData => {
                            return {
                                value: [beforeData.ts, Number(Number(beforeData.value).toFixed(2))]
                            };
                        }),
                        lineStyle: {
                            color: monitor.type === TemperatureType.FURNACE_TEMPERATURE ? 'red' : 'blue'
                        },
                        itemStyle: {
                            color: monitor.type === TemperatureType.FURNACE_TEMPERATURE ? 'red' : 'blue'
                        },
                        // @ts-ignore
                        symbolSize: 1
                    });
                }
            });
        }
        const stageArr = [];
        let lastIndex = 0;
        const monitor = this.furnaceDevices[0]; // 平均炉温
        monitor.otherInfo.history.forEach((item, index) => {
            if (item[2] === 'CURVE_SWITCH') {
                stageArr.push(monitor.otherInfo.history.slice(lastIndex, index + 1));
                lastIndex = index + 1;
            }
        });
        if (lastIndex < monitor.otherInfo.history.length) {
            stageArr.push(monitor.otherInfo.history.slice(lastIndex));
        }
        const curves = this.dataDetail.linkDetail.craft.curves;
        try {
            // @ts-ignore
            let lastPoint = [monitor.otherInfo.history ? monitor.otherInfo.history[0][0] : 0, monitor.otherInfo.history ? monitor.otherInfo.history[0][1] : 0];
            for (let i = 0; i < stageArr.length; i++) {
                let item;
                let currentPoint;
                try {
                    if (curves[i].speedupType === SpeedupType.FULL_SPEED) {
                        item = stageArr[i][stageArr[i].length - 1];
                        currentPoint = [item[0], item[1]];
                    } else {
                        const currentIndex = Math.round((lastPoint[0] + curves[i].duration * 60 * 1000
                            // @ts-ignore
                            - monitor.otherInfo.history[0][0]) / (30 * 60 * 1000));
                        currentPoint = [
                            lastPoint[0] + curves[i].duration * 60 * 1000,
                            curves[i].temperature
                        ];
                        // if (currentIndex - lastPoint[0] > 0) {
                        //     for (let j = 1; j <= currentIndex - lastPoint[0]; j++) {
                        //         this.option.xAxis.data.push(new DatePipe('zh-Hans').
                        //         transform(Number(monitor.otherInfo.history[lastPoint[0]][0] +
                        //             (curves[i].duration * 60 * 1000 / (currentIndex - lastPoint[0]) / 30 * j)), 'HH:mm:ss'));
                        //     }
                        // }
                    }
                } catch (e) {
                    console.log('画图时出现错误', e);
                }
                if (curves[i].speedupType !== SpeedupType.FURNACE_COOLING) {
                    this.option.series.push({
                        name: '标准工艺曲线',
                        type: 'line',
                        data: [lastPoint, currentPoint],
                        lineStyle: {
                            color: curves[i].speedupType === SpeedupType.FULL_SPEED ? '#e8e8e8'
                                : curves[i].temperatureType === TemperatureType.FURNACE_TEMPERATURE ? '#9A1600' : '#001D9F',
                            type: 'dashed',
                            width: 4
                        },
                        itemStyle: {
                            color: curves[i].speedupType === SpeedupType.FULL_SPEED ? '#e8e8e8'
                                : curves[i].temperatureType === TemperatureType.FURNACE_TEMPERATURE ? '#9A1600' : '#001D9F'
                        },
                    });
                }
                lastPoint = currentPoint;
            }
        } catch (e) {
            console.log(e);
        }
        if (this.startSuperviseHt && this.startSuperviseHt.findRollRorkRecordDtoList
            && this.startSuperviseHt.findRollRorkRecordDtoList.length) {
            this.startSuperviseHt.findRollRorkRecordDtoList.forEach(items => {
                let str = '';
                switch (items['type']) {
                    case '0': str = '入炉操作'; break;
                    case '1': str = '出炉操作'; break;
                    case '2': str = '撤销入炉'; break;
                    default: str = '无';
                }
                this.option.series.push({
                    // @ts-ignore
                    symbolSize: 16,
                    name: '热处理监测',
                    type: 'scatter',
                    data: [[Number(items['createDt']), Number(Number(items['avgtemp']).toFixed(2))]],
                    // @ts-ignore
                    label: {
                        show: true,
                        position: items['type'] == 0 ? 'top' : 'bottom',
                        formatter: () => {
                            let dataStr = '';
                            const thisDate = new Date(Number(items['createDt']));
                            dataStr += `${new DatePipe('zh-Hans').transform(Number(items['createDt']), 'yyyy-MM-dd HH:mm:ss')}`
                            return `${str} \n ${items['freightNumber']}-${items['productNo']} \n ${dataStr}`;
                        }
                    },
                    itemStyle: {
                        color: items['type'] === '0' ? 'orange' : 'green'
                    },
                });
            });


        }
        /*symbolSize: 20,
    data: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
    ],
    type: 'scatter'*/
        this.changeZoom();
        this.canvasContainer.setOption(this.option, { notMerge: true });
    }

    startBeforeMonitor() {
        const startOrEnd = this.startSuperviseHt.superviseType === 'START' ? 'END' : 'START';
        this.heatTreatmentService.startOrEndBeforeMonitor(this.htRecordId, startOrEnd).subscribe(data => {
            this.message.success(startOrEnd === 'START' ? '开始监测成功' : '结束监测成功');
            this.startSuperviseHt.superviseType = data.data;
        }, _ => {
            this.message.error(startOrEnd === 'START' ? '开始监测失败' : '结束监测失败');
        });
    }

    findStartSuperviseHt() {
        if (this.htRecordId) {
            this.heatTreatmentService.findStartSuperviseHt(this.htRecordId).subscribe(data => {
                // @ts-ignore
                this.startSuperviseHt = data;
                // this.canvasContainer.setOption(this.option);
                this.furnaceDevices.forEach((item, index) => {
                    if (index === 0) {
                        // @ts-ignore
                        item.beforeData = data.htSuperviseEntityList.平均炉温;
                        // item.findRollRorkRecordDtoList = data.findRollRorkRecordDtoList;
                    } else {
                        // @ts-ignore
                        item.beforeData = data.htSuperviseEntityList[item.monitorPostion + '表'];
                    }
                });
                this.drawECharts();
            });
        }
    }
}
