import {
    Area,
    Craft,
    Details,
    Device,
    Links,
    Planner,
    Rolls,
    Technician,
} from '../src/app/public/interface/enter-furnace';

import {Freight} from '../src/app/public/interface/configuration-management';

export const enterFurnace = {
    // 获取货号
    // 'GET /api/freights': {
    //     content: [
    //         {
    //             id: 0, createdDt: '1573010277026', createdBy: 1, updatedDt: '1573010277026',
    //             updatedBy: 1, freightNumber: '7N70006', productionUnit: 'a公司', client: 'a汽车', size: '650*1880*450',
    //             material: 'a铸铁', materialCode: 'TNA-3', netWeight: '7.8',
    //         },
    //         {
    //             id: 1, freightNumber: '156', productionUnit: 'pro2', client: 'asd'
    //         },
    //         {
    //             id: 2, freightNumber: '345', productionUnit: 'pro3', client: 'wef'
    //         },
    //     ],
    //     last: true,
    //     totalPages: 20,
    //     totalElements: 97,
    //     size: 5,
    //     number: 1,
    //     sort: null,
    //     numberOfElements: 5,
    //     first: false,
    // },
    // 获取计划列表

    'GET /api/plans/query': {
        last: true,
        totalPages: 20,
        totalElements: 97,
        size: 5,
        number: 1,
        sort: null,
        numberOfElements: 5,
        first: false,
        content: [
            {
                id: 111,
                status: 'status',
                isDeleted: 'no',
                createdDt: 1573126775607,
                planner: {
                        id: 0, // 计划员id
                        name: 'A', // 计划员名称
                        staffNO: '2b', // 计划员编号
                        isDeleted: 'no', // 是否删除
                     },
                technician: {
                        id: 0, // 技术员id
                        name: 'B', // 技术员名称
                        staffNO: '3b', // 技术员编号
                        isDeleted: 'no', // 是否删除
                    },
                links: [ // 计划内环节
                    {
                        id: 0,
                        planId: 123,
                        name: '环节1', // 环节名称
                        details: // 环节详情数组
                            [
                                {
                                    id: 0,
                                    linkId: 231,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 0, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 0, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                        htStatus: 'PROCESSING',
                                    },
                                    area: { // 区域
                                            id: 0, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 0,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 111,
                                                        detailId: 112,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 222,
                                                        detailId: 223,
                                                        status: 'NOT_PUT',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 14,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 789,
                                                        detailId: 789,
                                                        position: '6',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 454,
                                                        detailId: 456,
                                                        status: 'NOT_PUT',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                                {
                                    id: 56,
                                    linkId: 546,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 6456, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 687, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                        htStatus: 'NOT_START'
                                    },
                                    area: { // 区域
                                            id: 456, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 678,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 87,
                                                        detailId: 78,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 678, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 87,
                                                        detailId: 86,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 14,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 789,
                                                        detailId: 789,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 454,
                                                        detailId: 456,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 39, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                            ]
                    },
                    {
                        id: 1,
                        planId: 123,
                        name: '环节2', // 环节名称
                        details: // 环节详情数组
                            [
                                {
                                    id: 56,
                                    linkId: 545,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 45, // 工艺id
                                        name: '工艺2', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 546, // 设备id
                                        name: '2#电阻炉', // 设备名称
                                        deviceNum: 'no2', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                        htStatus: 'COMING_SOON'
                                    },
                                    area: { // 区域
                                            id: 8, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 6,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 68,
                                                        detailId: 87,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 76, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 787,
                                                        detailId: 35,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 345, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 864,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 152,
                                                        detailId: 35,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 95, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 445,
                                                        detailId: 878,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 635, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                                {
                                    id: 54,
                                    linkId: 78,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 45, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 88, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                        htStatus: 'END'
                                    },
                                    area: { // 区域
                                            id: 788, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 653,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 8778,
                                                        detailId: 785,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 96, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 74,
                                                        detailId: 63,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 45, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 89,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 45,
                                                        detailId: 45,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 98, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 96,
                                                        detailId: 12,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 786, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                            ]
                    },
                ],
            },
            {
                id: 222,
                status: 'status',
                isDeleted: 'no',
                createdDt: 1573986330867,
                planner: {
                        id: 0, // 计划员id
                        name: 'A', // 计划员名称
                        staffNO: '2b', // 计划员编号
                        isDeleted: 'no', // 是否删除
                     },
                technician: {
                        id: 0, // 技术员id
                        name: 'B', // 技术员名称
                        staffNO: '3b', // 技术员编号
                        isDeleted: 'no', // 是否删除
                    },
                links: [ // 计划内环节
                    {
                        id: 44,
                        planId: 123,
                        name: '环节1', // 环节名称
                        details: // 环节详情数组
                            [
                                {
                                    id: 0,
                                    linkId: 231,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 0, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 0, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                    },
                                    area: { // 区域
                                            id: 0, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 0,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 111,
                                                        detailId: 112,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 222,
                                                        detailId: 223,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 14,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 789,
                                                        detailId: 789,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 454,
                                                        detailId: 456,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                                {
                                    id: 56,
                                    linkId: 546,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 6456, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 687, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                    },
                                    area: { // 区域
                                            id: 456, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 678,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 87,
                                                        detailId: 78,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 678, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 87,
                                                        detailId: 86,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 114, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 14,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 789,
                                                        detailId: 789,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 0, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 454,
                                                        detailId: 456,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 39, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                            ]
                    },
                    {
                        id: 54,
                        planId: 123,
                        name: '环节2', // 环节名称
                        details: // 环节详情数组
                            [
                                {
                                    id: 56,
                                    linkId: 545,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 45, // 工艺id
                                        name: '工艺2', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 546, // 设备id
                                        name: '2#电阻炉', // 设备名称
                                        deviceNum: 'no2', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                    },
                                    area: { // 区域
                                            id: 8, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 6,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 68,
                                                        detailId: 87,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 76, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 787,
                                                        detailId: 35,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 345, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 864,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 152,
                                                        detailId: 35,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 95, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 445,
                                                        detailId: 878,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 635, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                                {
                                    id: 54,
                                    linkId: 78,
                                    startTime: 1573040770692, // 生产时间
                                    endTime: 1573040770692, // 预计结束时间
                                    putMeterReading: 'aaa', // 入炉抄表读数
                                    takeMeterReading: '出炉读数', // 出炉抄表读数
                                    isDeleted: 'NORMAL', // 删除标志
                                    craft: { // 工艺对象
                                        id: 45, // 工艺id
                                        name: '工艺1', // 工艺名称
                                        craftNo: '12d', // 工艺编号
                                        curveImgPath: 'path', // 工艺图片路径
                                    },
                                    device: { // 使用设备对象
                                        id: 88, // 设备id
                                        name: '1#电阻炉', // 设备名称
                                        deviceNum: 'no1', // 设备编号
                                        manufacturer: '厂家1', // 生产厂家
                                        isDeleted: 'no', // 是否删除
                                    },
                                    area: { // 区域
                                            id: 788, // 区域id
                                            areaName: '区域1', // 区域名称
                                            isDeleted: 'no', // 是否删除
                                        },
                                    freights: // 轧辊货号数组
                                        [
                                            {
                                                id: 653,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 8778,
                                                        detailId: 785,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 96, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 74,
                                                        detailId: 63,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 45, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                id: 89,
                                                freightNumber: '7N70006',
                                                size: '650*1880*450',
                                                material: 'a铸铁',
                                                materialCode: 'TNA-3',
                                                netWeight: '7.8',
                                                detailRolls: [
                                                    {
                                                        id: 45,
                                                        detailId: 45,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 98, // 轧辊id
                                                            productNo: '111', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                    {
                                                        id: 96,
                                                        detailId: 12,
                                                        position: '5',
                                                        status: 'IN_FURNACE',
                                                        roll: {
                                                            id: 786, // 轧辊id
                                                            productNo: '546', // 生产号
                                                            isBlank: 'NO', // 是否毛坯轧辊
                                                            remark: '备注', // 备注
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                },
                            ]
                    },
                ],
            },
        ],
    },

    // 入炉操作-获取计划列表

    'GET /api/link':
        {
            id: 0,
            linkId: 0,
            craft: { // 工艺对象
                id: 1, // 工艺id
                name: '工艺2', // 工艺名称
                craftNo: '12d', // 工艺编号
                curveImgPath: 'path', // 工艺图片路径
            },
            device: { // 使用设备对象
                id: 1, // 设备id
                name: '2#电阻炉', // 设备名称
                deviceNum: 'no2', // 设备编号
                manufacturer: '厂家1', // 生产厂家
                isDeleted: 'no', // 是否删除
            },
            area: { // 区域
                id: 1, // 区域id
                areaName: '区域2', // 区域名称
                isDeleted: 'no', // 是否删除
            },
            startTime: 1573443554959,
            endTime: 1573443554959,
            planner: {
                id: 0, // 计划员id
                name: 'A', // 计划员名称
                staffNO: '2b', // 计划员编号
                isDeleted: 'no', // 是否删除
            },
            technician: {
                id: 0, // 技术员id
                name: 'B', // 技术员名称
                staffNO: '3b', // 技术员编号
                isDeleted: 'no', // 是否删除
            },
            putMeterReading: '入炉抄表读数', // 入炉抄表读数
            takeMeterReading: '出炉抄表读数', // 出炉抄表读数
            remark: '介似一锅备注',
            createdDt: 1573443554959,
            createdBy: 1,
            updatedDt: 1573443554959,
            updatedBy: 1,
            isDeleted: 'NORMAL',
            freights: // 轧辊货号数组
                [
                    {
                        id: 12,
                        freightNumber: '7N70006',
                        size: '650*1880*450',
                        material: 'a铸铁',
                        materialCode: 'TNA-3',
                        netWeight: '7.8',
                        detailRolls: [
                            {
                                id: 21,
                                detailId: 412,
                                position: '3',
                                status: 'IN_FURNACE',
                                roll: {
                                    id: 132,
                                    productNo: '15',
                                    remark: '备注', // 备注
                                    putDt: 1573443554959,
                                    putBy: '张喆语'
                                },
                            },
                            {
                                id: 22,
                                detailId: 423,
                                status: 'NOT_PUT',
                                roll: {
                                    id: 132,
                                    productNo: '556 ',
                                    remark: '备注', // 备注
                                },
                            },
                        ],
                    },
                    {
                        id: 13,
                        freightNumber: '7N70006',
                        size: '650*1880*450',
                        material: 'a铸铁',
                        materialCode: 'TNA-3',
                        netWeight: '8.5',
                        detailRolls: [
                            {
                                id: 45,
                                detailId: 87,
                                position: '24',
                                status: 'IN_FURNACE',
                                roll: {
                                    id: 45,
                                    productNo: '89',
                                    remark: '备注', // 备注
                                    putDt: 1573443554959,
                                    putBy: '孙跃华',
                                },
                            },
                            {
                                id: 455,
                                detailId: 678,
                                status: 'NOT_PUT',
                                roll: {
                                    id: 454,
                                    productNo: '546',
                                    remark: '备注', // 备注
                                },
                            },
                        ],
                    },
                ],
        },
};
//
// {"content":[
//     {
//         "id":31,
//         "remark":null,
//         "createdDt":1575422775000,
//         "createdBy":1,
//         "updatedDt":1575442151000,
//         "updatedBy":106,
//         "isDeleted":"NORMAL",
//         "plannerId":106,
//         "planner":{
//             "id":106,
//             "remark":null,
//             "createdDt":1573798385000,
//             "createdBy":1,
//             "updatedDt":1573798393000,
//             "updatedBy":1,
//             "isDeleted":"NORMAL",
//             "customerId":null,
//             "name":"xupei",
//             "staffNo":"123456",
//             "avatar":"",
//             "email":null,
//             "phone":"18137294924",
//             "role":null,
//             "customers":null
//         },
//         "technicianId":1,
//         "technician":{
//             "id":1,
//             "remark":"请勿删除",
//             "createdDt":1551447847000,
//             "createdBy":1,
//             "updatedDt":1551476663000,
//             "updatedBy":1,
//             "isDeleted":"SYSTEM",
//             "customerId":1,
//             "name":"admin",
//             "staffNo":"0000",
//             "avatar":"/avatar/20181212/1-20181212-105526.jpg",
//             "email":null,
//             "phone":" ",
//             "role":null,
//             "customers":null
//         },
//         "status":"TO_BE_EXECUTED",
//         "plannerName":null,
//         "links":[
//             {
//                 "id":58,
//                 "remark":null,
//                 "createdDt":1575428657000,
//                 "createdBy":1,
//                 "updatedDt":1575477556000,
//                 "updatedBy":null,
//                 "isDeleted":"NORMAL",
//                 "planId":31,
//                 "name":"环节2",
//                 "details":[]},
//             {
//                 "id":59,
//                 "remark":null,
//                 "createdDt":1575428891000,
//                 "createdBy":1,
//                 "updatedDt":1575477791000,
//                 "updatedBy":null,
//                 "isDeleted":"NORMAL",
//                 "planId":31,
//                 "name":"环节2",
//                 "details":[]},
//             {"id":60,"remark":null,"createdDt":1575429046000,"createdBy":1,"updatedDt":1575477946000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":61,"remark":null,"createdDt":1575429261000,"createdBy":1,"updatedDt":1575478161000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":62,"remark":null,"createdDt":1575429469000,"createdBy":1,"updatedDt":1575478368000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":63,"remark":null,"createdDt":1575429552000,"createdBy":1,"updatedDt":1575478452000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":64,"remark":null,"createdDt":1575429633000,"createdBy":1,"updatedDt":1575478533000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":65,"remark":null,"createdDt":1575429775000,"createdBy":1,"updatedDt":1575478675000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":66,"remark":null,"createdDt":1575430079000,"createdBy":1,"updatedDt":1575478978000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[]},{"id":68,"remark":null,"createdDt":1575431227000,"createdBy":1,"updatedDt":1575442151000,"updatedBy":106,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[{"id":52,"remark":"备注","createdDt":1575431227000,"createdBy":1,"updatedDt":1575442151000,"updatedBy":106,"isDeleted":"NORMAL","linkId":null,"craftId":1,"craft":{"id":1,"remark":null,"createdDt":1573858493000,"createdBy":1,"updatedDt":1575186756000,"updatedBy":1,"isDeleted":"NORMAL","name":"xxxxxx工艺","craftNo":"3221AT","materialRange":"","specificationRange":null,"hardnessRange":null,"applicableDevice":null,"machineHour":null,"tooling":null,"needCooling":"YES","curveImgPath":"sss","approvalStatus":"SECOND_APPROVED","curves":[],"createdUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null}},"deviceId":4,"device":{"id":4,"remark":null,"createdDt":1572502837000,"createdBy":1,"updatedDt":1574185362000,"updatedBy":1,"isDeleted":"NORMAL","name":"设备一号","number":"SB013","typeId":1,"areaId":2,"manufacturer":"天津加工厂","responsibleUser":"李白","fatherNode":null,"productionType":{"id":1,"remark":null,"createdDt":1574209283000,"createdBy":1,"updatedDt":1574209293000,"updatedBy":1,"isDeleted":"NORMAL","parentId":0,"typeName":"最上级"},"productionArea":{"id":2,"remark":null,"createdDt":1572600405000,"createdBy":1,"updatedDt":1574926605000,"updatedBy":1,"isDeleted":"NORMAL","areaName":"电阻炉控制室2"},"monitorList":[],"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null}},"area":{"id":1,"remark":null,"createdDt":1573591770000,"createdBy":1,"updatedDt":1574926595000,"updatedBy":1,"isDeleted":"NORMAL","areaName":"电阻炉控制室1"},"areaId":1,"startTime":1572589688000,"endTime":1606372088000,"putMeterReading":null,"takeMeterReading":null,"detailRolls":[{"id":75,"remark":null,"createdDt":1575442151000,"createdBy":106,"updatedDt":1575491051000,"updatedBy":null,"isDeleted":"NORMAL","detailId":52,"roll":{"id":29,"remark":"备注1122222","createdDt":1575190746000,"createdBy":1,"updatedDt":1575257341000,"updatedBy":1,"isDeleted":"NORMAL","freightId":8,"productNo":"生产号dl0012","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":103,"remark":null,"createdDt":1575266593000,"createdBy":1,"updatedDt":1575316993000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验1202___","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500365000,"isExempt":"NO","exemptReason":"省免检产品","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498921000,"hardnessCheck1":"401","hardnessCheck2":"301","hardnessCheck3":"401","hardnessCheck4":"301","hardnessCheck5":"201","hardnessCheck6":"601","hardnessCheck7":"201","result":null},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":6,"remark":null,"createdDt":1575276322000,"createdBy":1,"updatedDt":1575326722000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"OK","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":29,"status":"NOT_PUT","position":null,"detailRollStatusType":null},{"id":76,"remark":null,"createdDt":1575442151000,"createdBy":106,"updatedDt":1575491051000,"updatedBy":null,"isDeleted":"NORMAL","detailId":52,"roll":{"id":26,"remark":"备注111","createdDt":1574998468000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","freightId":1,"productNo":"生产号dl0011","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":105,"remark":null,"createdDt":1575267084000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500369000,"isExempt":"YES","exemptReason":"免检原因","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498925000,"hardnessCheck1":"1","hardnessCheck2":"2","hardnessCheck3":"3","hardnessCheck4":"4","hardnessCheck5":"5","hardnessCheck6":"6","hardnessCheck7":"7","result":"CHECKED"},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":1,"remark":null,"createdDt":1574265503000,"createdBy":null,"updatedDt":1575279190000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"NG","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":26,"status":"NOT_PUT","position":null,"detailRollStatusType":null}],"freights":[{"id":1,"remark":null,"createdDt":1572383891000,"createdBy":1,"updatedDt":1574843145000,"updatedBy":1,"isDeleted":"NORMAL","freightNumber":"7N70007","material":"a铸铁","materialCode":"TNA-3","size":"650*1880*450","netWeight":"7.8","productionUnit":"a公司","client":"a汽车","detailRolls":[{"id":76,"remark":null,"createdDt":1575442151000,"createdBy":106,"updatedDt":1575491051000,"updatedBy":null,"isDeleted":"NORMAL","detailId":52,"roll":{"id":26,"remark":"备注111","createdDt":1574998468000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","freightId":1,"productNo":"生产号dl0011","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":105,"remark":null,"createdDt":1575267084000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500369000,"isExempt":"YES","exemptReason":"免检原因","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498925000,"hardnessCheck1":"1","hardnessCheck2":"2","hardnessCheck3":"3","hardnessCheck4":"4","hardnessCheck5":"5","hardnessCheck6":"6","hardnessCheck7":"7","result":"CHECKED"},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":1,"remark":null,"createdDt":1574265503000,"createdBy":null,"updatedDt":1575279190000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"NG","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":26,"status":"NOT_PUT","position":null,"detailRollStatusType":null}]},{"id":8,"remark":null,"createdDt":1574759773000,"createdBy":1,"updatedDt":1574808699000,"updatedBy":1,"isDeleted":"NORMAL","freightNumber":"8N700011","material":"a铸铁","materialCode":"TNA-3","size":"650*1880*450","netWeight":"7.8","productionUnit":"a公司","client":"a汽车","detailRolls":[{"id":75,"remark":null,"createdDt":1575442151000,"createdBy":106,"updatedDt":1575491051000,"updatedBy":null,"isDeleted":"NORMAL","detailId":52,"roll":{"id":29,"remark":"备注1122222","createdDt":1575190746000,"createdBy":1,"updatedDt":1575257341000,"updatedBy":1,"isDeleted":"NORMAL","freightId":8,"productNo":"生产号dl0012","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":103,"remark":null,"createdDt":1575266593000,"createdBy":1,"updatedDt":1575316993000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验1202___","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500365000,"isExempt":"NO","exemptReason":"省免检产品","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498921000,"hardnessCheck1":"401","hardnessCheck2":"301","hardnessCheck3":"401","hardnessCheck4":"301","hardnessCheck5":"201","hardnessCheck6":"601","hardnessCheck7":"201","result":null},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":6,"remark":null,"createdDt":1575276322000,"createdBy":1,"updatedDt":1575326722000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"OK","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":29,"status":"NOT_PUT","position":null,"detailRollStatusType":null}]}]}]},{"id":69,"remark":null,"createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","planId":31,"name":"环节2","details":[{"id":53,"remark":"备注","createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","linkId":null,"craftId":1,"craft":{"id":1,"remark":null,"createdDt":1573858493000,"createdBy":1,"updatedDt":1575186756000,"updatedBy":1,"isDeleted":"NORMAL","name":"xxxxxx工艺","craftNo":"3221AT","materialRange":"","specificationRange":null,"hardnessRange":null,"applicableDevice":null,"machineHour":null,"tooling":null,"needCooling":"YES","curveImgPath":"sss","approvalStatus":"SECOND_APPROVED","curves":[],"createdUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null}},"deviceId":4,"device":{"id":4,"remark":null,"createdDt":1572502837000,"createdBy":1,"updatedDt":1574185362000,"updatedBy":1,"isDeleted":"NORMAL","name":"设备一号","number":"SB013","typeId":1,"areaId":2,"manufacturer":"天津加工厂","responsibleUser":"李白","fatherNode":null,"productionType":{"id":1,"remark":null,"createdDt":1574209283000,"createdBy":1,"updatedDt":1574209293000,"updatedBy":1,"isDeleted":"NORMAL","parentId":0,"typeName":"最上级"},"productionArea":{"id":2,"remark":null,"createdDt":1572600405000,"createdBy":1,"updatedDt":1574926605000,"updatedBy":1,"isDeleted":"NORMAL","areaName":"电阻炉控制室2"},"monitorList":[],"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null}},"area":{"id":1,"remark":null,"createdDt":1573591770000,"createdBy":1,"updatedDt":1574926595000,"updatedBy":1,"isDeleted":"NORMAL","areaName":"电阻炉控制室1"},"areaId":1,"startTime":1572416888000,"endTime":1572416888000,"putMeterReading":null,"takeMeterReading":null,"detailRolls":[{"id":68,"remark":null,"createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","detailId":53,"roll":{"id":29,"remark":"备注1122222","createdDt":1575190746000,"createdBy":1,"updatedDt":1575257341000,"updatedBy":1,"isDeleted":"NORMAL","freightId":8,"productNo":"生产号dl0012","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":103,"remark":null,"createdDt":1575266593000,"createdBy":1,"updatedDt":1575316993000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验1202___","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500365000,"isExempt":"NO","exemptReason":"省免检产品","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498921000,"hardnessCheck1":"401","hardnessCheck2":"301","hardnessCheck3":"401","hardnessCheck4":"301","hardnessCheck5":"201","hardnessCheck6":"601","hardnessCheck7":"201","result":null},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":6,"remark":null,"createdDt":1575276322000,"createdBy":1,"updatedDt":1575326722000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"OK","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":29,"status":"NOT_PUT","position":null,"detailRollStatusType":null},{"id":67,"remark":null,"createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","detailId":53,"roll":{"id":26,"remark":"备注111","createdDt":1574998468000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","freightId":1,"productNo":"生产号dl0011","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":105,"remark":null,"createdDt":1575267084000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500369000,"isExempt":"YES","exemptReason":"免检原因","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498925000,"hardnessCheck1":"1","hardnessCheck2":"2","hardnessCheck3":"3","hardnessCheck4":"4","hardnessCheck5":"5","hardnessCheck6":"6","hardnessCheck7":"7","result":"CHECKED"},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":1,"remark":null,"createdDt":1574265503000,"createdBy":null,"updatedDt":1575279190000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"NG","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":26,"status":"NOT_PUT","position":null,"detailRollStatusType":null}],"freights":[{"id":1,"remark":null,"createdDt":1572383891000,"createdBy":1,"updatedDt":1574843145000,"updatedBy":1,"isDeleted":"NORMAL","freightNumber":"7N70007","material":"a铸铁","materialCode":"TNA-3","size":"650*1880*450","netWeight":"7.8","productionUnit":"a公司","client":"a汽车","detailRolls":[{"id":67,"remark":null,"createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","detailId":53,"roll":{"id":26,"remark":"备注111","createdDt":1574998468000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","freightId":1,"productNo":"生产号dl0011","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":105,"remark":null,"createdDt":1575267084000,"createdBy":1,"updatedDt":1575336445000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500369000,"isExempt":"YES","exemptReason":"免检原因","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498925000,"hardnessCheck1":"1","hardnessCheck2":"2","hardnessCheck3":"3","hardnessCheck4":"4","hardnessCheck5":"5","hardnessCheck6":"6","hardnessCheck7":"7","result":"CHECKED"},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":1,"remark":null,"createdDt":1574265503000,"createdBy":null,"updatedDt":1575279190000,"updatedBy":1,"isDeleted":"NORMAL","rollId":26,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"NG","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":26,"status":"NOT_PUT","position":null,"detailRollStatusType":null}]},{"id":8,"remark":null,"createdDt":1574759773000,"createdBy":1,"updatedDt":1574808699000,"updatedBy":1,"isDeleted":"NORMAL","freightNumber":"8N700011","material":"a铸铁","materialCode":"TNA-3","size":"650*1880*450","netWeight":"7.8","productionUnit":"a公司","client":"a汽车","detailRolls":[{"id":68,"remark":null,"createdDt":1575431241000,"createdBy":1,"updatedDt":1575480141000,"updatedBy":null,"isDeleted":"NORMAL","detailId":53,"roll":{"id":29,"remark":"备注1122222","createdDt":1575190746000,"createdBy":1,"updatedDt":1575257341000,"updatedBy":1,"isDeleted":"NORMAL","freightId":8,"productNo":"生产号dl0012","isBlank":"YES","submitUserId":1,"processStatus":"TO_PLAN","status":"AT_FACTORY","freightNumber":null,"exteriorCheck":null,"exteriorUserName":null,"exteriorUserId":null,"hardnessUserName":null,"hardnessUserId":null,"hardnessCheck1":null,"hardnessCheck2":null,"hardnessCheck3":null,"hardnessCheck4":null,"hardnessCheck5":null,"hardnessCheck6":null,"hardnessCheck7":null,"isExempt":null,"exemptReason":null,"freight":null,"submitUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"user":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"selfCheck":{"id":103,"remark":null,"createdDt":1575266593000,"createdBy":1,"updatedDt":1575316993000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_SELF_CHECK","exteriorCheck":"外观检验1202___","exteriorUserId":1,"exteriorUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"exteriorCheckTime":1575500365000,"isExempt":"NO","exemptReason":"省免检产品","hardnessUserId":1,"hardnessUser":{"id":1,"remark":"请勿删除","createdDt":1551447847000,"createdBy":1,"updatedDt":1551476663000,"updatedBy":1,"isDeleted":"SYSTEM","customerId":1,"name":"admin","staffNo":"0000","avatar":"/avatar/20181212/1-20181212-105526.jpg","email":null,"phone":" ","role":null,"customers":null},"hardnessCheckTime":1575498921000,"hardnessCheck1":"401","hardnessCheck2":"301","hardnessCheck3":"401","hardnessCheck4":"301","hardnessCheck5":"201","hardnessCheck6":"601","hardnessCheck7":"201","result":null},"beforeSelfCheck":null,"afterSelfCheck":null,"qualityCheck":{"id":6,"remark":null,"createdDt":1575276322000,"createdBy":1,"updatedDt":1575326722000,"updatedBy":null,"isDeleted":"NORMAL","rollId":29,"roll":null,"type":"BEFORE_QUALITY_CHECK","checkUserId":null,"checkUser":null,"chemistryCheck":"OK","flawCheck":"OK","hardnessCheck":"OK","metalCheck":"OK","sizeCheck":"OK","result":"OK","isSecond":null},"beforeQualityCheck":null,"afterQualityCheck":null,"ngCheck":null},"rollId":29,"status":"NOT_PUT","position":null,"detailRollStatusType":null}]}]}]}]}],"pageable":{"sort":{"sorted":false,"unsorted":true,"empty":true},"offset":0,"pageSize":10,"pageNumber":0,"paged":true,"unpaged":false},"last":true,"totalPages":1,"totalElements":1,"number":0,"size":10,"first":true,"sort":{"sorted":false,"unsorted":true,"empty":true},"numberOfElements":1,"empty":false}
