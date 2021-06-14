export const qualityInspectionManagement = {
    'GET /api/BEFORE_SELF_CHECK/checks': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                beforeSelfCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_SELF_CHECK',
                    exteriorCheck: '外观检验',
                    exteriorUser: {
                        id: 1,
                        name: '外观检验人',
                        is_deleted: 'NORMAL'
                    },
                    isExempt: 'YES',
                    exemptReason: '免检原因',
                    hardnessUser: {
                        id: 1,
                        name: '硬度检验人',
                        isDeleted: 'NORMAL'
                    },
                    hardnessCheck1: '1',
                    hardnessCheck2: '2',
                    hardnessCheck3: '3',
                    hardnessCheck4: '4',
                    hardnessCheck5: '5',
                    hardnessCheck6: '6',
                    hardnessCheck7: '7',
                    result: 'CHECKED',
                    createdDt: 1572416888118,
                    createdBy: 1,
                    updatedDt: 1572416888118,
                    updatedBy: 1,
                    is_deleted: 'NORMAL',
                    exteriorCheckTime: 1572416888118,
                    hardnessCheckTime: 1572416888118
                }
            }
        ]
    },
    'GET /api/BEFORE_QUALITY_CHECK/checks': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                beforeQualityCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_QUALITY_CHECK',
                    checkUser: {
                        id: 1,
                        name: '检验人',
                        isDeleted: 'NORMAL'
                    },
                    chemistryCheck: 'NG',
                    flawCheck: 'OK',
                    hardnessCheck: 'EXEMPT',
                    metalCheck: 'NG',
                    sizeCheck: 'OK',
                    result: 'SECOND_CHECK',
                    isSecond: 'YES',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                }
            }
        ]
    },
    'GET /api/BEFORE_QUALITY_CHECK/ngs': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                beforeSelfCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_SELF_CHECK',
                    exteriorCheck: '外观检验',
                    exteriorUser: {
                        id: 1,
                        name: '外观检验人',
                        isDeleted: 'NORMAL'
                    },
                    isExempt: 'NO',
                    exemptReason: '免检原因',
                    hardnessUser: {
                        id: 1,
                        name: '硬度检验人',
                        is_deleted: 'NORMAL'
                    },
                    hardnessCheck1: '1',
                    hardnessCheck2: '2',
                    hardnessCheck3: '3',
                    hardnessCheck4: '4',
                    hardnessCheck5: '5',
                    hardnessCheck6: '6',
                    hardnessCheck7: '7',
                    result: 'NOT_CHECK',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                },
                beforeQualityCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_QUALITY_CHECK',
                    checkUser: {
                        id: 1,
                        name: '检验人',
                        isDeleted: 'NORMAL'
                    },
                    chemistryCheck: 'OK',
                    flawCheck: 'OK',
                    hardnessCheck: 'OK',
                    metalCheck: 'OK',
                    sizeCheck: 'OK',
                    result: 'OK',
                    isSecond: 'YES',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                },
                ngCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'AFTER_QUALITY_CHECK',
                    result: 'IGNORE',
                    dealUser: {
                        id: 1,
                        name: '处理人',
                        isDeleted: 'NORMAL'
                    },
                    remark: '备注',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                }
            }
        ]
    },

    'GET /api/AFTER_SELF_CHECK/checks': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                afterSelfCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_SELF_CHECK',
                    exteriorCheck: '外观检验',
                    exteriorUser: {
                        id: 1,
                        name: '外观检验人',
                        is_deleted: 'NORMAL'
                    },
                    isExempt: 'YES',
                    exemptReason: '免检原因',
                    hardnessUser: {
                        id: 1,
                        name: '硬度检验人',
                        isDeleted: 'NORMAL'
                    },
                    hardnessCheck1: '1',
                    hardnessCheck2: '2',
                    hardnessCheck3: '3',
                    hardnessCheck4: '4',
                    hardnessCheck5: '5',
                    hardnessCheck6: '6',
                    hardnessCheck7: '7',
                    result: 'CHECKED',
                    createdDt: 1572416888118,
                    createdBy: 1,
                    updatedDt: 1572416888118,
                    updatedBy: 1,
                    is_deleted: 'NORMAL',
                    exteriorCheckTime: 1572416888118,
                    hardnessCheckTime: 1572416888118
                }
            }
        ]
    },
    'GET /api/AFTER_QUALITY_CHECK/checks': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                afterQualityCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_QUALITY_CHECK',
                    checkUser: {
                        id: 1,
                        name: '检验人',
                        isDeleted: 'NORMAL'
                    },
                    chemistryCheck: 'NG',
                    flawCheck: 'OK',
                    hardnessCheck: 'EXEMPT',
                    metalCheck: 'NG',
                    sizeCheck: 'OK',
                    result: 'SECOND_CHECK',
                    isSecond: 'YES',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                }
            }
        ]
    },
    'GET /api/AFTER_QUALITY_CHECK/ngs': {
        content: [
            {
                id: 1,
                status: 'NOT_PUT',
                productNo: '生产号dl001',
                isBlank: 'NO',
                remark: '备注',
                freight: {
                    id: '1',
                    freightNumber: '7N34239',
                    material: 'xxx铸铁',
                    materialCode: 'TNA-3',
                    size: '6000*9999',
                    netWeight: '7.8'
                },
                afterSelfCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_SELF_CHECK',
                    exteriorCheck: '外观检验',
                    exteriorUser: {
                        id: 1,
                        name: '外观检验人',
                        isDeleted: 'NORMAL'
                    },
                    isExempt: 'NO',
                    exemptReason: '免检原因',
                    hardnessUser: {
                        id: 1,
                        name: '硬度检验人',
                        is_deleted: 'NORMAL'
                    },
                    hardnessCheck1: '1',
                    hardnessCheck2: '2',
                    hardnessCheck3: '3',
                    hardnessCheck4: '4',
                    hardnessCheck5: '5',
                    hardnessCheck6: '6',
                    hardnessCheck7: '7',
                    result: 'NOT_CHECK',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                },
                afterQualityCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'BEFORE_QUALITY_CHECK',
                    checkUser: {
                        id: 1,
                        name: '检验人',
                        isDeleted: 'NORMAL'
                    },
                    chemistryCheck: 'OK',
                    flawCheck: 'OK',
                    hardnessCheck: 'OK',
                    metalCheck: 'OK',
                    sizeCheck: 'OK',
                    result: 'OK',
                    isSecond: 'YES',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                },
                ngCheck: {
                    id: 1,
                    rollId: 1,
                    type: 'AFTER_QUALITY_CHECK',
                    result: 'IGNORE',
                    dealUser: {
                        id: 1,
                        name: '处理人',
                        isDeleted: 'NORMAL'
                    },
                    remark: '备注',
                    created_dt: 1572416888118,
                    created_by: 1,
                    updatedDt: 1572416888118,
                    updated_by: 1,
                    isDeleted: 'NORMAL'
                }
            }
        ]
    },

};
