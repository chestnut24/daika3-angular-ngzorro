// 货号对象
import { AfterCheck, Check, IsExempt, NgCheckResult, QualityInspectionResult } from './quality-inspection-management';

export interface Freight {
    id: number;
    freightNumber: string; // 货号
    material: string; // 材质
    materialCode: string; // 材质代码
    netWeight: string; // 净重
    size: string; // 尺寸
    client: string; // 用户信息
    productionUnit: string; // 生产单位
    productNo: string; // 生产号
    neckHardness: string; // 颈部硬度要求
    bodyHardness: string; // 轧辊身硬度要求
}
// 轧辊履历-转辊记录
export interface RollRecord {
    id: number;
    updatedDt: number; // 转辊时间
    updatedUser: UpdatedUser; // 转辊作业人对象

}
export interface UpdatedUser {
    name: string; // 转辊作业人姓名
}
// 轧辊明细表
export interface ResumeDetail {
    rollId: number;
    freightNumber: string; // 货号数组
    productNo: string; // 生产号
    isBlank: string; // 是否是毛坯辊
    size: string; // 尺寸
    netWeight: string; // 净重
    processStatus: ProcessStatus; // 生产状态
    status: RollStatus; // 入厂0 在厂1 报废 2 转辊 3
    afterQualityCheck: number; // 热后质检
    beforeQualityCheck: number; // 热前质检
    FurnacePlan: string[]; // 装炉计划
    rollWorkRecordInto: string[]; // 入炉记录
    rollWorkRecordReleased: string[]; // 出炉记录
    rollCooling: string[]; // 正火冷却
    rollHt: string[]; // 热处理
    rollConversion: string[]; // 转辊
}
export enum RollStatus {
    ENTER = '0', // 入厂
    IN = '1', // 在厂
    SCRAP = '2', // 报废
    CHANGE = '3' // 转辊
}
export enum ProcessStatus {
    TO_BEFORE_QC = '0', // 待热前质检
    TO_PLAN = '1', // 待计划
    TO_PUT = '2', // 待入炉
    TO_HT = '3', // 待热处理
    TO_TAKE = '4', // 待出炉
    TO_COOLING = '5', // 待正火冷却
    TO_AFTER_QC = '6', // 待热后质检
    COMPLETED = '7', // 完成
    SCRAPPED = '8', // 报废
    HT = '9', // 热处理中
}

// 轧辊履历-热后质检记录
export interface AfterQuality<T> {
    id: number; // 轧辊ID
    afterSelfCheck: AfterSelfCheck; // 热后自检
    afterQualityCheck: AfterQualityCheck; // 热后质检
    checkRecords: Array<T>; // 不合格处理/二次质检
    freight: Freight;
}
export interface AfterSelfCheck {
    hardnessUser: HardnessUser; // 自检人对象
    hardnessCheckTime: number; // 自检时间
    isExempt: IsExempt; // 硬度免检
    exemptReason: string; // 免检原因
    hardnessCheck1: string; // 传端
    hardnessCheck2: string; // 1
    hardnessCheck3: string; // 2
    hardnessCheck4: string; // 3
    hardnessCheck5: string; // 4
    hardnessCheck6: string; // 5
    hardnessCheck7: string; // 非端
    unit1: string;
    unit2: string;
}
export interface ExteriorUser {
    name: string; // 自检人
}
export interface AfterQualityCheck {
    updatedDt: number; // 质检时间
    checkUser: CheckUser; // 质检人对象
    chemistryCheck: QualityInspectionResult; // 化学检验
    chemistryCheckTime: string; // 化学检验时间
    chemistryCheckName: string; // 化学检验名称
    flawCheck: QualityInspectionResult; // 探伤检验
    flawCheckTime: string; // 探伤检验时间
    flawCheckName: string; // 探伤检验名称
    hardnessCheck: QualityInspectionResult; // 硬度检验
    hardnessCheckTime: string; // 硬度检验时间
    hardnessCheckName: string; // 硬度检验名称
    metalCheck: QualityInspectionResult; // 金相检验
    metalCheckTime: string; // 金相检验时间
    metalCheckName: string; // 金相检验名称
    sizeCheck: QualityInspectionResult; // 尺寸检验
    sizeCheckTime: string; // 尺寸检验时间
    sizeCheckName: string; // 尺寸检验名称
    result: QualityInspectionResult; // 热后质检结果
}
export interface CheckUser {
    name: string; // 质检人
}
export interface CheckRecords {
    afterNgDeal: AfterNgDeal; // 热后不合格处理
    afterSecondCheck: AfterSecondCheck; // 二次质检
    type: AfterCheck;
}
export interface AfterNgDeal {
    remark: string; // 备注
    updatedDt: number; // 审批时间
    checkUser: CheckUser;
    result: QualityInspectionResult; // 质检结果处理
}
export interface AfterSecondCheck {
    updatedDt: string; // 质检时间
    checkUser: CheckUser; // 质检人对象
    chemistryCheck: QualityInspectionResult; // 化学检验
    flawCheck: QualityInspectionResult; // 探伤检验
    hardnessCheck: QualityInspectionResult; // 硬度检验
    metalCheck: QualityInspectionResult; // 金相检验
    sizeCheck: QualityInspectionResult; // 尺寸检验
    result: QualityInspectionResult; // 热后质检结果
}

