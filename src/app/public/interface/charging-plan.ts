import { FormArray } from '@angular/forms';

// 4.装炉计划

// 新增计划
export interface PlanAdd {
    id: number; // 装炉计划id
    status: string; // 装炉计划状态
    planner?: PlannerInfo; // 计划员
    plannerName: string; // 计划员名字
    technician?: PlannerInfo; // 第一次新增没有技术员
    // tslint:disable-next-line:ban-types
    remark: string; // 备注
}
// 相关人员信息
export interface PlannerInfo {
    id: number; // 计划员ID
    customer_id: number; // 计划员用户组ID
    name: string; // 计划员名称
    staff_no: string; // 计划员工号
    avatar: string; // 计划员头像
    email: string; // 计划员邮箱
    phone: string; // 计划员手机号
    remark: string; // 计划员备注
    is_deleted: string; // 装炉计划状态
}
// 工艺信息
export interface CraftList {
    id: number; // 工艺ID
    name: string; // 工艺名称
    craftNo: string; // 工艺编号
    curveImgPath: string; // 工艺图片路径
    remark?: string; // 备注
}
// 设备列表区域列表

// 热处理轧辊列表
export interface PlanRollsList {
    id: number; // 轧辊ID
    freight: PlanRollsInfo; // 货号对象
    productNo: string; // 生产号
    isBlank: string; // 是否毛坯辊
    remark?: string; // 备注
    qualityCheck?: {
        updatedDt: number; // 热前质检时间
    };
    beforeQualityCheck?: {
        result?: string;
    };  // 合格品
}
export interface PlanRollsListHT {
    id: number;
    createdDt: string;
    freightNumber: string;
    productNo: string;
    size: string;
    material: string;
    materialCode: string;
    netWeight: string; // 净重
    isBlank: string;
    remark?: string; // 备注
}
// 货号对象
export interface PlanRollsInfo {
    id: number; // 货号ID
    freightNumber: string; // 货号ID
    material: string; // 货号材质
    materialCode: string; // 货号材质代码
    size: string; // 货号尺寸
    netWeight: string; // 净重
    isBig?: boolean; // 是不是最大的数值
}
// 计划列表
export interface PlansTableList {
    id: number; // ID
    status: string; // 状态
    planner?: PlannerInfoSmall; // 计划员信息
    technician?: PlannerInfoSmall; // 技术员信息
    links: Array<{
        id: number;
        planId: number;
        name: string; // 环节
        status: string; // 环节状态
        details: Array<PlansTableListDetails>;
    }>; // 货号尺寸
    createdDt?: number; // 计划时间
}
export interface PlansTableListInfo {
    id: number;
    planId: number;
    name: string; // 环节
    details?: Array<PlansTableListDetails>;
    links?: Array<PlansTableListDetails>;
}

export interface PlannerInfoSmall {
    id: number; // 计划员ID
    name: string; // 计划员名称
    staffNo: string; // 计划员工号
}
export interface PlansTableListDetails {
    id: number; // ID
    linkId: number; //
    startTime: number; // 开始时间-时间戳
    endTime: number; // 结束时间-时间戳
    putMeterReading: string; // 入炉抄表读数
    takeMeterReading: string; // 入炉抄表读数
    craft: CraftList; // 工艺信息
    device: DeviceInfo; // 设备信息
    area: AreaInfo; // 区域信息
    freights?: Array<FreightsInfo>; // 辊修改
    rolls?: Array<RollsInfo>; // 辊
    remark?: string; // 备注
}
export interface DeviceInfo {
    id: number; // ID
    name: string; // 设备名称
    deviveNum: string; // 设备编号23423
    manufacturer?: string; // 生产厂家
}
export interface AreaInfo {
    id: number; // ID
    areaName: string; // 区域名称
}
export interface RollsInfo {
    id: number; // ID
    status: string; // 区域名称
    productNo: string; // 区域名称
    isBlank: string; // 区域名称
    remark: string; // 区域名称
    freight: {
        id: string;
        freightNumber: string; // 货号
        material: string; // 材质
        materialCode: string; // 材质编号
        size: string; // 大小
        netWeight: string; // 净重
    };
}
export interface FreightsInfo {
    id: number; // ID
    freightNumber: string; // 货号
    material: string; // 材质
    materialCode: string; // 材质代码
    size: string; // 尺寸
    netWeight: string; // 净重
    detailRolls: Array<DetailRollInfo>; // 辊信息-带状态
}
export interface DetailRollInfo {
    id: number; // ID
    detailId: number; // 详情id
    position: string; // 装炉位置
    status: string; // 状态
    roll: {
        id: number;
        productNo: string; // 生产号
        isBlank: string; // 是否毛坯辊
        remark: string; // 备注
    };
}

// 新增
// 计划详情
export interface FormInfo {
    titleName: string; // 环节1
    tname?: string; // 
    planId?: number; // 计划ID
    id?: number; // ID
    isAdd: boolean; // 可编辑状态
    status?: string;
    dataForm: FormArray; // 第一部分表单
    rollsList: Array<{
        list: Array<PlanRollsListChoose>
    }>; // 第二部分辊列表
    deviceDialog?: Array<{
        show: boolean;
    }>; // 选择设备dialog显示否
}
// 计划详情中辊列表
export interface PlanRollsListChoose extends PlanRollsList {
    numChoose?: Array<number | string>;
    idChoose?: Array<number | string>;
    statusChoose?: Array<number | string>;
    number?: string;
    myRollList: any[];
    isBig?: boolean;
    // freight?: object;
}
// 计划表单中的值
export interface DataFormValue {
    startTime: string; // 计划时间
    deviceId: number; // 设备id
    deviceName: string; // 设备名称
    endTime: string; // 预计结束时间
    areaId: number; // 区域id
    remark?: string; // 备注
    craftName?: string; // 工艺名称
    craftId?: number; // 工艺id
    craftNo?: string; // 工艺编号
    id?: number; // 详情id-编辑
}
// 环节详细信息的值
export interface LinkDetailValue {
    startTime: number; // 计划时间
    endTime: number; // 预计结束时间
    deviceId: number; // 设备id
    areaId: number; // 区域id
    craftId?: number; // 工艺id
    detailRolls: Array<{
        rollId: number;
        status?: string;
    }>; // 辊组id
    remark?: string; // 备注
    id?: number; // id
}
// 分解环节列表到货号
export interface TableFeightList {
    detailStartTime: number; // 详情计划开始时间
    detailEndTime: number; // 详情计划开始时间
    craftName: string; // 环节名称
    detailDevice: string; // 设备名称
    detailCraft?: string; // 工艺名称
    freightList: Array<DetailRollInfo>; // 同货号的辊列表
    freightNumber: string; // 货号
    freight: FreightsInfo; // 同货号的辊的信息及原来的信息所在
    freightID: number; // 同货号的辊id
    detail: PlansTableListDetails; // 详情的信息及原来的信息所在
    detailID: number; // 详情id
    craft: PlansTableListInfo; // 环节的信息及原来的信息所在
    craftID: number; // 环节id
    status1: Array<DetailRollInfo>; // 辊的状态在入炉的辊列表
    status2: Array<DetailRollInfo>; // 辊的状态在执行的辊列表
    status3: Array<DetailRollInfo>; // 辊的状态在出炉的辊列表
    fatherLen?: number; // 计划相同合并的数量
    craftRowspan?: number; // 环节相同合并的数量
    detailRowspan?: number; // 详情相同合并的数量
    planList?: PlansTableListInfo; // 计划的信息及原来的信息所在
    listCanEdit?: boolean; // 判断是否可以修改
}



