// 9.出厂管理
// 记录列表
export interface RecordList {
    id: number; // id
    productNo: string; // 生产号
    isBlank: isBlank; // 是否毛坯辊
    updatedDt: number; // 完成时间
    freight: {
        id: number; // id
        freightNumber: string; // 货号
        material: string; // 材质
        materialCode: string; // 材质代码
        size: string; // 尺寸
        netWeight: string; // 净重
    };
}

// 使用枚举定义
export enum isBlank {
    YES, // 是
    NO  // 否
}



