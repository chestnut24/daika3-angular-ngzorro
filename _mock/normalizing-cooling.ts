export const cooling = {
    'GET /api/cooling/findpage': {
        content: [
            {
                id: 0,
                startTime: '1573029602022',
                endTime: '1573029602022',
                roll: {
                    productNo: '11',
                    freight: {
                        freightNumber: '7N70008',
                        size: '650*1880*450',
                        netWeight: '7.8',
                        material: 'a金子',
                        materialCode: 'TNA-4',
                        productionUnit: 'a公司'
                    }, // 轧辊信息
                    user: {
                        name: '',
                    }, // 操作人信息
                }, // 生产号信息
                targetTemp: '', // 目标温度
                currentTemp: '', // 当前温度
                status: 'NOT_START', // 冷却状态
                endDeviation: '', // 结束允许偏差值
                remindEndTemp: '', // 结束提醒温度
                productionList: [
                    {
                        production: {
                            name: '', // 设备名称
                            temp: '', // 温度
                        }
                    }
                ], // 设备列表

            } ,
            {
                id: 0,
                startTime: '1573029602022',
                endTime: '1573029602022',
                roll: {
                    productNo: '11',
                    freight: {
                        freightNumber: '7N70008',
                        size: '650*1880*450',
                        netWeight: '7.8',
                        material: 'a金子',
                        materialCode: 'TNA-4',
                        productionUnit: 'a公司'
                    }, // 轧辊信息
                    user: {
                        name: '',
                    }, // 操作人信息
                }, // 生产号信息
                targetTemp: '250', // 目标温度
                currentTemp: '200', // 当前温度
                status: 'IN_COOLING', // 冷却状态
                endDeviation: '20', // 结束允许偏差值
                remindEndTemp: '200', // 结束提醒温度
                productionList: [
                    {
                        production: {
                            name: '测温枪001', // 设备名称
                            temp: '200', // 温度
                        }
                    }
                ], // 设备列表

            }
        ]

    },
    'GET /api/cooling/findPagePast': {
        content: [
            {
                id: 0,
                roll: {
                    productNo: '11',
                    freight: {
                        freightNumber: '7N70008',
                        size: '650*1880*450',
                        netWeight: '7.8',
                        material: 'a金子',
                        materialCode: 'TNA-4',
                        productionUnit: 'a公司'
                    }, // 轧辊信息
                },
                deviceId: 2,
                operator: {
                    name: '张喆语'
                },
                monitor: {
                    id: 2,
                    name: '测温枪002',
                },
                actualFlag: 'MAX',
                status: 'WIN',
                startTime: '1573029602022', // 开始时间
                endTime: '1573029602022', // 结束时间
                targetTemp: '250', // 目标温度
                currentTemp: '230', // 当前温度
                endDeviation: '20', // 允许结束偏差值
                remindEndTemp: '200', // 结束提醒温度
                actualEndTemp: '230' // 实际结束温度
            },
            {
                id: 0,
                roll: {
                    productNo: '11',
                    freight: {
                        freightNumber: '7N70008',
                        size: '650*1880*450',
                        netWeight: '7.8',
                        material: 'a金子',
                        materialCode: 'TNA-4',
                        productionUnit: 'a公司'
                    }, // 轧辊信息
                },
                deviceId: 1,
                operator: {
                    name: '张喆语'
                },
                monitor: {
                    id: 1,
                    name: '测温枪001',
                },
                actualFlag: 'MIN',
                status: 'COERCE_WIN',
                startTime: '1573029602022', // 开始时间
                endTime: '1573029602022', // 结束时间
                targetTemp: '250', // 目标温度
                currentTemp: '230', // 当前温度
                endDeviation: '20', // 允许结束偏差值
                remindEndTemp: '200', // 结束提醒温度
                actualEndTemp: '230' // 实际结束温度
            },
        ]

    }
};
