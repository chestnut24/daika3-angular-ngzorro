export const API = {
    // 认证
    LOGIN: '/api/auth/login',
    // PUBLIC_LOGIN: '/api/auth/login/public',
    REFRESH_TOKEN: '/api/auth/token',
    CHANGE_PASSWORD: '/api/auth/changePassword',

    // 用户
    USER: '/api/user',
    USERS: '/api/users',
    CUSTOMER: '/api/customer',
    CUSTOMERS: '/api/customers',
    CUSTOMERS_PAGE: '/api/customers/page',
    RESET_PWD: '/api/resetPwd',
    AVATAR: '/api/avatar',
    ACCESSES: '/api/accesses',
    ROLES: '/api/roles',
    ROLE: '/api/role',
    STRUCTURE: '/api/customer/structure',
    NEXT_LEVEL_LIST: '/api/customer/nextLevelList',
    MANAGE_LEVEL: '/api/customer/level',
    CLEAR_STRUCTURE: '/api/customer/clearStructure',
    CHANGE_PHONE: '/api/auth/changePhone',

    /** 系统配置管理 */

    // 设备管理-生产
    PRODUCTION_FIND_ALL_TYPE: '/api/production/findAllType',
    PRODUCTION_DELETE_TYPE: '/api/production/deleteType',
    PRODUCTION_SAVE_TYPE: '/api/production/saveType',
    // 区域
    PRODUCTION_FIND_ALL_AREA: '/api/production/findAllArea',
    // PRODUCTION_DELETE_AREA: '/api/production/deleteArea',
    PRODUCTION_SAVE_AREA: '/api/production/saveArea',
    // 生产设备
    PRODUCTION_FIND_lIST_ALL: '/api/production/findListAll',
    PRODUCTION_SAVE: '/api/production/save',
    PRODUCTION_FIND_BY_ID: '/api/production/findByid',
    PRODUCTION_DELETE: '/api/production/delete',

    // 监测设备-类型
    MONITOR_FIND_ALL_TYPE: '/api/monitor/findAllType',
    MONITOR_UPDATE_TYPE: '/api/monitor/updateType',
    MONITOR_DELETE_TYPE: '/api/monitor/deleteTypeByid',
    MONITOR_SAVE_TYPE: '/api/monitor/saveType',
    // 监测设备查询
    MONITOR_FIND_lIST: '/api/monitor/findList',
    MONITOR_SAVE: '/api/monitor/save',
    MONITOR_FIND_BY_ID: '/api/monitor/findByid',
    MONITOR_DELETE: '/api/monitor/delete',
    // 查询监测设备中没有绑定区域的
    MONITOR_FIND_lIST_NOAREA: '/api/production/findRelevance',
    // 系统配置管理
    FREIGHT: '/api/freights',
    FREIGHT_SAVE: '/api/freight/save',

    // 修改日志
    // MODIFICATION_LOG: '/api/updatelog/message',
    MODIFICATION_LIST: '/api/updatelog',
    MODIFICATION_LIST_B: '/api/log',

    // 入炉记录
    PLANS: '/api/plans/query',
    PUT_LINK: '/api/link', // 入炉作业操作-显示
    PUT_WORK: '/api/putWork', // 入炉作业操作-保存轧辊入炉
    PUT_METER: '/api/linkDetail/meter', // 入炉作业操作-抄表读数
    PUT_CRAFT: '/api/putWork/craft', // 入炉作业操作-按照工艺名称查询

    // 出炉记录
    TAKE_METER: '/api/takework/meter', // 出炉作业操作-抄表读数
    TAKE_WORK: '/api/takeWork', // 出炉作业操作-保存轧辊入炉

    // 入厂记录
    ENTRY_RECORD_ADD: '/api/roll/rollSave',
    ENTRY_RECORD_SEARCH: '/api/roll/findEntryRecordEntityList',

    CRAFT: '/api/craft',
    CRAFTS: '/api/crafts',
    CRAFT_APPROVALS: '/api/craft/approvals',
    CRAFT_APPROVAL: '/api/craft/approval',
    CRAFT_MATERIALS: '/api/freights',
    // 装炉计划
    PLAN_SAVE: '/api/plan',
    PLAN_CRAFTS: '/api/craftNumber',
    PLAN_DEVICES: '/api/plan/devices',
    PLAN_AREAS: '/api/plan/areas',
    PLAN_ROLLS: '/api/plan/rolls',
    PLAN_ROLLS_HT: '/api/plan/ht/rolls',

    PLAN_LINK_SAVE: '/api/link',
    PLAN_LIST: '/api/plans',
    PLAN_INFO: '/api/plan',
    PLAN_DELETE: '/api/delete',
    PLAN_LIST_ONE_DEL: '/api/deleteByPlanId',
    // 出厂管理
    FACTORY_FINISH_LIST: '/api/finishRecord',
    FACTORY_ROLL_LIST: '/api/rollRecord',
    FACTORY_CHANGE: '/api/change',
    // 查看明细
    // PLAN_INFO: '/api/plan/',

    // 质检管理
    BEFORE_SELF_CHECK: '/api/self/BEFORE_SELF_CHECK/checks',
    BEFORE_QUALITY_CHECK: '/api/quality/BEFORE_QUALITY_CHECK/checks',
    BEFORE_NG: '/api/ng/BEFORE_QUALITY_CHECK/ngs',
    AFTER_SELF_CHECK: '/api/self/AFTER_SELF_CHECK/checks',
    AFTER_QUALITY_CHECK: '/api/quality/AFTER_QUALITY_CHECK/checks',
    AFTER_NG: '/api/ng/AFTER_QUALITY_CHECK/ngs',

    /* 热处理*/
    HTS: '/api/hts',
    HT: '/api/ht',
    HT_START: '/api/ht/start',
    HT_START_AFTER: '/api/ht/start/judgment',
    HT_END: '/api/ht/end',
    HT_UPDATE: '/api/ht/update',
    HT_PAUSE: '/api/ht/pause',
    HT_CLEAR: '/api/ht/clear',
    HT_HISTORY: '/api/ht/history',
    HT_SUPERVISE_START: '/api/ht/supervise_start',
    HT_FIND_START_SUPERVISE_HT: '/api/ht/findStartSuperviseHt',

    // 炉外正火冷却
    NORMALIZING_COOLING: '/api/cooling/findpage',
    COOLING_SAVES: '/api/cooling/saves',
    COOLING_DETAILS: '/api/cooling/findPagePast',
    COOLING_GUN: '/api/select/monitor',
    WORKING_GUN: '/api/cooling/findCoolingMoitor',
    // webSocket长链接
    WS_TELEMETRY: '/api/ws/telemetry',

    // 数据报表
    POWER_MULTIPLE: '/api/production/save/powermultiple',

    // 轧辊履历
    ROLL_DETAILS: '/api/details',
    ROLL_RECORD: '/api/rollRecords',
    AFTER_RECORDS: '/api/afterRecords',
    BEFORE_RECORDS: '/api/beforeRecords',
    ENTER_FURNACE_RECORDS: '/api/putWorkRecords',
    TAKE_FURNACE_RECORDS: '/api/takeWorkRecords',
    NORMALIZING_COOLING_RECORDS: '/api/coolingTab',
    ENTRY_RECORD: '/api/rollTab',
    CHARGING_PLAN_RECORD: '/api/furnaceplanTab',
    RECORD_CRAFT: '/api/CraftTab',
    HEAT_TREATMENT_RECORD: '/api/HtTab',
    FREIGHT_INFO: '/api/BasicTab',

    // 0811补充接口
    ENTRY_ROLL_DEL: '/api/roll', // 删除入厂记录
    ENTRY_ROLL_MARK: '/api/mark', // 压辊操作
    HEAT_HISTORY_LIST: '/api/ht/findHtProcessList', // 热处理过程记录列表
};
