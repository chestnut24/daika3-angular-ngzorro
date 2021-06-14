import { Component } from '@angular/core';
import { localStorageKey } from './public/types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    ngOnInit() {
        if (sessionStorage.getItem(localStorageKey.ACCESS_TOKEN) && sessionStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION)) {
            // alert('111');
            console.log(0)
            localStorage.setItem(localStorageKey.ACCESS_TOKEN, sessionStorage.getItem(localStorageKey.ACCESS_TOKEN));
            localStorage.setItem(localStorageKey.ACCESS_TOKEN_EXPIRATION, sessionStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION));
            localStorage.setItem(localStorageKey.REFRESH_TOKEN, sessionStorage.getItem(localStorageKey.REFRESH_TOKEN));
            localStorage.setItem(localStorageKey.REFRESH_TOKEN_EXPIRATION, sessionStorage.getItem(localStorageKey.REFRESH_TOKEN_EXPIRATION));
            localStorage.setItem(localStorageKey.CURRENT_USER, sessionStorage.getItem(localStorageKey.CURRENT_USER));
        }
        // 浏览器关闭监听
        const onunload = () => {
            localStorage.clear();
            // localStorage.removeItem(key);
            return;
        }
        window.onbeforeunload = () => {
            // 这里写关闭时需要处理的时间，刷新也会执行这里的方法

            sessionStorage.setItem(localStorageKey.ACCESS_TOKEN, localStorage.getItem(localStorageKey.ACCESS_TOKEN));
            sessionStorage.setItem(localStorageKey.ACCESS_TOKEN_EXPIRATION, localStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION));
            sessionStorage.setItem(localStorageKey.REFRESH_TOKEN, localStorage.getItem(localStorageKey.REFRESH_TOKEN));
            sessionStorage.setItem(localStorageKey.REFRESH_TOKEN_EXPIRATION, localStorage.getItem(localStorageKey.REFRESH_TOKEN_EXPIRATION));
            sessionStorage.setItem(localStorageKey.CURRENT_USER, localStorage.getItem(localStorageKey.CURRENT_USER));
            [
                localStorageKey.ACCESS_TOKEN,
                localStorageKey.ACCESS_TOKEN_EXPIRATION,
                localStorageKey.REFRESH_TOKEN,
                localStorageKey.REFRESH_TOKEN_EXPIRATION,
                localStorageKey.CURRENT_USER
            ].forEach(item => {
                // sessionStorage.removeItem(item);
                localStorage.removeItem(item);
            });
            // window.removeEventListener('onunload', onunload);
            // localStorage.removeItem(key);
            return;
        };
        // window.addEventListener('onunload', onunload);

        // 利用Storage Event实现页面间通信
        window.onstorage = (e) => {
            // 刷新-只有newValue和oldValue都有数据的时候-key-refresh_token
            if (e.key === 'refresh_token') {
                // 换号登录后，另外一个页面自动刷新
                if ((e.newValue && e.oldValue === null) || (e.newValue && e.oldValue)) {
                    if (localStorage.getItem('reload') === '可刷新') {
                        localStorage.setItem('reload', '不可刷新');
                        location.reload();
                    }
                } else if (e.newValue === null && e.oldValue) {
                    if (sessionStorage.getItem(localStorageKey.ACCESS_TOKEN) && sessionStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION)) {
                        localStorage.setItem(localStorageKey.ACCESS_TOKEN, sessionStorage.getItem(localStorageKey.ACCESS_TOKEN));
                        localStorage.setItem(localStorageKey.ACCESS_TOKEN_EXPIRATION, sessionStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION));
                        localStorage.setItem(localStorageKey.REFRESH_TOKEN, sessionStorage.getItem(localStorageKey.REFRESH_TOKEN));
                        localStorage.setItem(localStorageKey.REFRESH_TOKEN_EXPIRATION, sessionStorage.getItem(localStorageKey.REFRESH_TOKEN_EXPIRATION));
                        localStorage.setItem(localStorageKey.CURRENT_USER, sessionStorage.getItem(localStorageKey.CURRENT_USER));
                    }
                }
            }
        };
    }
}
