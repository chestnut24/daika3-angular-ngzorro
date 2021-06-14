export const heatTreatmentMock = {
    'GET /api/hts': [
        {
            id: 1,
            areaName: '区域名称',
            htInfo: [
                {
                    production: {
                        name: '电阻炉1',
                        htStatus: 'NOT_START',
                        fatherNode: [
                            1,
                            2
                        ]
                    },
                    htRecord: {
                        furnaceTemp: '',
                        rollTemp: 130,
                        startTime: 1574306127110,
                        endTime: 1574306127110
                    }
                },
                {
                    production: {
                        name: '电阻炉1',
                        htStatus: 'PROCESSING',
                        fatherNode: [
                            1,
                            2
                        ]
                    },
                    htRecord: {
                        furnaceTemp: '',
                        rollTemp: 130,
                        startTime: 1574306127110,
                        endTime: 1574306127110
                    }
                },
                {
                    production: {
                        name: '电阻炉1',
                        htStatus: 'COMING_SOON',
                        fatherNode: [
                            1,
                            2
                        ]
                    },
                    htRecord: {
                        furnaceTemp: '',
                        rollTemp: 130,
                        startTime: 1574306127110,
                        endTime: 1574306127110
                    }
                },
                {
                    production: {
                        name: '电阻炉1',
                        htStatus: 'END',
                        fatherNode: [
                            1,
                            2
                        ]
                    },
                    htRecord: {
                        furnaceTemp: '',
                        rollTemp: 130,
                        startTime: 1574306127110,
                        endTime: 1574306127110
                    }
                },
            ]
        },
    ],
    'GET /api/ht/1': {
        htRecord: {
            id: 1,
            detailId: 1,
            startTime: 1574306127110,
            endTime: 1574306127110,
            monitorStandard: 'MIN',
            correctSign: 'NEGATIVE',
            correctTime: 20,
            furnaceTemp: 150,
            rollTemp: 130,
            htPause: [
                {
                    id: 1,
                    htRecordId: 1,
                    time: 1572416888118,
                    type: 'END'
                }
            ],
            htAlarms: [
                {
                    id: 1,
                    htRecordId: 1,
                    curve: {
                        speedupType: 'FULL_SPEED'
                    },
                    startTime: 1572416888118,
                    endTime: 1572416888118,
                    device: {
                        id: 1,
                        name: '炉温设备',
                        deviceNum: '设备编号23423',
                        equipmentLocation: '监控位',
                        temperatureType: 'FURNACE_TEMPERATURE'
                    },
                    actualTemp: 150,
                    targetTemp: 100,
                    alarmDeviation: 50,
                    status: 'ACTIVE'
                }
            ]
        },
        device: {
            id: 1,
            name: '设备名称',
            deviceNum: '设备编号23423',
            manufacturer: '生产厂家',
            isDeleted: 'NORMAL',
            monitors: [
                {
                    id: 1,
                    name: '炉温设备',
                    deviceNum: '设备编号23423',
                    equipmentLocation: '监控位',
                    temperatureType: 'ROLL_TEMPERATURE'
                }
            ]
        },
        linkDetail: {
            id: 1,
            linkId: 1,
            startTime: 1572416888118,
            endTime: 1572416888118,
            putMeterReading: '入炉抄表读数',
            takeMeterReading: '出炉抄表读数',
            isDeleted: 'NORMAL',
            craft: {
                id: 1,
                name: '新增工艺',
                craftNo: 'zyb-1',
                curves: [
                    {
                        id: 1,
                        craftId: 1,
                        speedupType: 'FULL_SPEED',
                        duration: '180',
                        temperature: '200',
                        temperatureType: 'FURNACE_TEMPERATURE',
                        deviation: '20'
                    }
                ]
            },
            freights: [
                {
                    id: 1,
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8',
                    detailRolls: [
                        {
                            id: 1,
                            detailId: 1,
                            position: '5',
                            status: 'IN_FURNACE',
                            roll: {
                                id: 1,
                                productNo: '生产号zyb038',
                                isBlank: 'NO',
                                remark: '备注'
                            }
                        }
                    ]
                }
            ]
        }
    }
};
