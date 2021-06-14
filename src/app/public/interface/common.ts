/**
 * 请求返回值
 *
 * @export
 * @interface ResponseResult
 */
export interface ResponseResult {
    /**
     * 返回的成功与否
     *
     * @type {boolean}
     * @memberof ResSuccess
     */
    result: boolean;
    /**
     * 消息
     *
     * @type {string}
     * @memberof ResponseResult
     */
    message?: string;
}

export enum EntityType {
    /**
     * 用户
     */
    USER = 'USER',
    /**
     * 用户组
     */
    CUSTOMER = 'CUSTOMER',
    ROLE = 'ROLE',
    ACCESS = 'ACCESS',
}

export class ID {
    constructor(public id: string, public entityType: EntityType) { }
}

export class UserID extends ID {
    constructor(id: string) {
        super(id, EntityType.USER);
    }
}

export class CustomerID extends ID {
    constructor(id: string) {
        super(id, EntityType.CUSTOMER);
    }
}

export class RoleID extends ID {
    constructor(id: string) {
        super(id, EntityType.ROLE);
    }
}

export class AccessesID extends ID {
    constructor(id: string) {
        super(id, EntityType.ACCESS);
    }
}




/**
 * 分页
 *
 * @export
 * @interface Pagination
 * @template T
 */
export interface Pagination<T> {
    /**
     * 数据
     *
     * @type {Array<T>}
     * @memberof Pagination
     */
    content: Array<T>;
    /**
     * 是否为最后一页
     *
     * @type {boolean}
     * @memberof Pagination
     */
    last: boolean;
    /**
     * 总页数
     *
     * @type {number}
     * @memberof Pagination
     */
    totalPages: number;
    /**
     * 元素总数
     *
     * @type {number}
     * @memberof Pagination
     */
    totalElements: number;
    /**
     * 分页大小
     *
     * @type {number}
     * @memberof Pagination
     */
    size: number;
    /**
     * 页数
     *
     * @type {number}
     * @memberof Pagination
     */
    number: number;
    /**
     * 排序规则
     *
     * @type {*}
     * @memberof Pagination
     */
    sort: string[]|null;
    /**
     * 当前页元素数量
     *
     * @type {number}
     * @memberof Pagination
     */
    numberOfElements: number;
    /**
     * 是否为第一页
     *
     * @type {boolean}
     * @memberof Pagination
     */
    first: boolean;
}

export class PaginationResolver<T> {

    constructor(private clazz: new (o: T) => T) {}

    resolve(pagination: Pagination<T>) {
        pagination.content = pagination.content.map(item => new this.clazz(item));
        return pagination;
    }
}

export class BaseEntity {
    name?: string;
    isDeleted?: IsDeletedType;
    toString() {
        if (this.isDeleted === IsDeletedType.DELETED) {
            return `<del>${this.name}</del>`;
        } else {
            return this.name;
        }
    }
}

export enum IsDeletedType {
    NORMAL,
    DELETED,
    SYSTEM,
}

export interface ResponseDate<T> {
    code: number;
    data: T;
    msg: string;
    success: boolean;
}