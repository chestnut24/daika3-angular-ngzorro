import { Component, OnInit } from '@angular/core';
import { TitleType } from 'src/app/public/components/delong-table/delong-table.component';
import { Router } from '@angular/router';
import { ChargingPlanService } from '../../../../services/charging-plan.service';
import { UserService } from '../../../../services/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-plan-list',
    templateUrl: './plan-list.component.html',
    styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

    tablePadding = 17; // 保持表格宽度的数据
    sendData = {
        freightNumber: null,
        start: null,
        startTime: null,
        end: null,
        createdDt: null,
        status: '',
    };
    titleList: Array<TitleType> = [
        { name: '计划时间', canSort: false, sortField: 'createdTime', width: '92px', },
        { name: '计划生产时间', canSort: false, sortField: 'createdUserName', width: '100px', },
        { name: '工艺环节', canSort: false, sortField: 'name', width: '70px', },
        { name: '使用设备', canSort: false, sortField: 'equipmentNumber', width: '105px', },
        { name: '加工工艺', canSort: false, sortField: 'productionTypeName', width: '120px', },
        { name: '加工轧辊', canSort: false, sortField: 'areaName', width: '300px', },
        { name: '调度员', canSort: false, sortField: 'readman', width: '60px', },
        { name: '技术员', canSort: false, sortField: 'workman', width: '60px', },
        { name: '计划单执行进度', canSort: false, sortField: 'du', width: '250px' },
        { name: '计划单状态', canSort: false, sortField: 'status', width: '80px' },
        { name: '操作', canSort: false, sortField: 'action', width: '117px', right: '0px' },
    ];
    // 模拟数据
    tableList = [];
    newTableList = [];
    delongTable: {
        pageNum: number;
        pageSize: number;
        tableTotal: number;
    } = {
            pageNum: 1,
            pageSize: 5,
            tableTotal: 0,
        };
    UserTechnician = false;
    UserPlanner = false;
    statusList = [
        { value: '', label: '全部' },
        { value: 'TO_BE_ADDED', label: '待补充' },
        { value: 'TO_BE_EXECUTED', label: '待执行' },
        { value: 'EXECUTING', label: '执行中' },
        { value: 'COMPLETED', label: '完成' },
        { value: 'PLAN_UPDATE', label: '计划变更' },
    ]


    constructor(
        public router: Router,
        public chargingPlanService: ChargingPlanService,
        public modalService: NzModalService,
        public messageService: NzMessageService,
        // UserService
        public user: UserService,

    ) { }

    ngOnInit() {
        this.user.getCurrentUser().subscribe(data => {
            if (data.role) {
                if (data.role.accesses && data.role.accesses.length) {
                    // console.log(data.role.accesses)
                    data.role.accesses.forEach(item => {
                        if (item.value === 'technician') {
                            this.UserTechnician = true;
                        } else if (item.value === 'planner') {
                            this.UserPlanner = true;
                        }
                    });
                }
            }
        });
        this.getList();
    }

    // 查询重置页数
    getListPage() {
        this.delongTable.pageNum = 1;
        this.getList();
    }
    // 获取列表
    getList(): void {
        this.chargingPlanService.getPlanTableList(this.sendData, this.delongTable.pageNum, this.delongTable.pageSize).subscribe(data => {
            this.delongTable.tableTotal = data.totalElements;
            this.tableList = data.content;
            this.newTableList = [];
            this.tableList.forEach(item1 => {
                const Arr = this.chargingPlanService.dataProcess(item1.links);
                if (Arr && Arr.length) {
                    let a = false;
                    Arr.forEach((item2, ia) => {
                        if (item2.status2.length === 0) {
                            a = true;
                        }
                    });
                    Arr.forEach((item2, ia) => {
                        if (ia === 0) {
                            item2.fatherLen = Arr.length;
                            item2.listCanEdit = a;
                        }
                        item2.planList = item1;
                        this.newTableList.push(item2);
                    });
                } else {
                    this.newTableList.push({
                        detailStartTime: '',
                        detailEndTime: '',
                        craftName: '',
                        detailDevice: '',
                        detailCraft: '',
                        freightList: [],
                        freightNumber: '',
                        freight: {},
                        freightID: null,
                        detail: {},
                        detailID: null,
                        craft: {},
                        craftID: null,
                        detailRowspan: 1,
                        fatherLen: 1,
                        craftRowspan: 1,
                        status1: [],
                        status2: [],
                        status3: [],
                        planList: item1
                    });
                }
            });
        });
    }
    // 跳转明细页
    goSchedulePage(id: number): void {
        this.router.navigate(['/chargingPlan/chargingSchedule', id]);
    }
    // 可编辑的计划详情页
    addListData(id: number): void {
        this.router.navigate(['/chargingPlan/addNewPlan', id]);
    }
    // 查看计划详情
    goPlanInfo(id: number): void {
        this.router.navigate(['/chargingPlan/lookPlan', id]);
    }
    editData(id: number): void {
        this.router.navigate(['/chargingPlan/editAllPlan', id]);
    }
    // 时间数据转换
    changeTime(): void {
        this.sendData.createdDt = this.sendData.start ? this.getNowFormatDate(this.sendData.start) : null;
    }
    changeTimeEnd(): void {
        this.sendData.startTime = this.sendData.end ? this.getNowFormatDate(this.sendData.end) : null;
    }
    // 技术员的补充和编辑
    addAllPlan(id: number): void {
        this.router.navigate(['/chargingPlan/addAllPlan', id]);
    }
    // 撤销
    delPlan(id: number): void {
        this.modalService.create({
            nzTitle: '确认要撤销吗？',
            nzContent: '您确认撤销该计划吗？',
            nzClosable: false,
            nzOnOk: () => {
                this.chargingPlanService.delPlan(id).subscribe(success => {
                    this.messageService.create('success', '撤销成功');
                    this.getList();
                }, error => {
                    this.messageService.create('error', `撤销失败，${error.error.message}`);
                });
            }
        });
    }
    // 三个跳转1.入炉记录2.热处理记录3.出炉记录
    goEntryPage(id: number, i: number, status: string): void {
        if (status === 'TO_BE_ADDED') {
            this.messageService.create('error', '请先补充工艺信息');
        } else {
            if (i === 1) {
                this.router.navigate(['/enterFurnace/operation', id]);
            } else if (i === 2) {
                this.router.navigate(['/heatTreatment', id]);
            } else if (i === 3) {
                this.router.navigate(['/takeFurnace/operation', id]);
            }
        }
    }
    // Date转换yyyy-mm-dd再转时间戳
    getNowFormatDate(val: Date): number {
        // tslint:disable-next-line: prefer-const
        let date = new Date(val);
        const seperator1 = '-';
        const year = date.getFullYear();
        const month: number | string = date.getMonth() + 1;
        const strDate: number | string = date.getDate();
        const currentdate = year + seperator1 + month + seperator1 + strDate;
        const valueData = +new Date(currentdate);
        return valueData;
    }
    getIframeHeight() {
        return window.innerHeight - 290 + 'px';
    }
}
