import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable, Subscription } from 'rxjs';
import { Menu, MenuItem } from '../../public/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
// 长链接
import { WebSocketService } from '../../services/web-socket.service';
import { API } from '../../public/api';
import { map } from 'rxjs/operators';
import { AppRoutingCache } from 'src/app/app-routing.cache';

// 判断的东西
// 一级菜单-添加number
export interface MenuBadge extends Menu {
    BadgeNumber?: number | string; // 小徽章的数字 | 或者热处理的大红点
    children: Array<MenuBadgeC>;
}
// 二级菜单-添加number
export interface MenuBadgeC extends MenuItem {
    BadgeNumber?: number | string; // 小徽章的数字 | 或者热处理的大红点
    children?: Array<MenuBadgeC>;
}
// 服务端接收到的数据
export interface WebSocketData {
    id?: number;
    name: string;
    number: number;
    children?: Array<WebSocketData>;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [AppRoutingCache]
})
export class HomeComponent implements OnInit {
    isCollapsed = false;
    menu: Observable<Menu[]>;
    menuBadge: Observable<MenuBadge[]>;
    username;

    error: any;                         // 异常信息
    completed = false;                  // 发送完成

    subscription: Subscription;         // 本页监听
    webSocketData = {
        noticeSubCmds: [
            {
                cmdId: ++this.wsService.cmdId,
                entityId: '0',
                unsubscribe: false
            }
        ]
    };
    navTeXiaoH;

    constructor(
        public menuService: MenuService,
        private router: Router,
        private auth: AuthService,
        private user: UserService,
        private activeRoute: ActivatedRoute,
        private wsService: WebSocketService,
    ) { }

    ngOnInit() {
        this.menu = this.menuService.getMenu();
        this.user.getCurrentUser().subscribe(data => {
            this.username = data.name;
        });
        this.initalData();
        this.wsService.getReadyToConnect();
        // 菜单长链接-确认通道消息
        this.wsService.sendMessage(this.webSocketData);
        // 菜单长链接-接收消息
        this.subscription = this.wsService.messageSubject.subscribe(
            data => {
                if (data.has(this.webSocketData)) {
                    if (data.get(this.webSocketData).data && data.get(this.webSocketData).data.length) {
                        this.finalConformityData(data.get(this.webSocketData).data);
                    }
                }
            },
            err => this.error = err,
            () => this.completed = true
        );
        localStorage.setItem('deleteRoutePath', this.getComponentPath('/chargingPlan/planList'));
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnDestroy() {
        // 页面关闭前，关闭连接
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.wsService.listDelete(this.webSocketData);
        }
        this.wsService.PageClose();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    // 初始处理数据-每一个菜单赋值0
    initalData(): void {
        this.menuBadge = this.menu;
        this.menuBadge.subscribe(data => {
            data.forEach(menu => {
                menu.BadgeNumber = 0;
                if (menu.children && menu.children.length) {
                    menu.children.forEach(child => {
                        child.BadgeNumber = 0;
                    });
                }
            });
        });
    }

    // 获取到菜单改变时进行循环改单个的
    finalConformityData(changeData: WebSocketData[]): void {
        this.initalData();
        this.menuBadge.subscribe(data => {
            this.DoubleArrayLoop(data, changeData);
        });
    }
    // 双数组循环B值赋给A
    DoubleArrayLoop(ArrayA: MenuBadgeC[], ArrayB: WebSocketData[]): void {
        ArrayA.forEach(dataA => {
            ArrayB.forEach(dataB => {
                if (dataA.text === dataB.name) {
                    // tslint:disable-next-line: max-line-length
                    dataA.BadgeNumber = (dataA.text === '热处理' && dataB.number > 0) || (dataA.text === '热处理过程管理' && dataB.number > 0) ? 'heatTreatment' : dataB.number;
                    if (dataA.children && dataA.children.length) {
                        if (dataB.children && dataB.children.length) {
                            this.DoubleArrayLoop(dataA.children, dataB.children);
                        }
                    }
                }
            });
        });
    }
    // 判断是否热处理
    Number(val: any): boolean {
        if (parseFloat(val).toString() === 'NaN') {
            return false;
        } else {
            return true;
        }
    }
    ipadClick(allNum1, num, e) {
        let allNum = 0;
        this.menuBadge.subscribe(data => {
            allNum = data.length;
            if ((allNum - (num + 1)) > 2) {

            } else {
                const cssName = window.document.getElementsByClassName('ant-layout-sider-children');
                const ulHeight = cssName[0].clientHeight - e.pageY;
                if (ulHeight < (allNum1.children.length * 40)) {
                    let getUl = null;
                    const timer = setInterval(() => {
                        getUl = window.document.getElementsByClassName('ant-menu-sub');
                        if (getUl && getUl.length) {
                            if (getUl.length > 1) {

                            } else {
                                if (this.navTeXiaoH === getUl[0]) {

                                } else {
                                    this.navTeXiaoH = getUl[0];
                                    clearInterval(timer);
                                    getUl[0].style.position = 'relative';
                                    // getUl[0].style.top = '-' + (getUl[0].clientHeight - 40) + 'px';
                                    getUl[0].style.top = '-180px';
                                }
                            }
                        }
                        getUl = null;
                    }, 10);
                }
            }
        });
    }
    goLogo() {
        this.router.navigate(['/welcome']);
    }
    chilsMenu(data) {
        // console.log(this.activeRoute.routeConfig);
        // console.log(this.getComponentPath(data.url));
        // localStorage.setItem('deleteRoutePath',this.getComponentPath(data.url));
        // AppRoutingCache.deleteRouteSnapshot(data.url);
    }
    getComponentPath(url) {
        const pathList = [this.activeRoute.routeConfig];
        const urlArr = url.split('/');
        let str = '';
        let i = 0;
        console.log(urlArr);
        function list(url, arr) {
            arr.forEach(item => {
                if (item.path === urlArr[i]) {
                    if (i !== 0) {
                        str += '/' + urlArr[i];
                    }
                    if (item.children && item.children.length) {
                        i += 1;
                        list(str, item.children);
                    } else {
                        str += '/' + item.component.toString().split('(')[0].split(' ')[1]
                    }
                }
            });
        }
        list(str, pathList);
        return str;
    }


}
