import { Component, OnInit } from '@angular/core';
import { FactoryManagementService } from 'src/app/services/factory-management';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RecordList } from 'src/app/public/interface/factory-management';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-completed-records',
    templateUrl: './completed-records.component.html',
    styleUrls: ['./completed-records.component.scss']
})
export class CompletedRecordsComponent implements OnInit {

    tablePadding = 17; // 保持表格宽度的数据

    dateRange;

    sendData: {
        freightNumber?: string;
        productionNo?: string;
        startTime?: Date;
        endTime?: Date;
    } = {
            freightNumber: '',
            productionNo: '',
            startTime: null,
            endTime: null,
        };
    pageNum = 1;
    pageSize = 10;
    tableTotal = 0;

    listOfData: Array<RecordList> = [];


    constructor(
        public httpfService: FactoryManagementService,
        private modalService: NzModalService,
        private messageService: NzMessageService,
        public router: Router,
    ) { }

    ngOnInit() {
        this.nowTimeGet();
        this.getList();
    }

    // 查询重置页数
    getListPage(): void {
        this.pageNum = 1;
        this.getList();
    }
    // 获取列表数据
    getList(): void {
        this.httpfService.getRecordListA(this.sendData, this.pageNum, this.pageSize).subscribe(data => {
            this.listOfData = data.content;
            this.tableTotal = data.totalElements;
        });
    }
    // 转辊操作
    changeData(id: number): void {
        this.modalService.create({
            nzTitle: '提示',
            nzContent: '确认转辊操作吗？',
            nzClosable: false,
            nzOnOk: () => {
                this.httpfService.changeRecordStatus(id).subscribe(success => {
                    this.messageService.create('success', '转辊成功');
                    this.getList();
                }, error => {
                    this.messageService.create('error', `转辊失败， ${error.error.message}`);
                });
            }
        });
    }
    // 跳转轧辊履历
    goPersonal(data: RecordList): void {
        this.router.navigate(['/rollDetail/rollResume/entry', data.id]);
    }
    // 时间转换
    onChangeTime(data) {
        if (data && data.length) {
            this.sendData.startTime = data[0];
            this.sendData.endTime = data[1];
        } else {
            this.sendData.startTime = null;
            this.sendData.endTime = null;
        }
        this.getListPage();
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
        this.sendData.startTime = new Date(Last_month);
        this.sendData.endTime = new Date(formatnowdate);
        this.dateRange = [new Date(Last_month), new Date(formatnowdate)]
    }
}
