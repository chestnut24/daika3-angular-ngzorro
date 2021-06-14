import { Component, OnInit } from '@angular/core';
import { DelongTableService } from '../../services/delong-table.service';
import { EntryRecord, SelfCheck } from '../../public/interface/entry-record';
import { TitleType } from '../../public/components/delong-table/delong-table.component';
import { EntryRecordService } from '../../services/entry-record.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AddRecordComponent } from './component/add-record/add-record.component';
import { IsExempt } from '../../public/interface/quality-inspection-management';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-entry-record',
    templateUrl: './entry-record.component.html',
    styleUrls: ['./entry-record.component.scss']
})
export class EntryRecordComponent implements OnInit {
    tablePadding = 17; // 保持表格宽度的数据
    titleList: Array<TitleType> = [
        { name: '入厂时间', canSort: false, sortField: '', width: '147px' },
        { name: '货号', canSort: false, sortField: '', width: '100px' },
        { name: '生产号', canSort: false, sortField: '', width: '60px' },
        { name: '毛坯辊', canSort: false, sortField: '', width: '60px' },
        { name: '交货人', canSort: false, sortField: '', width: '60px' },
        { name: '登记人', canSort: false, sortField: '', width: '60px' },
        { name: '备注', canSort: false, sortField: '', width: '150px' },
        { name: '操作', canSort: false, sortField: '', width: '157px', right: '0px' },
    ];
    listSelection: {
        selectData: any[];
        itemNumber: string;
        productNumber: string;
    } = {
            selectData: null,
            itemNumber: '',
            productNumber: '',
        };
    dateFormat = 'yyyy/MM/dd';

    routerWata = {
        searchParams: {},
        pageNum: 1,
        pageSize: 10,
    };

    constructor(
        public delongTable: DelongTableService<EntryRecord>,
        public entryRecord: EntryRecordService,
        private modalService: NzModalService,
        private messageService: NzMessageService,
    ) {
    }

    ngOnInit() {
        this.delongTable.observeFunction = this.entryRecord.SearchEntryRecord.bind(this.entryRecord);
        this.nowTimeGet();
        this.searchEntryRecord();
    }


