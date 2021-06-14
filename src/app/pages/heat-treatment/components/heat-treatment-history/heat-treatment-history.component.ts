import { Component, OnInit } from '@angular/core';
import { TitleType } from 'src/app/public/components/delong-table/delong-table.component';
import { DelongTableService } from 'src/app/services/delong-table.service';
import { EntryRecord } from 'src/app/public/interface/roll-resume';
import { EntryRecordService } from 'src/app/services/entry-record.service';
import { ConfigurationManagementService } from 'src/app/services/configuration-management.service';

@Component({
    selector: 'app-heat-treatment-history',
    templateUrl: './heat-treatment-history.component.html',
    styleUrls: ['./heat-treatment-history.component.scss']
})
export class HeatTreatmentHistoryComponent implements OnInit {

    tablePadding = 17; // 保持表格宽度的数据
    titleList: Array<TitleType> = [
        { name: '热处理开始时间', canSort: false, sortField: '', width: '147px' },
        { name: '热处理结束时间', canSort: false, sortField: '', width: '147px' },
        { name: '所属计划', canSort: false, sortField: '', width: '300px' },
        { name: '处理设备', canSort: false, sortField: '', width: '87px' },
        { name: '加工货号', canSort: false, sortField: '', width: '300px' },
        { name: '热处理过程记录', canSort: false, sortField: '', width: '60px', right: '0px' },
    ];
    listSelection: {
        selectData: any[];
        freightNumber: string;
        productNo: string;
        devName: string;
    } = {
            selectData: null,
            freightNumber: '',
            productNo: '',
            devName: null,
        };
    dateFormat = 'yyyy/MM/dd';

    routerWata = {
        searchParams: {},
        pageNum: 1,
        pageSize: 10,
    };

    deviceList = [];

    constructor(
        public delongTable: DelongTableService<EntryRecord>,
        public entryRecord: EntryRecordService,
        private configurationManagement: ConfigurationManagementService,
    ) {
    }

    ngOnInit() {
        this.delongTable.observeFunction = this.entryRecord.htHistoryList.bind(this.entryRecord);
        this.nowTimeGet();
        this.searchEntryRecord();
        this.getDevice();
    }


    init(val) {
        let data = JSON.parse(val);
        this.delongTable.observeFunction = this.entryRecord.htHistoryList.bind(this.entryRecord);
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
            freightNumber: string;
            productNo: string;
            devName: string;
        } = {
            startTime: '',
            endTime: '',
            freightNumber: '',
            productNo: '',
            devName: '',
        };
        if (this.listSelection.selectData && this.listSelection.selectData.length) {
            option.startTime = new Date(this.listSelection.selectData[0]).getTime().toString();
            option.endTime = new Date(this.listSelection.selectData[1]).getTime().toString();
        } else {
            option.startTime = '';
            option.endTime = '';
        }
        option.freightNumber = this.listSelection.freightNumber;
        option.productNo = this.listSelection.productNo;
        option.devName = this.listSelection.devName;
        this.delongTable.searchParams = option;
        this.delongTable.pageNum = 1;
        this.delongTable.search();
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

    changeData(data): string {
        if (data) {
            let obj = data;
            let list = [];
            let name = Object.keys(obj);
            let endStr = '';
            name.forEach(item => {
                list.push({
                    name: item,
                    val: this.changeList(data[item])
                });
                endStr += item + '( ' + this.changeList(data[item]) + ')   ';
            });
            return endStr;
        } else {
            return '';
        }
    }
    changeList(list): string {
        if (list && list.length) {
            let str = '';
            list.forEach(item => {
                str += item + ' ';
            });
            return str;
        } else {
            return '';
        }
    }

    changeArrS(list) {
        if (list && list.length) {
            let planName = [];
            let planList = [];
            list.forEach(item => {
                planName.push(item.planLinkName);
            });
            planName = this.unique2(planName);
            planName.forEach((plan, i) => {
                planList.push({
                    name: plan,
                    dev: [],
                });
                list.forEach(item => {
                    if (plan === item.planLinkName) {
                        planList[i].dev.push(item.devName)
                    }
                });
            });
            return planList;
        } else {
            return [];
        }
    }
    unique2(arr) {
        return Array.from(new Set(arr))
    }
    getDevice(){
        this.configurationManagement.getProductFindList({
            pageNum: '0',
            pageSize: '9999'
        }).subscribe(data => {
            this.deviceList = data.content;
        });
    }

}
