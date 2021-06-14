import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { switchMap, catchError, tap, share, map } from 'rxjs/operators';
import { isEqual } from 'lodash';

import { User, Customer, Role, Accesses, SearchConfig, Structure, NextLevel,  UserEntity } from '../public/interface/user';
import { AuthService } from './auth.service';
import { API } from '../public/api';
import { ResponseResult, Pagination, PaginationResolver } from '../public/interface/common';


@Injectable()
export class UserService {

    private currentUserIsPending = false;

    private pendingCurrentUser: Observable<User>;

    private updateUser: Subject<User>;

    private currentUser: User;

    /**
     * 用户信息更新事件
     *
     * @type {Observable<User>}
     * @memberof UserService
     */
    public currentUserChange: Observable<User>;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
        this.updateUser = new Subject<User>();
        this.currentUserChange = this.updateUser.asObservable();
        this.currentUserChange.subscribe(user => {
            this.currentUser = user;
        });
        this.auth.onDeauthorize.subscribe(() => {
            this.currentUserIsPending = false;
            this.pendingCurrentUser = null;
        });
    }

    /**
     * 获取当前登录用户信息
     *
     * @returns {(Observable<User | null>)}
     * @memberof UserService
     */
    getCurrentUser(): Observable<User | null> {
        // 同一时刻多次调用只发起一个请求
        if (!this.currentUserIsPending) {
            this.currentUserIsPending = true;
            this.pendingCurrentUser = this.auth.getUserId().pipe(
                switchMap(id => this.getUser(id)),
                tap(user => {
                    this.currentUserIsPending = false;
                    this.updateCurrentUser(user);
                }),
                catchError(e => {
                    this.router.navigate(['/login']);
                    return throwError(e);
                }),
                share()
            );
        }
        return this.pendingCurrentUser;
    }

    /**
     * 按 ID 获取用户
     *
     * @param {string} id
     * @returns {Observable<User>}
     * @memberof UserService
     */
    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${API.USER}/${id}`).pipe(map(user => new UserEntity(user)));
    }

    /**
     * 添加用户
     *
     * @param {User}
     * @returns {Observable<ResponseResult>}
     * @memberof UserService
     */
    addUser(user: Partial<User>): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(API.USER, user);
    }

    /**
     * 获取用户组列表
     *
     * @returns {Observable<Customer[]>}
     * @memberof UserService
     */
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(API.CUSTOMERS);
    }

    getCustomersPage(pageNum: number, pageSize: number): Observable<Pagination<Customer>> {
        return this.http.post<Pagination<Customer>>(API.CUSTOMERS_PAGE, {}, {
            params: {
                pageNum: pageNum.toString(),
                pageSize: pageSize.toString(),
            }
        });
    }

    addCustomer(customer: Partial<Customer>): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(API.CUSTOMER, customer);
    }

    /**
     * 修改密码
     *
     * @param {string} currentPassword 当前密码
     * @param {string} newPassword 新密码
     * @returns {Observable<ResponseResult>}
     * @memberof UserService
     */
    updatePassword(currentPassword: string, newPassword: string): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(API.CHANGE_PASSWORD, {
            currentPassword,
          newPassword: newPassword.toLowerCase()
        });
    }

    /**
     * 更新当前用户信息
     *
     * @private
     * @param {User} user
     * @memberof UserService
     */
    private updateCurrentUser(user: User) {
        if (!isEqual(user, this.currentUser)) {
            this.updateUser.next(user);
            this.currentUser = user;
        }
    }

    // 以下为用户v2.0
    getAccessesList(): Observable<Accesses[]> { // 获取权限列表
        return this.http.get<Accesses[]>(API.ACCESSES);
    }

    getRoleList(searchConfig: SearchConfig): Observable<Pagination<Role>> {// 获取角色列表
        return this.http.get<Pagination<Role>>(API.ROLES + this.searchUrl(searchConfig));
    }

    modifyRole(id: string, name: string, accesses: string[], remark: string): Observable<ResponseResult> { // 添加/修改角色
        return this.http.post<ResponseResult>(API.ROLE, {id, name, accessIds: accesses, remark});
    }

    deleteRoles(ids: string[]): Observable<ResponseResult> { // 删除/批量删除角色
        return this.http.request<ResponseResult>('delete', API.ROLES, {body: ids});
    }

    getCustomersList(searchConfig: SearchConfig): Observable<Pagination<Customer>> {// 获取用户组
        return this.http.get<Pagination<Customer>>(API.CUSTOMERS + this.searchUrl(searchConfig));
    }

    deleteUsers(idList: string[]): Observable<ResponseResult> {// 删除用户
        return this.http.request<ResponseResult>('delete', API.USERS, { body: idList });
    }

    deleteCustomers(idList: string[]): Observable<ResponseResult> {// 删除用户组
        return this.http.request<ResponseResult>('delete', API.CUSTOMERS, {body: idList});
    }

    modifyCustomer(customer: Customer): Observable<ResponseResult> {// 修改用户组
        return this.http.post<ResponseResult>(API.CUSTOMER, customer);
    }

    getUsersList(searchConfig: SearchConfig): Observable<Pagination<User>> {// 获取用户列表
        return this.http.get<Pagination<User>>(API.USERS + this.searchUrl(searchConfig)).pipe(
            map(pagination => new PaginationResolver<User>(UserEntity).resolve(pagination))
        );
    }

    modifyUser(user: User): Observable<ResponseResult> {// 修改用户
        return this.http.post<ResponseResult>(API.USER, user);
    }

    searchUrl(searchConfig: SearchConfig): string { // 搜索和分页的url
        return `?pageNum=${searchConfig.pageNum}&pageSize=${searchConfig.pageSize}&searchText=${searchConfig.searchText}`;
    }

    getStructure(): Observable<Structure> {
        return this.http.get<Structure>(API.STRUCTURE);
    }

    getNextLevelList(id): Observable<NextLevel> {
        return this.http.get<NextLevel>(API.NEXT_LEVEL_LIST + `/${id}`);
    }

    manageLevel(level): Observable<Customer> {
        return this.http.post<Customer>(API.MANAGE_LEVEL, level);
    }

    clearStructure(): Observable<any> {
        return this.http.get(API.CLEAR_STRUCTURE);
    }

    editPhone(password: string, phone: string): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(API.CHANGE_PHONE, {
            currentPassword: password,
            newPhone: phone
        });
    }

}
