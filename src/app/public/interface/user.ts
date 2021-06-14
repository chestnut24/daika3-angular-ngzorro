import {AccessesID, CustomerID, RoleID, UserID, BaseEntity } from './common';

/**
 * 用户角色
 *
 * @export
 * @enum {number}
 */
export enum UserType {
    /**
     * 系统管理员
     */
    ADMINISTRATOR = 'ADMINISTRATOR',
    /**
     * 系统操作员
     */
    OPERATOR = 'OPERATOR',
    /**
     * 光谱仪操作员
     */
    SPEC_OPERATOR = 'SPEC_OPERATOR',
    /**
     * 数据访问
     */
    VISITOR = 'VISITOR',
}

/**
 * 用户
 *
 * @export
 * @interface User
 */
export interface User{
    /**
     * 用户 ID
     *
     * @type {ID}
     * @memberof User
     */
    id?:string;

    /**
     * 用户名
     *
     * @type {string}
     * @memberof User
     */
    name:string;


    /**
     * 邮箱
     *
     * @type {string}
     * @memberof User
     */
    email?:string;

    /**
     * 手机号码
     *
     * @type {string}
     * @memberof User
     */
    phone?:string;

    /**
     * 头像路径
     *
     * @type {string}
     * @memberof User
     */
    avatar?:string;

    /**
     * 备注
     *
     * @type {string}
     * @memberof User
     */
    remark?:string;

    authority?:string;

    checked?:boolean;

    roleId?:string;

    role?:Role;

    password?:string;

    staffNo?:string;
    customers?:Customer[];
}


export class UserEntity extends BaseEntity implements User{
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    remark?: string;
    authority?: string;
    checked?: boolean;
    roleId?: string;
    role?: Role;
    password?: string;
    staffNo?: string;
    customers?:Customer[];
    constructor(user:User){
        super();
        // user.id = new UserID(user.id.id);
        Object.assign(this,user);
    }
}

/**
 * 用户组
 *
 * @export
 * @interface Customer
 */
export interface Customer {
    id:string | null;// 用户组id
    name:string; // 用户组名
    group:string; // 组名
    users?:User[];// 用户
    remark:string;// 备注
    checked?:boolean;// 是否被选中
    userIds?:string[];// 修改时传递的数组
    parentId?:string;
}

export interface Role{
    id:string; // 角色id
    name:string; // 角色名称
    accesses:Accesses[]; // 所包含角色
    remark:string; // 备注
    power?:string;
}

export interface Accesses{ // 权限列表
    id:string;
    pid:string;
    name:string;
    value:string;
    remark:string;
    children:Accesses;
}

export interface SearchConfig{
    pageNum:number;
    pageSize:number;
    searchText:string;
}

export interface Structure extends Customer{
    children:Customer[];
}

export interface NextLevel{
    hasRoot:boolean;
    customerList:Customer[];
}

