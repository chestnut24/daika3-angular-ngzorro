import { Freight } from './configuration-management';
import { User } from './user';

export interface SelfCheck {
    id: number; // 轧辊id
    status: string; // 轧辊状态
    productNo: string; // 生产号
    isBlank: string; // 是否为毛坯辊
    remark: string; // 备注
    freight: Freight;
    beforeSelfCheck?: BeforeSelfCheck;
    beforeQualityCheck?: BeforeQualityCheck;
    ngCheck: NgCheck;
    afterSelfCheck?: BeforeSelfCheck;
    afterQualityCheck?: BeforeQualityCheck;
}

export interface BeforeSelfCheck {
    id: number; // 热前自检id
    rollId: number; // 轧辊id
    type: SelfCheckType; // 自检类型
    exteriorCheck: string; // 外观检验
    exteriorUser: User; // 外观检验人
    exteriorCheckTime: number; // 外观检验时间
    isExempt: IsExempt | boolean; // 是否免检
    exemptReason: string; // 免检原因
    hardnessUser: User; // 硬度检验人
    hardnessCheckTime: number; // 硬度检验时间
    hardnessCheck1; // 硬度检验传端
    hardnessCheck2;
    hardnessCheck3;
    hardnessCheck4;
    hardnessCheck5;
    hardnessCheck6;
    hardnessCheck7; // 硬度检验非端
    unit1: string;
    unit2: string;
    result: Result; // 检查结果
    isDeleted: IsDeleted;
}

export interface BeforeQualityCheck {
    id: number; // 热前质检ID
    rollId: number; // 轧辊ID
    type: QualityType; // 质检类型
    checkUser: User; // 检验人
    chemistryCheck: CheckType; // 化学检验
    flawCheck: CheckType; // 探伤检验
    hardnessCheck: CheckType; // 硬度检验
    metalCheck: CheckType; // 金相检验
    sizeCheck: CheckType; // 尺寸检验
    chemistryCheckName: string; // 化学检验质检人
    flawCheckName: string; // 探伤检验质检人
    hardnessCheckName: string; // 硬度检验质检人
    metalCheckName: string; // 金相检验质检人
    sizeCheckName: string; // 尺寸检验质检人
    chemistryCheckTime: string; // 化学检验时间
    flawCheckTime: string; // 探伤检验时间
    hardnessCheckTime: string; // 硬度检验时间
    metalCheckTime: string; // 金相检验时间
    sizeCheckTime: string; // 尺寸检验时间
    result: QualityInspectionResult; // 质检结果
    isSecond: IsSecond; // 是否二次质检
    updatedDt: number; // 质检时间
    isDeleted: IsDeleted;
}

export interface NgCheck {
    id: number;
    rollId: number;
    type: QualityType; // 不合格类型
    result: NgCheckResult; // 处理结果
    dealUser: User; // 处理人
    remark: string;
    updatedDt: number; // 处理时间
    isDeleted: IsDeleted;
}
export enum SelfCheckType {
    BEFORE_SELF_CHECK = 'BEFORE_SELF_CHECK', // 热前自检,
    AFTER_SELF_CHECK = 'AFTER_SELF_CHECK', // 热后自检
}
export enum IsExempt {
    YES = 'YES', // 是
    NO = 'NO', // 否
}
export enum ActualFlag {
    MAX = 'MAX', // 最大温度
    MIN = 'MIN' // 最小温度
}
export enum MonitorStatus {
    START = 'START', // 开始监控
    STOP = 'STOP', // 停止监控
    CONTINUE = 'CONTINUE', // 继续监控
    COERCE_STOP = 'COERCE_STOP' // 强制结束
}
export enum CoolingStatus {
    NOT_START = 'NOT_START', // 未开始
    NOT_END = 'NOT_END', // 即将结束
    IN_COOLING = 'IN_COOLING', // 冷却中
    WIN = 'WIN', // 正常完成
    COERCE_WIN = 'COERCE_WIN' // 强制完成
}


export enum Result {
    CHECKED = 'CHECKED', // 已检
    NOT_CHECK = 'NOT_CHECK', // 未检
}
export enum IsDeleted {
    NORMAL = 'NORMAL', // 正常
    DELETED = 'DELETED', // 删除
    SYSTEM = 'SYSTEM', // 不可删除
}
export enum QualityInspectionResult {
    NOT_CHECK = 'NOT_CHECK', // 未检
    OK = 'OK', // 合格
    NG = 'NG', // 不合格
    SCRAPPED = 'SCRAPPED', // 报废
    SECOND_CHECK = 'SECOND_CHECK', // 二次质检
    ONGOING = 'ONGOING', // 填写中
}
export enum QualityType {
    BEFORE_QUALITY_CHECK = 'BEFORE_QUALITY_CHECK', // 热前质检
    AFTER_QUALITY_CHECK = 'AFTER_QUALITY_CHECK', // 热后质检
}
export enum CheckType {
    OK = 'OK', // 合格
    NG = 'NG', // 不合格
    EXEMPT = 'EXEMPT', // 免检
}
export enum IsSecond {
    'YES' = 'YES', // 是
    'NO' = 'NO', // 否
}

export enum NgCheckResult {
    NOT_DEAL = 'NOT_DEAL', // 未处理
    IGNORE = 'IGNORE', // 忽略
    SECOND_CHECK = 'SECOND_CHECK', // 二次质检
    SECOND_HT = 'SECOND_HT', // 二次热处理
    SCRAPPED = 'SCRAPPED', // 报废
}

export enum Check {
    BEFORE_SECOND_CHECK = 'BEFORE_SECOND_CHECK', // 热前二次质检
    BEFORE_NG_DEAL = 'BEFORE_NG_DEAL', // 热前不合格处理
}
export enum AfterCheck {
    AFTER_SECOND_CHECK = 'AFTER_SECOND_CHECK', // 热后二次质检
    AFTER_NG_DEAL = 'AFTER_NG_DEAL', // 热后不合格处理
}




