import {Craft, SpeedupType, TemperatureType} from './configuration-management';
import {Device, Freights} from './enter-furnace';
import {HttpParams} from '@angular/common/http';
import {IsDeleted} from './quality-inspection-management';

export interface HeatTreatment {
    id: number;
    areaName: string; // 区域名称
    htInfo: Array<HtInfo>; // 热处理信息
}
export interface HtInfo {
    production: {
        id?: number;
        name: string; // 设备名称
        htStatus: HtStatus; // 热处理状态
        fatherNode: Array<number>; // 以第二个判断：2高温炉，3低温炉，4燃气炉
    };
    htRecord: HtRecord;
// { // 热处理记录
//         furnaceTemp: number; // 炉温
//         rollTemp: number; // 辊温
//         startTime: number; // 开始时间
//         endTime: number; // 结束时间
//     };
    linkDetail?: LinkDetail;
    planLink?: {
        planId: string;
    };
}
export enum HtStatus {
    NOT_START = 'NOT_START', // 未开启
    PROCESSING = 'PROCESSING', // 进行中
    COMING_SOON = 'COMING_SOON', // 即将开启
    COMING_TO_END = 'COMING_TO_END', // 热处理即将结束
    END = 'END', // 加热结束
}

export interface HtDetail {
    htRecord: HtRecord;
    device: HtDevice;
    linkDetail: LinkDetail;
}

export interface HtRecord {
    id: number; // 热处理ID
    detailId: number; // 详情ID
    startTime: number; // 开始时间
    endTime: number; // 结束时间
    monitorStandard: MonitorStandard; // 监控标准
    correctSign: CorrectSign; // 矫正符号
    correctTime: number; // 矫正时间
    furnaceTemp: number; // 炉温
    rollTemp: number; // 辊温
    htPauses: HtPause[]; // 暂停记录
    htAlarms: HtAlarms[]; // 热处理警报
}
export enum MonitorStandard {
    AVG = 'AVG', // 平均
    MIN = 'MIN',  // 最小
    MAX = 'MAX', // 最大
}
export enum CorrectSign {
    POSITIVE = 'POSITIVE', // 正
    NEGATIVE = 'NEGATIVE' // 负
}
export interface HtPause {
    id: number;
    htRecordId: number;
    time: number;
    type: HtPauseType;
}
export enum HtPauseType {
    START = 'START', // 暂停
    END = 'END', // 恢复
}
export interface HtAlarms {
    id: number; // 警报ID
    htRecordId: number; // 热处理ID
    curve: { // 工艺曲线
        speedupType: SpeedupType,
        temperatureType: TemperatureType
    };
    startTime: number; // 开始时间
    endTime: number; // 结束时间
    // device: HtAlarmsDevice; // 监控设备
    actualTemp: number; // 实际温度
    targetTemp: number; // 目标温度
    alarmDeviation: number; // 警报偏差值
    status: HtAlarmsStatus; // 警报状态
    monitorStandard: MonitorStandard; // 监控标准
}
export interface HtAlarmsDevice {
    id: number;
    name: string; // 设备名称
    deviceNum: string; // 设备编号
    monitorPostion: string; // 监控位
    type: TemperatureType; // 温度类型
    jcUuid: string; // ws返回数据对应设备的key值
    otherInfo: { // 实际温度，方便数据传递
        actualTemp: number;
        deviation: number; // 偏差值
        targetTemp: number | string;
        history?: [];
        speedupType?: string;
    };
    borderColor?: 'default' | 'active';
}
export enum HtAlarmsStatus {
    ACTIVE = 'ACTIVE', // 活跃
    CLEARED = 'CLEARED', // 已清除
}

export interface HtDevice {
    id: number; // 设备id
    name: string; // 设备名称
    deviceNum: string; // 设备编号
    manufacturer: string; // 生产厂家
    isDeleted: string; // 是否删除
    monitorList: HtAlarmsDevice[]; // 监控设备
}
export interface LinkDetail {
    id: number; // 详情ID
    linkId: number;
    startTime: number;
    endTime: number;
    putMeterReading: string; // 入炉抄表读数
    takeMeterReading: string; // 出炉超标读数
    isDeleted: IsDeleted;
    craft: Craft;
    freights: Freights[];
    furnacePutted: Freights[];
}

export interface HtStart {
    id: number;
    monitorStandard: MonitorStandard;
    correctSign?: CorrectSign;
    correctTime?: number;
}