    init(val) {
        let data = JSON.parse(val);
        this.delongTable.observeFunction = this.entryRecord.SearchEntryRecord.bind(this.entryRecord);
        this.delongTable.searchParams = data.searchParams;
        this.delongTable.pageNum = data.pageNum;
        this.delongTable.pageSize = data.pageSize;
        this.delongTable.search();
    }
    pageChange() {
        this.routerWata = {
            searchParams: this.delongTable.searchParams,
            pageNum: this.delongTable.pageNum,
            pageSize: this.delongTable.pageSize,
        };
    }
    searchEntryRecord(): void {
        const option: {
            startTime: string;
            endTime: string
            itemNumber: string;
            productNumber: string;
        } = {
            startTime: '',
            endTime: '',
            itemNumber: '',
            productNumber: '',
        };
        // if (!this.listSelection.selectData[0]) {
        //     option.startTime = '';

        // } else {
        //     option.startTime = new Date(this.listSelection.selectData[0]).getTime().toString();
        // }
        // if (!this.listSelection.selectData[1]) {
        //     option.endTime = '';
        // } else {
        //     option.endTime = new Date(this.listSelection.selectData[1]).getTime().toString();
        // }
        if (this.listSelection.selectData && this.listSelection.selectData.length) {
            option.startTime = new Date(this.listSelection.selectData[0]).getTime().toString();
            option.endTime = new Date(this.listSelection.selectData[1]).getTime().toString();
        } else {
            option.startTime = '';
            option.endTime = '';
        }
        option.itemNumber = this.listSelection.itemNumber;
        option.productNumber = this.listSelection.productNumber;
        this.delongTable.searchParams = option;
        this.delongTable.pageNum = 1;
        this.delongTable.search();
    }
    addRecord(): void {
        this.creatEntryRecord('入厂登记', {
            id: '', // 轧辊的id
            remark: '', // 轧辊入厂信息的备注
            createdDt: '', // 轧辊的创建时间
            productNo: '', // 生产号
            freightNumber: '',
            isBlank: '', // 是否是毛坯辊 1是毛坯 0不是毛坯
            processStatus: '', // 生产状态
            status: '', // 轧辊状态
            // tslint:disable-next-line:new-parens
            freight: {
                freightNumber: '',
                material: '', // 材质
                materialCode: '', // 材质代码
                size: '', // 尺寸
                netWeight: '', // 净重
                productionUnit: '', // 生产单位
                client: '', // 用户信息
            }, // 轧辊货号
            // tslint:disable-next-line:new-parens
            submitUser: {
                name: '',
            }, // 交送人
            // tslint:disable-next-line:new-parens
            user: {
                name: '',
            }, // 登记人
            selfCheck: {
                exteriorCheck: '',
                hardnessCheck1: '',
                hardnessCheck2: '',
                hardnessCheck3: '',
                hardnessCheck4: '',
                hardnessCheck5: '',
                hardnessCheck6: '',
                hardnessCheck7: '',
                isExempt: IsExempt.NO,
                exemptReason: '',
                exteriorUserId: null,
                hardnessUserId: null,
                unit1: 'HSD',
                unit11: 'HSD',
                unit2: 'HSD',
            }
        });


    }
    modify(data) {
        this.creatEntryRecordB('入厂登记', data);
    }
    creatEntryRecord(title: string, freight: EntryRecord) {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: title,
            nzWidth: '850px',
            nzComponentParams: {
                freight,
            },
            nzBodyStyle: {
                padding: '8px 24px',
            },
            nzContent: AddRecordComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    loading: () => showload,
                    // tslint:disable-next-line:max-line-length
                    disabled: (contentComponentInstance) => {
                        if (contentComponentInstance.EntryRecord.isBlank === false) {
                            if (contentComponentInstance.EntryRecord.isExempt === true) {
                                // tslint:disable-next-line:max-line-length
                                return !(contentComponentInstance.information.valid && contentComponentInstance.selfcheck.checkList.valid && contentComponentInstance.selfcheck.Exmpt.valid);
                            } else {
                                return !(contentComponentInstance.information.valid && contentComponentInstance.selfcheck.checkList.valid)
                            }
                        } else {
                            return !(contentComponentInstance.information.valid);
                        }

                    },
                    onClick: (contentComponentInstance) => {
                        showload = true;
                        let freightID;
                        let submitUser;
                        const cci = contentComponentInstance;
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < cci.menuList.length; i++) {
                            if (cci.menuList[i].freightNumber === cci.information.value.itemNum) {
                                freightID = cci.menuList[i].id;
                            }
                        }
                        // tslint:disable-next-line:prefer-for-of
                        for (let j = 0; j < cci.submitUsers.length; j++) {
                            if (cci.submitUsers[j].name === cci.information.value.submitUser) {
                                submitUser = cci.submitUsers[j].id;
                            }
                        }
                        this.entryRecord.AddEntryRecord({
                            freightId: freightID,
                            productNo: cci.information.value.productNum,
                            isBlank: cci.EntryRecord.isBlank ? IsExempt.YES : IsExempt.NO,
                            remark: cci.EntryRecord.remark,
                            submitUserId: submitUser,
                            exteriorCheck: cci.EntryRecord.exteriorCheck,
                            hardnessCheck1: cci.EntryRecord.hardnessCheck1,
                            hardnessCheck2: cci.EntryRecord.hardnessCheck2,
                            hardnessCheck3: cci.EntryRecord.hardnessCheck3,
                            hardnessCheck4: cci.EntryRecord.hardnessCheck4,
                            hardnessCheck5: cci.EntryRecord.hardnessCheck5,
                            hardnessCheck6: cci.EntryRecord.hardnessCheck6,
                            hardnessCheck7: cci.EntryRecord.hardnessCheck7,
                            unit1: cci.EntryRecord.unit1,
                            unit2: cci.EntryRecord.unit2,
                            isExempt: cci.EntryRecord.isExempt ? IsExempt.YES : IsExempt.NO,
                            exemptReason: cci.EntryRecord.exemptReason,
                            id: Number(freight.id),
                        }).subscribe(success => {
                            this.messageService.create('success', `${title}成功`);
                            this.delongTable.settingInit();
                            showload = false;
                            modal.destroy();
                        }, error => {
                            this.messageService.create('error', `${title}失败 ${error.error.message}`);
                            showload = false;
                        });
                    }
                }
            ]
        });

    }
    creatEntryRecordB(title: string, freight: EntryRecord) {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: title,
            nzWidth: '850px',
            nzComponentParams: {
                freight,
            },
            nzBodyStyle: {
                padding: '8px 24px',
            },
            nzContent: AddRecordComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '质检完成后，不可修改',
                    type: 'primary',
                    loading: () => showload,
                    // tslint:disable-next-line:max-line-length
                    disabled: (contentComponentInstance) => true,
                }
            ]
        });

    }
    getIframeHeight() {
        return window.innerHeight - 290 + 'px';
    }
    nowTimeGet() {
        // 获取时间
        let today = new Date();
        let mt = today.getMonth() + 1;
        let formatnowdate = today.getFullYear() + '-' + mt + '-' + today.getDate();
        today.setMonth(today.getMonth() - 1);
        let m = today.getMonth() + 1;
        let Last_month = today.getFullYear() + '-' + m + '-' + today.getDate();
        // 赋值阶段
        this.listSelection.selectData = [new Date(Last_month), new Date(formatnowdate)]
    }
    // 删除轧辊
    delList(data) {
        const deleteModal = this.modalService.create({
            nzTitle: '删除',
            nzContent: '是否删除该生产号为' + data.productNo + '的轧辊？',
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => deleteModal.destroy()
                },
                {
                    label: '确定',
                    shape: 'primary',
                    onClick: () => {
                        // deleteModal.destroy();
                        this.entryRecord.deleteRoll(data.id).subscribe(
                            success => {
                                this.messageService.success('删除成功');
                                this.delongTable.search();
                                deleteModal.destroy();
                            }, error => {
                                this.messageService.error('删除失败，' + error.error.message);
                                deleteModal.destroy();
                            }
                        );
                    }
                },
            ],
        });
    }

}
