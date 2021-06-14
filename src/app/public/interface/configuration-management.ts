import { HttpParams } from '@angular/common/http';
import { User } from './user';

// 第三块第四块
// 设备类型
export interface TypeList {
    id?: number; // id
    parentId?: number; // 父级id
    typeName?: string; // 类型名称
    list?: Array<TypeList>; // 子集
}
// 设备区域
export interface AreaList {
    id: number; // id
    areaName: string; // 父级id
}
// 生产设备添加-单条查询
export interface ProductionAddData {
    id?: number; // 有id为编辑 id为空为添加
    name: string; // 设备名称
    typeid: number; // 设备类型id
    deviveNum: string; // 设备编号
    manufacturer: string; // 生产厂家
    responsibleUser: string; // 负责人
    areaId: number; // 设备区域id
    ListFurnaceTemperature: Array<TemperatureList>; // 炉温集合
    millRollTemperature: Array<TemperatureList>; // 辊温集合
}
// 添加11-6
export interface TemperatureList {
    monitorName: string; // 监测设备名称
    monitorId: string;   // 监测设备id
    equipmentLocation?: string; // 监控位置名称
}
// 监测设备查询
export interface MonitorList {
    user?: {
        name: string;
    }; // 创建人
    createdDt: string; // 创建时间
    name: string; // 设备名称
    number: string; // 设备编号
    id: number; // id
    typeid?: number; // 设备id
    monitorType: {
        typeName: string;
    }; // 监测设备类型名称
    areaid?: number; // 监测设备区域id
    productionManufacturers: string; // 监测设备生产厂家
    responsibleUser: string; // 负责人
    productionId: number; // 关联生产设备
    monitorPostion: string; // 监测设备位置
    type: string; // 炉温 FURNACE_TEMPERATURE(0),
    // 辊温 ROLL_TEMPERATURE(1);
    production?: DeviceProductionList; // 生产设备信息
    jcUuid?: string; // 设备uuid
    jcAttribute?: string; // 设备类型
}
// 监测设备添加
export interface MonitorAddData {
    id?: number; // 有id为编辑 id为空为添加
    name: string; // 设备名称
    typeid: number; // 设备类型id
    number: string; // 设备编号
    productionManufacturers?: string; // 生产厂家
    responsibleUser?: string; // 负责人
    areaid?: number; // 设备区域id
    productionId?: number; // 生产设备id
    monitorPostion?: string; // 监测设备位置
    jcUuid?: string; // 设备uuid
    jcAttribute?: string; // 设备类型
}
// 监测设备操作
export interface MonitorInfo {
    name: string; // 设备名称
    typeid: number; // 设备类型id
    typeStr?: string; // 设备类型的从第一层开始到选中的全部id的逗号拼接
    typeIdArr?: Array<number>; // 解逗号
    number: string; // 设备编号
    productionManufacturers?: string; // 生产厂家
    responsibleUser?: string; // 负责人
    areaName?: string; // 设备区域名称
    productionList?: Array<{
        name: string; // 设备名称
        type: string; // 所属类型
        number: string; // 设备编号
    }>; // 关联的生产设备
}

/* 轧辊货号管理信息 */
export interface Freight {
    id?: number; // 轧辊ID
    remark?: string; // 备注
    createdDt?: number; // 创建时间
    createdBy?: number; // 创建人
    createdUser?: CreatedUser; // 创建人对象
    updatedDt?: number; // 更新时间
    updatedBy?: number; // 更新人
    isDeleted?: string; // 删除标志
    freightNumber: string; // 轧辊编号（货号）
    material: string; // 材质
    materialCode: string; // 材质代码
    size: string; // 尺寸
    netWeight: string; // 净重
    productionUnit: string; // 生产单位
    client: string; // 用户信息
    neckHardness: string; // 颈部硬度要求
    bodyHardness: string; // 轧辊身硬度要求
}
export interface CreatedUser { // 创建用户对象
    name: string;
}
/* 新增、修改（需要id）轧辊货号请求 */
export interface FreightEditInfo {
    id?: number;
    isDeleted?: number;
    freightNumber: string;
    material: string;
    materialCode: string;
    size: string;
    netWeight: string;
    productionUnit: string;
    client: string;
    neckHardness: string; // 颈部硬度要求
    bodyHardness: string; // 轧辊身硬度要求
}
/* 轧辊货号查询请求参数 */
export interface FreightInquiry extends HttpParams {
    pageNum: string;
    pageSize: string;
    freightNumber: string;
}
/*修改日志查询*/
export interface ModificationLogGet extends HttpParams {
    page?: string; // 起始页码
    limit?: string; // 分页数目
    startTime: string; // 变更起始时间
    endTime: string; // 变更结束时间
    freightNumber: string; // 轧辊货号
    productNo: string; // 生产号
    moduleName?: string; // 所属模块
    tableName: string; // 模块名称-0825
}
/*查看修改日志*/
export interface ModifyContent<T> {
    createdDt: string; // 变更时间
    freightNumber: string; // 轧辊货号
    productNo: string; // 生产号
    moduleName: string; // 所属模块
    id: number;
    updateLogChild: Array<T>; // 修改日志详情
    user: User;  // 变更人

}
export interface ModifyContentPlanB {
    id: number;
    before: string;
    after: string;
    tableName: string;
    row?: string;
    freightNumber: string;
    productNo?: string;
    type: string;
    createdDt: string;
    createdBy: string;
}
// /*查看修改详情*/
// export interface ModifyDetails<T> {
//     createdDt: string; // 变更时间
//     createdName: string; // 变更人
//     freightNumber: string; // 轧辊货号
//     productNo: string; // 生产号
//     moduleName: string; // 所属模块名称
//     id: number;
//     list: Array<T>; // 修改的数据
//
// }
/*修改详情字段名称*/
export interface ModifyList {
    beforeUpdate: string; // 修改前
    afterUpdate: string;  // 修改后
    name: string; // 修改字段名称
}

