import { UserType } from './interface/user';

export const localStorageKey = {
    ACCESS_TOKEN: 'access_token',
    ACCESS_TOKEN_EXPIRATION: 'access_token_expiration',
    REFRESH_TOKEN: 'refresh_token',
    REFRESH_TOKEN_EXPIRATION: 'refresh_token_expiration',

    JOINCLOUD_ACCESS_TOKEN: 'joincloud_access_token',
    JOINCLOUD_ACCESS_TOKEN_EXPIRATION: 'joincloud_access_token_expiration',
    JOINCLOUD_REFRESH_TOKEN: 'joincloud_refresh_token',
    JOINCLOUD_REFRESH_TOKEN_EXPIRATION: 'joincloud_refresh_token_expiration',

    LOCAL_ACCOUNTS: 'local_accounts',
    CURRENT_USER: 'current_user',
    MENU_IS_COLLAPSED: 'menu_is_collapsed',
};
export const sessionStorageKey = {
    LAST_PAGE: 'last_page' // 当访问被拦截时的页面
};

export const token = {
    HEADER_PREFIX: 'Bearer ',
    JWT_TOKEN_HEADER_PARAM: 'X-Authorization'
};

export const userTypeName = {
    [UserType.VISITOR]: '数据访问',
    [UserType.SPEC_OPERATOR]: '光谱仪操作员',
    [UserType.ADMINISTRATOR]: '系统管理员',
    [UserType.OPERATOR]: '系统操作员',
};
