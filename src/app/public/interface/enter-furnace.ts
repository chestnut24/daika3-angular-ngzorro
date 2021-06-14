import {HttpParams} from '@angular/common/http';

// 入炉作业-获取计划列表 get 的请求参数 同装炉计划
export interface PlansInquiry extends HttpParams {
    createdTime: number; // 创建时间
    startTime: number; // 开始时间
    freightNumber: string; // 货号
}

// 入炉作业-获取计划列表的响应参数
export interface Plans extends HttpParams {
    id: number; // 计划id
    status: string;
    isDeleted: string;
    createdDt: number;
    planner: Planner; // 计划员
    technician: Technician; // 技术员
    links: Links[]; // 计划内环节
    totalTr?: number;     // 计算当前子元素的行数
}

// 计划员  此处查看入炉计划和查看入炉环节 使用的参数有所不同
export interface Planner extends HttpParams {
    id: number; // 计划员id
    customer_id?: string; // 计划员用户组ID
    name: string; // 计划员名称
    staffNO: string; // 计划员编号
    avatar?: string; // 计划员头像
    email?: string; // 计划员邮箱
    phone?: string; // 计划员手机号
    remark?: string; // 计划员备注
    isDeleted: string; // 是否删除
}

// 技术员
export interface Technician extends HttpParams {
    id: number; // 技术员id
    customer_id?: string;
    name: string; // 技术员名称
    staffNO: string; // 技术员编号
    avatar?: string; // 技术员头像
    email?: string;
    phone?: string;
    remark?: string;
    isDeleted: string; // 是否删除
}

// 计划内环节
export interface Links extends HttpParams {
    id: number;
    planId: number;
    name: string; // 环节名称
    details: Details[]; // 环节详情数组
}

// 环节详情
export interface Details extends HttpParams {
    id: number;
    linkId: number;
    startTime: number; // 生产时间
    endTime: number; // 预计结束时间
    putMeterReading: string; // 入炉抄表读数
    takeMeterReading: string; // 出炉抄表读数
    isDeleted: string; // 删除标志
    craft: Craft; // 工艺对象
    device: Device; // 使用设备对象
    area: Area;
    freights: Freights[]; // 货号数组
    totalFreight?: number; // 总共轧辊数
    totalNotPut?: number; // 总共未入炉轧辊数
    totalNotTake?: number; // 总共未出炉轧辊数
    totalOut?: number; // 总共出炉轧辊数
    isCooling?: number; // 是否有正火冷却以及冷却结束
}

// 工艺
export interface Craft extends HttpParams {
    id: number; // 工艺id
    name: string; // 工艺名称
    craftNo: string; // 工艺编号
    curveImgPath: string; // 工艺图片路径
    needCooling: string; // 是否需要正火冷却
}

// 使用设备对象
export interface Device extends HttpParams {
    id: number; // 设备id
    name: string; // 设备名称
    deviceNum: string; // 设备编号
    manufacturer: string; // 生产厂家
    isDeleted: string; // 是否删除
    htStatus?: string; // 热处理过程
    isPut?: number; // 炉中是否有轧辊
    // NOT_START未开始 PROCESSING执行中 COMING_SOON即将结束 END结束
}

export interface Area extends HttpParams {
    id: number; // 区域id
    areaName: string; // 区域名称
    isDeleted: string; // 是否删除
}

export interface Freights {
    id: number;
    freightNumber: string; // 货号
    material: string; // 材质
    materialCode: string; // 材质代码
    size: string; // 尺寸
    netWeight: string; // 净重
    detailRolls: DetailRolls[]; // 关联的轧辊以及装炉位置
    notPutRolls?: Array<string>; // 未入炉的轧辊生产号
    notTakeRolls?: Array<string>; // 未出炉的轧辊生产号
}
// 关联的轧辊以及装炉位置
export interface DetailRolls {
    id: number; // detailRoll表的ID
    detailId: number; // 详情id
    position?: string; // 装炉位置
    status?: string; // 状态：NOT_PUT, IN_FURNACE, EXECUTING, OUT_FURNACE 未入炉 入炉 执行 出炉
    roll: Rolls; // 轧辊
    coolingMapList?: CoolingMapList[]; // 正火冷却状态数组
}
// 关联扎辊  其中的freight已经在轧辊货号管理接口定义
export interface Rolls extends HttpParams {
    id: number; // 轧辊id
    productNo: string; // 生产号
    isBlank?: string; // 是否毛坯轧辊
    remark: string; // 备注
    putDt?: number; // 装炉日期
    putBy?: string;  // 装炉操作人
}
// 正火冷却的处理数组
export interface CoolingMapList {
    id: number;
    status: number; // 3、4代表正火冷却结束
}
// 入炉作业操作-显示 get 响应内容
export interface DetailInquiry {
    id: number;
    linkId: number;
    craft: Craft;
    device: Device;
    area: Area;
    startTime: number;
    endTime: number;
    putMeterReading?: string; // 入炉抄表读数
    takeMeterReading?: string; // 出炉抄表读数
    remark?: string;
    createdDt?: number;
    createdBy?: number;
    updatedDt?: number;
    updatedBy?: number;
    isDeleted?: string;
    freights: Freights[]; // 货号数组
    furnacePutted?: Freights[]; // 将货号按具体位置装入数组
    detailRolls?: any[];
}

// 入炉作业操作-抄表读数 post
export interface SavePutWorkMeter {
    id: number;
    putMeterReading: string; // 入表读数
}
// 出炉作业操作-抄表读数 post
export interface SaveTakeWorkMeter {
    id: number;
    takeMeterReading: string; // 入表读数
}

// 入炉作业操作-按照工艺名称查询 get 请求参数
export interface CraftInquiry extends HttpParams {
    name: string; // 工艺名称
}

// 入炉作业操作-按照工艺名称查询 响应内容
export interface CraftReturn {
    name: string; // 工艺名称
    craftNo: string; // 工艺编号
    materialRange: string; // 材质范围
    specificationRange: string; // 规格范围
    hardnessScope: string; // 硬度要求范围
    applicableDevice: string; // 适用设备
    machineHour: string; // 使用台时
    tooling: string; // 工具及工装准备
    isNormalizing: string; // 是否需要正火冷却 0需要 1不需要
}
