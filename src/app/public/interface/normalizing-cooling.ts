import {ActualFlag, CoolingStatus} from './quality-inspection-management';

export interface CoolingPages {
    id: number; // id
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    rollId: number; // 轧辊ID
    roll: Roll; // 轧辊信息
    targetTemp: string; // 目标温度
    currentTemp: string; // 当前温度
    status: CoolingStatus; // 冷却状态 NOT_START(未开始), NOT_END(即将结束), IN_COOLING(冷却中)
    endDeviation: string; // 结束允许偏差值
    remindEndTemp: string; // 结束提醒温度
    monitor: Product; // 设备列表
    actualFlag: ActualFlag; // 最高温度 最低温度
}
export interface Freight {
    freightNumber: string; // 货号
    size: string; // 尺寸
    netWeight: string; // 净重
    material: string; // 材质
    materialCode: string; // 材质代码
    productionUnit: string; // 生产单位
}
export interface Roll {
    productNo: string; // 生产号
    freight: Freight; // 轧辊信息
    user: User; // 操作人信息
}
export interface User {
    name: string; // 操作人
}
export interface Product {
    id: number; // 测温枪id
    name: string; // 设备名称
    temp: string; // 温度
}
export interface CoolingSaves {
    // id: string;
    targetTemp: string; // 目标温度
    endDeviation: string; // 结束允许偏差
    remindEndTemp: string; // 提醒结束温度
    actualFlag: string; // 最大温度/最低温度【MAX,MIN】
    deviceId: number; // 测温枪id
}
export interface CoolingDetails {
    id: string; // 正火冷却id
    roll: Roll; // 轧辊信息
    deviceId: number; // 测温枪ID
    operator: Oprator; // 操作人信息
    monitor: Monitor; // 测温枪信息
    actualFlag: ActualFlag; // 最大温度 最小温度
    status: CoolingStatus; // 冷却状态
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    targetTemp: string; // 目标温度
    currentTemp: string; // 当前温度
    endDeviation: string; // 允许结束偏差值
    remindEndTemp: string; // 结束提醒温度
    actualEndTemp: string; // 实际结束温度
    endDeviveName: string; // 结束时测温枪的名称

}
export interface Oprator {
    name: string; // 操作人的名称
}
export interface Monitor {
    id: number; // 测温枪id
    name: string; // 测温枪名称
}

export interface CoolingGun {
    id: number; // 测温枪id
    name: string; // 测温枪名称
    temp: string; // 测温枪温度
}