// 轧辊履历-热前质检记录
export interface BeforeQuality<T> {
    id: number; // 轧辊ID
    beforeSelfCheck: BeforeSelfCheck; // 热前自检
    beforeQualityCheck: BeforeQualityCheck; // 热前质检
    checkRecords: Array<T>; // 不合格处理/二次质检
    freight: Freight;
}
export interface BeforeSelfCheck {
    exteriorCheck: string; // 外观检验
    exteriorUser: ExteriorUser; // 自检人对象
    exteriorCheckTime: number; // 外观自检时间
    isExempt: IsExempt; // 硬度免检
    exemptReason: string; // 免检原因
    hardnessUser: HardnessUser; // 硬度检验
    hardnessCheckTime: number; // 硬度自检时间
    hardnessCheck1: string; // 传端
    hardnessCheck2: string; // 1
    hardnessCheck3: string; // 2
    hardnessCheck4: string; // 3
    hardnessCheck5: string; // 4
    hardnessCheck6: string; // 5
    hardnessCheck7: string; // 非端
    unit1: string;
    unit2: string;
}
export interface HardnessUser {
    name: string; // 硬度自检人
}
export interface BeforeQualityCheck {
    updatedDt: number; // 质检时间
    checkUser: CheckUser; // 质检人对象
    chemistryCheck: QualityInspectionResult; // 化学检验
    chemistryCheckTime: string; // 化学检验时间
    chemistryCheckName: string; // 化学检验名称
    flawCheck: QualityInspectionResult; // 探伤检验
    flawCheckTime: string; // 探伤检验时间
    flawCheckName: string; // 探伤检验名称
    hardnessCheck: QualityInspectionResult; // 硬度检验
    hardnessCheckTime: string; // 硬度检验时间
    hardnessCheckName: string; // 硬度检验名称
    metalCheck: QualityInspectionResult; // 金相检验
    metalCheckTime: string; // 金相检验时间
    metalCheckName: string; // 金相检验名称
    sizeCheck: QualityInspectionResult; // 尺寸检验
    sizeCheckTime: string; // 尺寸检验时间
    sizeCheckName: string; // 尺寸检验名称
    result: QualityInspectionResult; // 热后质检结果
}
export interface CheckRecordsBefore {
    beforeNgDeal: BeforeNgDeal; // 热前不合格处理
    beforeSecondCheck: BeforeSecondCheck; // 二次质检
    type: Check;

}
export interface BeforeNgDeal {
    remark: string; // 备注
    updatedDt: number; // 审批时间
    checkUser: CheckUser;
    result: NgCheckResult; // 质检结果处理
}
export interface BeforeSecondCheck {
    updatedDt: string; // 质检时间
    checkUser: CheckUser; // 质检人对象
    chemistryCheck: QualityInspectionResult; // 化学检验
    flawCheck: QualityInspectionResult; // 探伤检验
    hardnessCheck: QualityInspectionResult; // 硬度检验
    metalCheck: QualityInspectionResult; // 金相检验
    sizeCheck: QualityInspectionResult; // 尺寸检验
    result: QualityInspectionResult; // 热前质检结果

}
//  轧辊履历-入炉记录
export interface EnterFurnace {
    startTime: string; // 计划生产时间
    endTime: string; // 预计结束时间
    planLinkName: string; // 工艺环节
    productionName: string; // 使用设备
    craftName: string; // 加工工艺
    userfurnaceName: string; // 入炉作业人
    updatedDt: string; // 入炉记录（时间）

}
//  轧辊履历-出炉记录
export interface TakeFurnace {
    startTime: string; // 计划生产时间
    endTime: string; // 预计结束时间
    planLinkName: string; // 工艺环节
    productionName: string; // 使用设备
    craftName: string; // 加工工艺
    userfurnaceName: string; // 出炉作业人
    updatedDt: string; // 出炉记录（时间）

}


// 轧辊履历-炉外正火冷却
export interface NormalizingCooling {
    startTime: string; // 开始冷却时间
    endTime: string; // 结束冷却时间
    cd: string; // 冷却时长
    username: string; // 操作人
    targetTemp: string; // 目标温度
}
// 轧辊履历-入厂记录
export interface EntryRecord {
    updatedDt: string; // 修改时间
    freightNumber: string; // 货号
    productNo: string; // 生产号
    isBlank: string; // 是否毛坯棍
    userName: string; // 交货人姓名
    createdBy: string; // 登记人姓名
    remark: string; // 备注
}

// 轧辊履历-装炉计划
export interface ChargingPlan {
    updateDt: string; // 修改时间
    startTime: string; // 计划生产时间
    endTime: string; // 预计结束时间
    planLinkName: string; // 工艺环节
    productionName: string; // 使用设备
    craftName: string; // 加工工艺
    craftId: string; // 工艺id
    plannerName: string; // 计划员
    technicianName: string; // 技术员
}
export interface ChargingPlanCraft {
    craftName: string; // 工艺名称
    img: string; // 工艺
    remark: string;
}

// 轧辊履历-热处理过程记录
export interface HeatTreatment {
    startTime: string; // 计划生产时间
    endTime: string; // 预计结束时间
    duration: string; // 热处理时长
    police: string; // 报警次数
    productionName: string; // 使用设备
    craftName: string; // 加工工艺
    processRecord: string; // 热处理过程记录
    startName?: string; // 热处理开始作业人
    endName?: string; // 热处理结束作业人
    planLinkName?: string; // 工艺环节
}


