import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, throwError } from 'rxjs';
import { tap, map, share, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { TokenInfo, TokenResponse, Token } from '../public/interface/auth';
import {localStorageKey, sessionStorageKey} from '../public/types';
import { API } from '../public/api';
import { tokenValid, parseToken } from '../public/utils';


@Injectable()
export class AuthService {

    public get isLoggedIn(): Observable<boolean> {
        return this.getAccessToken().pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    /**
     * Token 中的信息
     *
     * @readonly
     * @private
     * @type {TokenInfo}
     * @memberof AuthService
     */
    private get authInfo(): TokenInfo {
        return parseToken(this.accessToken.token);
    }

    /**
     * 本地账户
     *
     * @private
     * @type {Object}
     * @memberof AuthService
     */
    private get localAccounts(): Object {
        const accountsJsonStr = localStorage.getItem(localStorageKey.LOCAL_ACCOUNTS);
        // const accountsJsonStr = sessionStorage.getItem(localStorageKey.LOCAL_ACCOUNTS);
        return JSON.parse(accountsJsonStr);
    }

    private set localAccounts(accounts: Object) {
        const accountsJsonStr = JSON.stringify(accounts);
        localStorage.setItem(localStorageKey.LOCAL_ACCOUNTS, accountsJsonStr);
        // sessionStorage.setItem(localStorageKey.LOCAL_ACCOUNTS, accountsJsonStr);
    }

    /**
     * Access Token
     *
     * @private
     * @type {Token}
     * @memberof AuthService
     */
    private get accessToken(): Token {
        // return {
        //     token: sessionStorage.getItem(localStorageKey.ACCESS_TOKEN),
        //     expiration: sessionStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION)
        // };
        return {
            token: localStorage.getItem(localStorageKey.ACCESS_TOKEN),
            expiration: localStorage.getItem(localStorageKey.ACCESS_TOKEN_EXPIRATION)
        };
    }

    private set accessToken(token: Token) {
        // sessionStorage.setItem(localStorageKey.ACCESS_TOKEN, token.token);
        localStorage.setItem(localStorageKey.ACCESS_TOKEN, token.token);
        localStorage.setItem(localStorageKey.ACCESS_TOKEN_EXPIRATION, token.expiration);
        // sessionStorage.setItem(localStorageKey.ACCESS_TOKEN_EXPIRATION, token.expiration);
    }

    /**
     * Refresh Token
     *
     * @private
     * @type {Token}
     * @memberof AuthService
     */
    private get refreshToken(): Token {
        return {
            token: localStorage.getItem(localStorageKey.REFRESH_TOKEN),
            // token: sessionStorage.getItem(localStorageKey.REFRESH_TOKEN),
            // expiration: sessionStorage.getItem(localStorageKey.REFRESH_TOKEN_EXPIRATION)
            expiration: localStorage.getItem(localStorageKey.REFRESH_TOKEN_EXPIRATION)
        };
    }

    private set refreshToken(token: Token) {
        localStorage.setItem(localStorageKey.REFRESH_TOKEN, token.token);
        // sessionStorage.setItem(localStorageKey.REFRESH_TOKEN, token.token);
        localStorage.setItem(localStorageKey.REFRESH_TOKEN_EXPIRATION, token.expiration);
        // sessionStorage.setItem(localStorageKey.REFRESH_TOKEN_EXPIRATION, token.expiration);
    }

    private get currentUser(): string {
        // return sessionStorage.getItem(localStorageKey.CURRENT_USER);
        return localStorage.getItem(localStorageKey.CURRENT_USER);
    }

    private set currentUser(username: string) {
        // sessionStorage.setItem(localStorageKey.CURRENT_USER, username);
        localStorage.setItem(localStorageKey.CURRENT_USER, username);
    }

    private isPending = false;

    private pendingToken: Observable<string>;

    private deauthorize = new Subject<void>();

    public onDeauthorize = this.deauthorize.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private message: NzMessageService
    ) {
        // this.getAccessToken()
        sessionStorage.setItem(sessionStorageKey.LAST_PAGE, `/users`);
    }

    /**
     * 切换账号
     *
     * @param {string} username 用户名
     * @memberof AuthService
     */
    switchAccount(username: string): void {
        this.currentUser = username;
        this.resolveToken(this.localAccounts[username]);
    }

    /**
     * 用户登录
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @memberof AuthService
     */
    login(username: string, password: string): Observable<string> {
        return this.http.post<TokenResponse>(API.LOGIN, {
            username, password
        }).pipe(tap(data => {
            this.currentUser = username;
            this.saveAccount(username, data);
            this.resolveToken(data);
        }), map(() => username));
    }

    /**
     * 注销用户
     *
     * @memberof AuthService
     */
    logout(): void {
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
        this.deauthorize.next();
        this.router.navigate(['/login']);
    }

    /**
     * 获取 Access Token
     * 如果当前 Access Token 有效直接返回 Access Token，否则更新并返回新的 Access Token
     *
     * @returns {Observable<string>} Access Token 字符串
     * @memberof AuthService
     */
    getAccessToken(): Observable<string> {
        return tokenValid(this.accessToken)
            ? of(this.accessToken.token)
            : this.updateToken();
    }

    /**
     * 获取用户 ID
     * 从 Token 中获取用户 ID
     *
     * @returns {Observable<string>}
     * @memberof AuthService
     */
    getUserId(): Observable<string> {
        return this.getAccessToken().pipe(map(token => {
            return parseToken(token).userId;
        }));
    }

    /**
     * 获取本地保存的用户名
     *
     * @returns {Array<string>} 用户名列表
     * @memberof AuthService
     */
    getLocalAccounts(): Array<string> {
        return this.localAccounts ? Object.keys(this.localAccounts) : [];
    }

    /**
     * 处理 Token 请求响应
     *
     * @private
     * @param {TokenResponse} rawToken 通过 Http 请求获取的 Token 对象
     * @memberof AuthService
     */
    private resolveToken(rawToken: TokenResponse): void {
        const accessToken = rawToken.token;
        const refreshToken = rawToken.refreshToken;
        const accessTokenInfo: TokenInfo = parseToken(accessToken);
        const refreshTokenInfo: TokenInfo = parseToken(refreshToken);
      
        this.accessToken = {
            token: accessToken,
            expiration: accessTokenInfo.exp.toString()
        };

        this.refreshToken = {
            token: refreshToken,
            expiration: refreshTokenInfo.exp.toString()
        };
        // console.log('resolveToken',this.accessToken, this.refreshToken )
    }

    /**
     * 使用 Refresh Token 更新 Access Token，
     * 如果 Refresh Token 过期会重新登录
     *
     * @private
     * @returns {Observable<string>} Token 字符串的可观察对象
     * @memberof AuthService
     */
    private updateToken(): Observable<string> {
        if (tokenValid(this.refreshToken)) {
            if (this.isPending) {
                return this.pendingToken;
            }
            this.isPending = true;

            return this.pendingToken = this.http.post<TokenResponse>(API.REFRESH_TOKEN, {
                refreshToken: this.refreshToken.token
            }).pipe(
                tap(data => {
                    this.isPending = false;
                    this.saveAccount(this.currentUser, data);
                    this.resolveToken(data);
                }),
                map(data => data.token),
                share()
            );
        } else {
            const loginPath = '/login';
            if (location.pathname !== loginPath) {
                sessionStorage.setItem(sessionStorageKey.LAST_PAGE, location.pathname);
            }
            this.router.navigate([`${loginPath}`]);
            this.deauthorize.next();
            return throwError('登录过期');
        }
    }

    /**
     * 保存登录信息
     *
     * @private
     * @param {string} username 用户名
     * @param {TokenResponse} token Token
     * @memberof AuthService
     */
    private saveAccount(username: string, token: TokenResponse): void {
        const accounts = this.localAccounts;
        this.localAccounts = accounts
            ? username in accounts
                ? Object.keys(accounts)
                    .filter(item => item !== username)
                    .reduce((a, b) => ({ ...a, [b]: accounts[b] }), { [username]: token })
                : { ...accounts, [username]: token }
            : { [username]: token };
    }
}