// tslint:disable-next-line: no-use-before-declare
export interface Craft extends CraftParams, CraftApproval {
    id?: string;
    curves: Curves[];
}
export interface CraftParams {
    name: string; // 工艺名称
    craftNo: string; // 工艺编号
    materialRange: string; // 材质范围
    specificationRange: any; // 规格范围 (应该是string 为了方便处理成[])
    hardnessRange: string; // 硬度范围
    applicableDevice: string; // 适用设备
    machineHour: string; // 台时
    tooling: string; // 工具及装备
    needCooling: string; // 是否正火冷却
    remark: string; // 备注
    approvalStatus?: ApprovalStatus; // 审批状态
    curveImgPath?: string; // 图片路径
    cancellationName?: string; // 废止人
    cancellationTime?: string; // 废止时间
}
export interface Curves {
    speedupType: SpeedupType; // 加热类型
    duration: number; // 持续时间
    temperature: number;
    temperatureType: TemperatureType; // 温度类型
    deviation: string; // 偏差值报警
    remark: string;
    width?: number; // 前端绘制canvas用到的虚拟宽度
    interval?: boolean; // 前端绘制canvas用到的横坐标间隔
}
export enum SpeedupType {
    FULL_SPEED = 'FULL_SPEED', // 全速
    NORMAL = 'NORMAL', // 常规
    CONSTANT = 'CONSTANT', // 恒温
    FURNACE_COOLING = 'FURNACE_COOLING', // 炉冷
}
export enum TemperatureType {
    FURNACE_TEMPERATURE = 'FURNACE_TEMPERATURE', // 炉温
    ROLL_TEMPERATURE = 'ROLL_TEMPERATURE', // 辊温
}

export interface CraftGetParams extends HttpParams {
    searchText: string;
}

export interface CraftApproval {
    craftId: number; // 工艺ID
    comments?: string; // 审批意见
    stage?: string; // 审批阶段 初审，终审的汉字
    result?: ApprovalStatus; // 审批结果
    createdDt?: number; // 审批时间
    createdUser?: User;
}

export interface MaterialRange {
    id?: string;
    isDeleted: number;
    freightNumber: string;
    material: string;
    materialCode: string;
    size: string;
    netWeight: string;
    productionUnit: string;
    client: string;
}

export enum ApprovalStatus {
    NOT_APPROVAL = 'NOT_APPROVAL',       // 未一审
    FIRST_APPROVED = 'FIRST_APPROVED',   // 一审通过
    FIRST_REJECTED = 'FIRST_REJECTED',   // 一审驳回
    SECOND_APPROVED = 'SECOND_APPROVED', // 二审通过
    SECOND_REJECTED = 'SECOND_REJECTED', // 二审驳回
    APPROVAL = 'APPROVAL', // 启用
    CANCELLATION = 'CANCELLATION', // 废止
}

// 11-28
// 设备管理-生产设备列表单项
export interface DeviceProductionList {
    id: number; // 监测设备id
    remark?: string; // 备注
    createdDt: string; // 创建时间
    user?: {
        name: string;
    }; // 创建人
    name: string; // 设备名称
    typeId?: number; // 类型id
    areaId?: number; // 区域id
    fatherNode?: string; // 组节点集合
    number: string; // 设备编号
    manufacturer?: string; // 生产厂家
    responsibleUser?: string; // 负责人
    createdUserName?: string; // 创建人名字
    productionType: {
        id: number; // id
        parentId: number; // 父id
        typeName: string; // 设备类型名称
    }; // type
    productionArea: {
        id: number; // id
        areaName: string; // 区域名称
    }; // area
    monitorList?: Array<DeviceBindingMonitorList>; // 绑定监测设备列表
    jcUuid?: string; // 设备uuid
    jcAttribute?: string; // 设备类型
}
// 设备管理-生产设备中绑定监测设备列表单项
export interface DeviceBindingMonitorList {
    id: number; // 监测设备id
    name: string; // 炉温 / 辊温
    number: string; // 监测设备编号
    productionManufacturers: string; // 生产厂家
    responsibleUser: string; // 负责人名称
    jcUuid?: string; // 设备uuid
    jcAttribute?: string; // 设备类型
    monitorPostion: string; // 监测设备位置
    type: string; // FURNACE_TEMPERATURE 炉温  ROLL_TEMPERATURE 辊温
}
// 生产设备添加接口的保存数据
export interface DeviceProductionSave {
    id?: number; // 有id为编辑 id为空为添加
    name: string; // 设备名称
    typeId?: number; // 类型id
    number: string; // 设备编号
    manufacturer?: string; // 生产厂家
    responsibleUser?: string; // 负责人
    jcUuid?: string; // 设备uuid
    jcAttribute?: string; // 设备类型
    areaId: number; // 设备区域
    monitorList?: Array<TemperatureData>; // 监测设备集合
}
export interface TemperatureData {
    monitorPostion: string; // 监控位置名称
    type: string; // 炉温 FURNACE_TEMPERATURE 辊温 ROLL_TEMPERATURE;
    id: number; // 监测设备id
}
// 监测设备中未绑定的设备
export interface ProductionFindRelevance {
    id: number; // 监测设备id
    name: string; // 监测设备名称
    typeid?: number; // 类型id
    areaid?: number; // 区域id
    productionManufacturers?: string; // 出厂的厂
    responsibleUser?: string; // 负责人
    isHide?: boolean; // 选中隐藏
}

