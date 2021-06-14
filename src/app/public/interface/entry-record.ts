/*添加入场纪录或编辑*/
import { HttpParams } from '@angular/common/http';
import { IsExempt } from './quality-inspection-management';

export interface EntryRecordAdd {
    id?: number; // 默认没有id，有id为编辑
    freightId: number; // 货号ID
    productNo: string; // 生产号
    isBlank: IsExempt; // 是否毛坯 1是毛坯 0不是毛坯
    remark: string; // 备注
    submitUserId: number; // 交送人ID
    exteriorCheck: string; // 外观检验
    hardnessCheck1: string; // 硬度检测传端
    hardnessCheck2: string; // 硬度检测 1
    hardnessCheck3: string; // 硬度检测 2
    hardnessCheck4: string; // 硬度检测 3
    hardnessCheck5: string; // 硬度检测 4
    hardnessCheck6: string; // 硬度检测 5
    hardnessCheck7: string; // 硬度检验非端
    isExempt: IsExempt; // 是否硬度免检
    exemptReason: string; // 免检原因
    // 单位
    unit1: string;
    unit11?: string;
    unit2: string;
}
/*入场纪录查询*/
export interface EntryRecordSearch<T> {
    content: Array<T>;
}
export interface EntryRecord {
    id: string; // 轧辊的id
    remark: string; // 轧辊入厂信息的备注
    createdDt: string; // 轧辊的创建时间
    productNo: string; // 生产号
    freightNumber: string; // 货号
    isBlank: string; // 是否是毛坯辊 1是毛坯 0不是毛坯
    processStatus: string; // 生产状态
    status: string; // 轧辊状态
    freight: Freight; // 轧辊信息
    submitUser: SubmitUser; // 交送人
    user: UserEntity; // 登记人
    selfCheck: SelfCheck; // 自检对象
    bodyHardness?: string; // 辊身硬度
    neckHardness?: string; // 辊颈硬度
}
export interface Freight {
    freightNumber: string; // 轧辊货号
    material: string; // 材质
    materialCode: string; // 材质代码
    size: string; // 尺寸
    netWeight: string; // 净重
    productionUnit: string; // 生产单位
    client: string; // 用户信息
    bodyHardness?: string; // 辊身硬度
    neckHardness?: string; // 辊颈硬度
}
export interface SubmitUser {
    name: string;  // 交送人姓名
}
export interface UserEntity {
    name: string; // 登记人姓名
}
export interface SelfCheck {
    exteriorCheck: string; // 外观检验
    hardnessCheck1: string; // 硬度检验传端
    hardnessCheck2: string; // 1
    hardnessCheck3: string; // 2
    hardnessCheck4: string; // 3
    hardnessCheck5: string; // 4
    hardnessCheck6: string; // 5
    hardnessCheck7: string; // 硬度检验非端
    isExempt: IsExempt; // 硬度是否免检
    exemptReason: string; // 免检原因
    exteriorUserId: number; // 外观检验自检人ID
    hardnessUserId: number; // 硬度检验自检人ID
    // 单位
    unit1: string;
    unit11?: string;
    unit2: string;
}

export interface HtHistoryList {
    id: number;
    htStartTime: string;
    htEndTime: string;
    furnaceId: number;
    planLinkId: number;
    createdBy: string;
    updatedBy: string;
    htRecordId: number;
    remark: string;
    createdDt: string;
    updatedDt: string;
    isDeleted: string;
    internalFurnacePlan: {
        time: number;
        stringList: string[];
    };
    devName: string[];
    freightList: object;
    production?: string;
}


