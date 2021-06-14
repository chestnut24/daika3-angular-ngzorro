export const configurationManagement = {
    // 'GET /api/test': {
    //     content: [
    //         {
    //             name: '张三', id: '1', phone: '13322255555'
    //         },
    //         {
    //             name: '李四', id: '2', phone: '13344466666'
    //         }
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
    'GET /api/test': {
        content: [
            {
                name: '张三', id: '1', phone: '13322255555'
            },
            {
                name: '李四', id: '2', phone: '13344466666'
            }
        ],
        last: true,
        totalPages: 20,
        totalElements: 97,
        size: 5,
        number: 1,
        sort: null,
        numberOfElements: 5,
        first: false,
    },
    // 轧辊货号管理里面的货号信息
    // 'GET /api/freights': {
    //     content: [
    //         {
    //             id: 0, createdDt: '1573010277026', createdBy: 1, updatedDt: '1573010277026',
    //             updatedBy: 1, freightNumber: '7N70006', productionUnit: 'a公司', client: 'a汽车', size: '650*1880*450',
    //             material: 'a铸铁', materialCode: 'TNA-3', netWeight: '7.8',
    //         },
    //         {
    //             id: 0, createdDt: '1573010277026', createdBy: 1, updatedDt: '1573010277026',
    //             updatedBy: 1, freightNumber: '7N70007', productionUnit: 'a公司', client: 'a汽车', size: '650*1880*450',
    //             material: 'a金子', materialCode: 'TNA-4', netWeight: '7.8',
    //         },
    //         {
    //             id: 0, createdDt: '1573010277026', createdBy: 1, updatedDt: '1573010277026',
    //             updatedBy: 1, freightNumber: '7N70008', productionUnit: 'a公司', client: 'a汽车', size: '650*1880*450',
    //             material: 'a银子', materialCode: 'TNA-5', netWeight: '7.8',
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
    // 'GET /api/updatelog/message': {
    //     content: [
    //         {
    //             createdDt: '1573029602022',
    //             createdName: '张旭',
    //             freightNumber: '7N00724',
    //             productNo: '11',
    //             moduleName: '入场登记',
    //             id: 0
    //         },
    //         {
    //             createdDt: '1573029602022',
    //             createdName: '张旭',
    //             freightNumber: '7N00724',
    //             productNo: '11',
    //             moduleName: '入场登记',
    //             id: 1
    //         },
    //         {
    //             createdDt: '1573029602022',
    //             createdName: '张旭',
    //             freightNumber: '7N00724',
    //             productNo: '11',
    //             moduleName: '入场登记',
    //             id: 2
    //         },
    //         {
    //             createdDt: '1573029602022',
    //             createdName: '张旭',
    //             freightNumber: '7N00724',
    //             productNo: '11',
    //             moduleName: '入场登记',
    //             id: 3
    //         },
    //     ],
    //     totalElements: 20,
    //     number: 1,
    //     size: 10,
    //     totalPages: 20
    // },
    // // 设备生产
    // 'GET /api/production/findAllType': [
    //     {
    //         parentId: 1,
    //         typeName: '高温炉',
    //         list: [
    //             {
    //                 parentId: 1,
    //                 typeName: 'A型高温炉',
    //                 list: [],
    //                 id: 3
    //             }
    //         ],
    //         id: 1
    //     },
    //     {
    //         parentId: 2,
    //         typeName: '低温炉',
    //         list: [
    //             {
    //                 parentId: 2,
    //                 typeName: 'A型低温炉ADHSHASDKHASDHSDH',
    //                 list: [],
    //                 id: 4
    //             }
    //         ],
    //         id: 2
    //     },
    // ],
    // 'GET /api/production/findListAll': {
    //     content: [
    //         {
    //             id: 1,
    //             createdDt: '2019-10-29',
    //             createdUserName: '张旭+',
    //             name: '1#加热炉+',
    //             typeId: 3,
    //             number: 'D1++',
    //             manufacturer: '生产厂家+',
    //             responsibleUser: '负责46+',
    //             areaId: 1,
    //             areaName: '射处理车间/B区+',
    //             productionTypeName: ['加热设备+', '高温炉+'],
    //             equipmentName: [
    //                 {
    //                     id: 15,
    //                     name: '炉温',
    //                     monitorName: '一号监控位置++',
    //                     monitorId: 1,
    //                     productionName: '设备三号+',
    //                 },
    //                 {
    //                     id: 16,
    //                     name: '炉温',
    //                     monitorName: '一号监控位置+',
    //                     monitorId: 2,
    //                     productionName: '设备三号+',
    //                 },
    //                 {
    //                     id: 17,
    //                     name: '辊温',
    //                     monitorName: '一号监控位置+',
    //                     monitorId: 1,
    //                     productionName: '设备三号+',
    //                 },
    //             ]
    //         },
    //         {
    //             id: 3,
    //             createdDt: '2019-10-29',
    //             createdUserName: '张旭',
    //             name: '1#加热炉',
    //             typeId: 3,
    //             number: 'D1',
    //             manufacturer: '生产厂家',
    //             responsibleUser: '负责46',
    //             areaId: 1,
    //             areaName: '射处理车间/B区',
    //             productionTypeName: ['加热设备', '高温炉'],
    //             equipmentName: [
    //                 {
    //                     id: 15,
    //                     name: '炉温',
    //                     monitorName: '一号监控位置',
    //                     monitorId: 1,
    //                     productionName: '设备三号',
    //                 },
    //                 {
    //                     id: 16,
    //                     name: '炉温',
    //                     monitorName: '一号监控位置',
    //                     monitorId: 2,
    //                     productionName: '设备三号',
    //                 },
    //                 {
    //                     id: 17,
    //                     name: '辊温',
    //                     monitorName: '一号监控位置',
    //                     monitorId: 1,
    //                     productionName: '设备三号',
    //                 },
    //             ]
    //         }
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
    // 'GET /api/production/findAllArea': [
    //     {
    //         areaName: '电阻炉控制室1',
    //         id: 1
    //     },
    //     {
    //         areaName: '电阻炉控制室2',
    //         id: 2
    //     },
    //     {
    //         areaName: '燃气控制室',
    //         id: 3
    //     },
    // ],
    // // 设备监测
    // 'GET /api/monitor/findAllType': [
    //     {
    //         parentId: 1,
    //         typeName: '温控设备',
    //         list: [
    //             {
    //                 parentId: 1,
    //                 typeName: '1型温控表',
    //                 list: [
    //                     {
    //                         parentId: 3,
    //                         typeName: 'A型',
    //                         id: 5,
    //                         list: []
    //                     },
    //                     {
    //                         parentId: 3,
    //                         typeName: 'B型',
    //                         id: 6,
    //                         list: []
    //                     },
    //                 ],
    //                 id: 3
    //             },
    //             {
    //                 parentId: 1,
    //                 typeName: '2型温控表',
    //                 list: [
    //                     {
    //                         parentId: 7,
    //                         typeName: 'A型',
    //                         id: 8,
    //                         list: []
    //                     },
    //                 ],
    //                 id: 7
    //             },
    //
    //         ],
    //         id: 1
    //     },
    //     {
    //         parentId: 2,
    //         typeName: '测温枪',
    //         list: [
    //             {
    //                 parentId: 2,
    //                 typeName: 'A型低温炉ADHSHASDKHASDHSDH',
    //                 list: [],
    //                 id: 4
    //             }
    //         ],
    //         id: 2
    //     },
    // ],
    // 'GET /api/monitor/findList': {
    //     content: [
    //         {
    //             createdTime: '2019-10-31',
    //             name: '1#温控表',
    //             number: 'D1',
    //             productionTypeName: '温控设备/1型温控表',
    //             areaName: '电阻炉控制室1',
    //             equipmentName: '某某生产设备',
    //             createdUserName: '张旭',
    //             typeid: 8,
    //             id: 1
    //         },
    //         {
    //             createdTime: '2019-10-29',
    //             name: '2#温控表 ',
    //             number: 'D3',
    //             productionTypeName: '温控设备/2型温控表',
    //             areaName: '',
    //             equipmentName: '',
    //             createdUserName: '张旭',
    //             typeid: 8,
    //             id: 2
    //         },
    //     ],
    //     last: true,
    //     totalPages: 2,
    //     totalElements: 8,
    //     size: 5,
    //     number: 1,
    //     sort: null,
    //     numberOfElements: 5,
    //     first: false,
    // },
    // // 未绑定监测设备
    // 'GET /api/production/findRelevance': [
    //     {
    //         createdTime: '2019-10-31',
    //         name: '1#温控表',
    //         number: 'D1',
    //         productionTypeName: '温控设备/1型温控表',
    //         areaName: '电阻炉控制室1',
    //         equipmentName: '某某生产设备',
    //         createdUserName: '张旭',
    //         typeid: 8,
    //         id: 1
    //     },
    //     {
    //         createdTime: '2019-10-29',
    //         name: '2#温控表 ',
    //         number: 'D3',
    //         productionTypeName: '温控设备/2型温控表',
    //         areaName: '',
    //         equipmentName: '',
    //         createdUserName: '张旭',
    //         typeid: 8,
    //         id: 2
    //     },
    // ],
    // // 检测设备查询单个
    // 'GET /api/monitor/findByid/1': {
    //     name: '1#温控表B型',
    //     typeid: 8,
    //     // typeIdArr: [1,7,8],
    //     typeStr: '1,7,8',
    //     number: 'D1',
    //     productionManufacturers: '123',
    //     responsibleUser: '456',
    //     areaName: '电阻式1',
    //     id: 1,
    //     productionList: [
    //         {
    //             name: '1#加热炉',
    //             type: '温控设备/1型温控表',
    //             number: 'D1',
    //         }
    //     ]
    // },
    //
    'GET /api/updatelog/message': {
        content: [
            {
                createdDt: '1573029602022',
                createdName: '张旭',
                freightNumber: '7N00724',
                productNo: '11',
                moduleName: '入场登记',
                id: 0
            },
            {
                createdDt: '1573029602022',
                createdName: '张旭',
                freightNumber: '7N00724',
                productNo: '11',
                moduleName: '入场登记',
                id: 1
            },
            {
                createdDt: '1573029602022',
                createdName: '张旭',
                freightNumber: '7N00724',
                productNo: '11',
                moduleName: '入场登记',
                id: 2
            },
            {
                createdDt: '1573029602022',
                createdName: '张旭',
                freightNumber: '7N00724',
                productNo: '11',
                moduleName: '入场登记',
                id: 3
            },
        ],
        totalElements: 20,
        number: 1,
        size: 10,
        totalPages: 20
    },
    // 设备生产
    'GET /api/production/findAllType': [
        {
            parentId: 1,
            typeName: '高温炉',
            list: [
                {
                    parentId: 1,
                    typeName: 'A型高温炉',
                    list: [],
                    id: 3
                }
            ],
            id: 1
        },
        {
            parentId: 2,
            typeName: '低温炉',
            list: [
                {
                    parentId: 2,
                    typeName: 'A型低温炉ADHSHASDKHASDHSDH',
                    list: [],
                    id: 4
                }
            ],
            id: 2
        },
    ],
    'GET /api/production/findListAll': {
        content: [
            {
                id: 1,
                remark: null,
                createdDt: 1572838107000,
                name: '设备三号号update',
                number: 'SB01',
                typeId: 4,
                areaId: 1,
                manufacturer: '天津加工厂',
                responsibleUser: '李白',
                fatherNode: null,
                productionType: {
                    id: 1,
                    remark: null,
                    parentId: 0,
                    typeName: '最上级'
                },
                productionArea: {
                    id: 1,
                    remark: null,
                    areaName: '区域'
                },
                monitorList: [
                    {
                        name: '1#温控计',
                        number: 's001',
                        productionManufacturers: '华北生产商',
                        responsibleUser: '华贝',
                        monitorPostion: '东南角二号位',
                        type: 'FURNACE_TEMPERATURE',
                        id: 1
                    },
                    {
                        name: '1#温控计',
                        number: 's001',
                        productionManufacturers: '华北生产商',
                        responsibleUser: '华贝',
                        monitorPostion: '东南角s 号位',
                        type: 'ROLL_TEMPERATURE',
                        id: 2
                    },
                ]
            },
        ],
        last: true,
        totalPages: 20,
        totalElements: 97,
        size: 5,
        number: 1,
        sort: null,
        numberOfElements: 5,
        first: false,
    },
    'GET /api/production/findAllArea': [
        {
            areaName: '电阻炉控制室1',
            id: 1
        },
        {
            areaName: '电阻炉控制室2',
            id: 2
        },
        {
            areaName: '燃气控制室',
            id: 3
        },
    ],
    // 设备监测
    'GET /api/monitor/findAllType': [
        {
            parentId: 1,
            typeName: '温控设备',
            list: [
                {
                    parentId: 1,
                    typeName: '1型温控表',
                    list: [
                        {
                            parentId: 3,
                            typeName: 'A型',
                            id: 5,
                            list: []
                        },
                        {
                            parentId: 3,
                            typeName: 'B型',
                            id: 6,
                            list: []
                        },
                    ],
                    id: 3
                },
                {
                    parentId: 1,
                    typeName: '2型温控表',
                    list: [
                        {
                            parentId: 7,
                            typeName: 'A型',
                            id: 8,
                            list: []
                        },
                    ],
                    id: 7
                },

            ],
            id: 1
        },
        {
            parentId: 2,
            typeName: '测温枪',
            list: [
                {
                    parentId: 2,
                    typeName: 'A型测温枪',
                    list: [
                        {
                            parentId: 2,
                            typeName: '测温枪1',
                            id: 6,
                            list: []
                        },
                        {
                            parentId: 2,
                            typeName: '测温枪2',
                            id: 7,
                            list: []
                        },
                    ],
                    id: 4
                },
            ],
            id: 2
        },
    ],
    'GET /api/monitor/findList': {
        content: [],
        last: true,
        totalPages: 2,
        totalElements: 8,
        size: 5,
        number: 1,
        sort: null,
        numberOfElements: 5,
        first: false,
    },
    // 未绑定监测设备
    'GET /api/production/findRelevance': [
        {
            id: 18,
            remark: null,
            createdDt: 1574412043000,
            createdBy: 106,
            updatedDt: 1574462442000,
            updatedBy: null,
            isDeleted: 'NORMAL',
            name: '测温枪001',
            typeid: 9,
            areaid: null,
            number: '002',
            productionManufacturers: null,
            responsibleUser: null,
            productionTypeName: null,
            areaName: null,
            productionName: null,
            productionNumber: null,
            createdUserName: null,
            typeName: null
        },
        {
            id: 18,
            remark: null,
            createdDt: 1574412060000,
            createdBy: 106,
            updatedDt: 1574462458000,
            updatedBy: null,
            isDeleted: 'NORMAL',
            name: '测温枪002',
            typeid: 9,
            areaid: null,
            number: '002',
            productionManufacturers: null,
            responsibleUser: null,
            productionTypeName: null,
            areaName: null,
            productionName: null,
            productionNumber: null,
            createdUserName: null,
            typeName: null
        }
    ],
    // 检测设备查询单个
    'GET /api/monitor/findByid/1': {
        name: '1#温控表B型',
        typeid: 8,
        // typeIdArr: [1,7,8],
        typeStr: '1,7,8',
        number: 'D1',
        productionManufacturers: '123',
        responsibleUser: '456',
        areaName: '电阻式1',
        id: 1,
        productionList: [
            {
                name: '1#加热炉',
                type: '温控设备/1型温控表',
                number: 'D1',
            }
        ]
    },
    // 'GET /api/freights': {
    //     content: [
    //         {
    //             id: 0, freightNumber: '2123', productionUnit: 'pro1', client: 'fghrgd', size: '600'
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
    // 'GET /api/updatelog/message': {
    //     content: [
    //         {
    //             createdDt: '2019.10.31 12:21:12', createdName: '张旭', freightNumber: '7N00724', productNo: '11', moduleName: '入场登记', id: 0
    //         },
    //         {
    //             createdDt: '2019.10.31 12:21:12', createdName: '张旭', freightNumber: '7N00724', productNo: '11', moduleName: '入场登记', id: 1
    //         },
    //         {
    //             createdDt: '2019.10.31 12:21:12', createdName: '张旭', freightNumber: '7N00724', productNo: '11', moduleName: '入场登记', id: 2
    //         },
    //         {
    //             createdDt: '2019.10.31 12:21:12', createdName: '张旭', freightNumber: '7N00724', productNo: '11', moduleName: '入场登记', id: 3
    //         },
    //     ],
    //     totalElements: 20,
    //     number: 1,
    //     size: 10,
    //     totalPages: 20
    // },
    // 'GET /api/updatelog/1': {
    //     list: [
    //         {
    //             beforeUpdate: '我是一根修改前的轧辊', afterUpdate: '我是一根修改后的轧辊', name: '我是修改轧辊的张旭'
    //         },
    //         {
    //             beforeUpdate: '我是一根修改前的轧辊', afterUpdate: '我是一根修改后的轧辊', name: '我是修改轧辊的张旭'
    //         },
    //     ]
    //
    // },
    // 'GET /api/crafts': {
    //     content: [
    //         {
    //             id: 1,
    //             name: '新增工艺',
    //             craftNo: 1,
    //             materialRange: 'TNA-1, ZYB-2',
    //             specificationRange: '10,<,<,100',
    //             hardnessRange: '10,100',
    //             applicableDevice: '适用设备',
    //             machineHour: '台式',
    //             tooling: '工具及装备',
    //             needCooling: 'YES',
    //             approvalStatus: 'NOT_APPROVAL',
    //             remark: '备注',
    //             createdDt: 1572416888118,
    //             created_by: 1,
    //             updated_dt: 1572416888118,
    //             updated_by: 1,
    //             isDeleted: 'NORMAL',
    //             createdUser: {name: '张三'},
    //             curves: [
    //                 {
    //                     id: 1,
    //                     craftId: 1,
    //                     speedupType: 'FULL_SPEED',
    //                     duration: '180',
    //                     temperature: '200',
    //                     temperatureType: 'FURNACE_TEMPERATURE',
    //                     deviation: '20',
    //                     remark: '备注',
    //                     created_dt: 1572416888118,
    //                     created_by: 1,
    //                     updated_dt: 1572416888118,
    //                     updated_by: 1,
    //                     isDeleted: 'NORMAL'
    //                 },
    //                 {
    //                     id: 1,
    //                     craftId: 1,
    //                     speedupType: 'NORMAL',
    //                     duration: '180',
    //                     temperature: '200',
    //                     temperatureType: 'FURNACE_TEMPERATURE',
    //                     deviation: 1,
    //                     remark: '备注',
    //                     created_dt: 1572416888118,
    //                     created_by: 1,
    //                     updated_dt: 1572416888118,
    //                     updated_by: 1,
    //                     isDeleted: 'NORMAL'
    //                 }
    //             ],
    //             curve_img_path: ''
    //         }
    //     ],
    //     totalElements: 20,
    //     number: 1,
    //     size: 10,
    //     totalPages: 20
    // },
    // 'GET /api/craft/1': {
    //     id: 1,
    //     name: '新增工艺',
    //     craftNo: 1,
    //     materialRange: 'b大铁块子-TNA-2,a铸铁-TNA-3',
    //     specificationRange: '10,<,<,100',
    //     hardnessRange: '10,100',
    //     applicableDevice: '适用设备',
    //     machineHour: '台式',
    //     tooling: '工具及装备',
    //     needCooling: 'YES',
    //     approvalStatus: 'NOT_APPROVAL',
    //     remark: '备注',
    //     createdDt: 1572416888118,
    //     created_by: 1,
    //     updated_dt: 1572416888118,
    //     updated_by: 1,
    //     isDeleted: 'NORMAL',
    //     curves: [
    //         {
    //             id: 1,
    //             craftId: 1,
    //             speedupType: 'FULL_SPEED',
    //             duration: '180',
    //             temperature: '200',
    //             temperatureType: 'FURNACE_TEMPERATURE',
    //             deviation: '20',
    //             remark: '备注',
    //             created_dt: 1572416888118,
    //             created_by: 1,
    //             updated_dt: 1572416888118,
    //             updated_by: 1,
    //             isDeleted: 'NORMAL'
    //         },
    //         {
    //             id: 1,
    //             craftId: 1,
    //             speedupType: 'NORMAL',
    //             duration: '180',
    //             temperature: '200',
    //             temperatureType: 'FURNACE_TEMPERATURE',
    //             deviation: 1,
    //             remark: '备注',
    //             created_dt: 1572416888118,
    //             created_by: 1,
    //             updated_dt: 1572416888118,
    //             updated_by: 1,
    //             isDeleted: 'NORMAL'
    //         }
    //     ],
    //     curve_img_path: ''
    // },
    // 'GET /api/craft/materials': {
    //     content: [
    //         {
    //             id: 1,
    //             isDeleted: 0,
    //             freightNumber: '7N70006',
    //             material: 'b大铁块子',
    //             materialCode: 'TNA-2',
    //             size: '650*1880*450',
    //             netWeight: '7.8',
    //             productionUnit: 'a公司',
    //             client: 'a汽车'
    //         },
    //         {
    //             id: 2,
    //             isDeleted: 0,
    //             freightNumber: '7N70006',
    //             material: 'a铸铁',
    //             materialCode: 'TNA-3',
    //             size: '650*1880*450',
    //             netWeight: '7.8',
    //             productionUnit: 'a公司',
    //             client: 'a汽车'
    //         }
    //     ]
    // },
    'GET /api/updatelog/1': {
        list: [
            {
                beforeUpdate: '我是一根修改前的轧辊', afterUpdate: '我是一根修改后的轧辊', name: '我是修改轧辊的张旭'
            },
            {
                beforeUpdate: '我是一根修改前的轧辊', afterUpdate: '我是一根修改后的轧辊', name: '我是修改轧辊的张旭'
            },
        ]

    },
    'GET /api/crafts': {
        content: [
            {
                id: 1,
                name: '新增工艺',
                craftNo: 1,
                materialRange: 'TNA-1, ZYB-2',
                specificationRange: '10,<,<,100',
                hardnessRange: '10,100',
                applicableDevice: '适用设备',
                machineHour: '台式',
                tooling: '工具及装备',
                needCooling: 'YES',
                approvalStatus: 'NOT_APPROVAL',
                remark: '备注',
                createdDt: 1572416888118,
                created_by: 1,
                updated_dt: 1572416888118,
                updated_by: 1,
                isDeleted: 'NORMAL',
                createdUser: { name: '张三' },
                curves: [
                    {
                        id: 1,
                        craftId: 1,
                        speedupType: 'FULL_SPEED',
                        duration: '180',
                        temperature: '200',
                        temperatureType: 'FURNACE_TEMPERATURE',
                        deviation: '20',
                        remark: '备注',
                        created_dt: 1572416888118,
                        created_by: 1,
                        updated_dt: 1572416888118,
                        updated_by: 1,
                        isDeleted: 'NORMAL'
                    },
                    {
                        id: 1,
                        craftId: 1,
                        speedupType: 'NORMAL',
                        duration: '180',
                        temperature: '200',
                        temperatureType: 'FURNACE_TEMPERATURE',
                        deviation: 1,
                        remark: '备注',
                        created_dt: 1572416888118,
                        created_by: 1,
                        updated_dt: 1572416888118,
                        updated_by: 1,
                        isDeleted: 'NORMAL'
                    }
                ],
                curve_img_path: ''
            }
        ],
        totalElements: 20,
        number: 1,
        size: 10,
        totalPages: 20
    },
    'GET /api/craft/1': {
        id: 1,
        name: '新增工艺',
        craftNo: 1,
        materialRange: 'b大铁块子-TNA-2,a铸铁-TNA-3',
        specificationRange: '10,<,<,100',
        hardnessRange: '10,100',
        applicableDevice: '适用设备',
        machineHour: '台式',
        tooling: '工具及装备',
        needCooling: 'YES',
        approvalStatus: 'NOT_APPROVAL',
        remark: '备注',
        createdDt: 1572416888118,
        created_by: 1,
        updated_dt: 1572416888118,
        updated_by: 1,
        isDeleted: 'NORMAL',
        curves: [
            {
                id: 1,
                craftId: 1,
                speedupType: 'FULL_SPEED',
                duration: '180',
                temperature: '200',
                temperatureType: 'FURNACE_TEMPERATURE',
                deviation: '20',
                remark: '备注',
                created_dt: 1572416888118,
                created_by: 1,
                updated_dt: 1572416888118,
                updated_by: 1,
                isDeleted: 'NORMAL'
            },
            {
                id: 1,
                craftId: 1,
                speedupType: 'NORMAL',
                duration: '180',
                temperature: '200',
                temperatureType: 'FURNACE_TEMPERATURE',
                deviation: 1,
                remark: '备注',
                created_dt: 1572416888118,
                created_by: 1,
                updated_dt: 1572416888118,
                updated_by: 1,
                isDeleted: 'NORMAL'
            }
        ],
        curve_img_path: ''
    },
    'GET /api/craft/materials': {
        content: [
            {
                id: 1,
                isDeleted: 0,
                freightNumber: '7N70006',
                material: 'b大铁块子',
                materialCode: 'TNA-2',
                size: '650*1880*450',
                netWeight: '7.8',
                productionUnit: 'a公司',
                client: 'a汽车'
            },
            {
                id: 2,
                isDeleted: 0,
                freightNumber: '7N70006',
                material: 'a铸铁',
                materialCode: 'TNA-3',
                size: '650*1880*450',
                netWeight: '7.8',
                productionUnit: 'a公司',
                client: 'a汽车'
            }
        ]
    },
};
