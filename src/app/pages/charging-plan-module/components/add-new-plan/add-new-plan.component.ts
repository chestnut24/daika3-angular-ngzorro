import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AddHeatTreatmentRollComponent } from '../add-heat-treatment-roll/add-heat-treatment-roll.component';
import { ChargingPlanService } from '../../../../services/charging-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDeviceChooseComponent } from '../add-device-choose/add-device-choose.component';
import { FormInfo, PlanRollsListChoose, DataFormValue, LinkDetailValue } from 'src/app/public/interface/charging-plan';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { Observable, Observer } from 'rxjs';
import { HeatTreatmentComponent } from '../../../heat-treatment/heat-treatment.component';
import { AppRoutingCache } from 'src/app/app-routing.cache';

export interface MsgCode {
    isPass: boolean;
    error?: string;
}

@Component({
    selector: 'app-add-new-plan',
    templateUrl: './add-new-plan.component.html',
    styleUrls: ['./add-new-plan.component.scss']
})
export class AddNewPlanComponent implements OnInit {
    [x: string]: any;

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private httpFunction: ChargingPlanService,
        private httpArea: ConfigurationManagementService,
        private messageService: NzMessageService,
        private route: ActivatedRoute,
        public router: Router,
    ) { }
    index = 0;
    tabsList: Array<FormInfo> = [
        {
            titleName: '环节',
            isAdd: true,
            status: 'TO_BE_ADDED',
            dataForm: this.fb.array([
                this.createDataForm()
            ]),
            rollsList: [
                {
                    list: []
                }
            ],
            deviceDialog: [
                { show: false }
            ],
        }
    ];
    // 新增的计划存储的信息
    planOtherInfo: any = {
        planner: {
            name: '调度员姓名',
        },
        plannerName: '调度员姓名',
        technician: {
            name: '技术员姓名',
        },
        status: '',
    };
    areaList = [];
    isEdit = false; // 是否是修改
    isSpinning = false;
    disabledStartDate = (data: any): boolean => {
        if (!data.startTime || !data.endTime) {
            console.log(data);
            return false;
        }
        const aTime = new Date(data.startTime);
        const bTime = new Date(data.endTime);
        return aTime.getTime() > bTime.getTime();
    }
    disabledEndDate = (data: any): boolean => {
        if (!data.startTime || !data.endTime) {
            return false;
        }
        const aTime = new Date(data.startTime);
        const bTime = new Date(data.endTime);
        return aTime.getTime() <= bTime.getTime();
    }

    ngOnInit() {
        this.getAreaList();
        this.route.paramMap.subscribe(params => {
            this.planOtherInfo.planId = Number(params.get('fid'));
        });
        if (this.planOtherInfo.planId) {
            this.getPlanLinkOne();
        } else {
            // this.getPlanOtherInfo();
        }
    }


    // 选择区域
    getAreaList(): void {
        this.httpArea.getProductionAreaList().subscribe(data => {
            this.areaList = data;
        });
    }
    // 环节页面的删除
    closeTab(tab: FormInfo): void {
        if (tab.id) {
            this.httpFunction.delPlanLink(tab.id).subscribe(success => {
                this.tabsList.splice(this.tabsList.indexOf(tab), 1);
            }, error => {
                this.messageService.create('error', `删除环节失败，${error.error.message}`);
            });
        } else {
            this.tabsList.splice(this.tabsList.indexOf(tab), 1);
        }
    }
    getRollsFormFirstTab(): any[] {
        const myRolls = this.tabsList[0].rollsList;
        const listRolls = [];
        myRolls.forEach(itemRolls => {
            if (itemRolls.list.length) {
                itemRolls.list.forEach(todo => {
                    let isAdd = true;
                    listRolls.forEach(item => {
                        if (item.number === todo.freight.freightNumber) {
                            isAdd = false;
                            todo.numChoose.forEach(toN => {
                                item.numChoose.push(toN);
                            })
                            todo.idChoose.forEach(toId => {
                                item.idChoose.push(toId);
                            })
                            todo.myRollList.forEach(toId => {
                                item.myRollList.push(toId);
                            })
                        }
                    });
                    // 去重呀
                    listRolls.forEach(item => {
                        item.idChoose = this.unique(item.idChoose);
                        item.numChoose = this.unique2(item.numChoose);
                        let idQ = [item.myRollList[0].id];
                        item.myRollList.forEach((itemMR, ir) => {
                            if (ir !== 0) {
                                if (idQ.indexOf(itemMR.id) >= 0) {
                                    item.myRollList.splice(ir, 1);
                                } else {
                                    idQ.push(itemMR.id);
                                }
                            }
                        })
                    })
                    if (isAdd) {
                        listRolls.push({
                            ...todo,
                            number: todo.freight.freightNumber,
                            numChoose: [...todo.numChoose],
                            idChoose: [...todo.idChoose],
                            myRollList: [...todo.myRollList],
                        });
                        // 去重
                        listRolls.forEach(item => {
                            item.idChoose = this.unique(item.idChoose);
                            item.numChoose = this.unique2(item.numChoose);
                            let idQ = [item.myRollList[0].id];
                            item.myRollList.forEach((itemMR, ir) => {
                                if (ir !== 0) {
                                    if (idQ.indexOf(itemMR.id) >= 0) {
                                        item.myRollList.splice(ir, 1);
                                    } else {
                                        idQ.push(itemMR.id);
                                    }
                                }
                            })
                        })
                    }
                });
            }
        });
        const Arr = [];
        listRolls.forEach(todo => {
            Arr.push(JSON.stringify(todo));
        });
        return Arr
    }
    // 环节页面的增加
    newTab(): void {
        // 特殊情况：
        // 1.如果第一环节为双计划，则新增第二环节时，生成第一环节双计划包含的所有轧辊信息；
        // 2.如果新增第二环节为双计划，每次添加计划时均生成第一环节所有轧辊信息，通过手动进行删减。
        const myRolls = this.tabsList[0].rollsList;
        if (myRolls.length >= 1) {
            let listAll = true;
            myRolls.forEach(item => {
                if (item.list.length === 0) {
                    listAll = false
                }
            });
            if (!listAll) {
                this.modalService.confirm({
                    nzTitle: '您还未完善第一环节中的轧辊信息',
                    nzContent: '您还未完善第一环节中的轧辊信息，完善后再添加环节系统将自动为您生成环节轧辊信息',
                    nzOkText: '坚持新增',
                    nzOkType: 'danger',
                    nzOnOk: () => {
                        this.tabsList.push({
                            titleName: '环节',
                            isAdd: true,
                            dataForm: this.fb.array([
                                this.createDataForm()
                            ]),
                            rollsList: [
                                {
                                    list: []
                                }
                            ],
                            deviceDialog: [
                                { show: false }
                            ],
                        });
                    },
                    nzCancelText: '返回添加',
                    nzOnCancel: () => console.log('Cancel')
                });
            } else {
                const listRolls = this.getRollsFormFirstTab();
                if (listRolls.length) {
                    this.tabsList.push({
                        titleName: '环节',
                        isAdd: true,
                        dataForm: this.fb.array([
                            this.createDataForm()
                        ]),
                        rollsList: [
                            {
                                list: []
                            }
                        ],
                        deviceDialog: [
                            { show: false }
                        ],
                    });
                    // 去掉联系
                    listRolls.forEach(iit => {
                        this.tabsList[this.tabsList.length - 1].rollsList[0].list.push(JSON.parse(iit));
                    });
                    // 重新确定谁是最大的辊
                    this.tabsList[this.tabsList.length - 1].rollsList[0].list = this.ComparativeSize(this.tabsList[this.tabsList.length - 1].rollsList[0].list);
                }
            }
        }
    }
    saveSubmitAll() {
        this.modalService.create({
            nzTitle: '确认保存',
            nzContent: '是否确认保存全部计划？',
            nzClosable: false,
            nzOnOk: () => {
                this.isSpinning = true;
                let isSubmit = true;
                const tabsListAdd = [];
                this.tabsList.forEach(tab => {
                    if (tab.isAdd) {
                        tabsListAdd.push(tab);
                    }
                })
                console.log(tabsListAdd);
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < tabsListAdd.length; i++) {
                    const a = this.saveSubmit(tabsListAdd[i], tabsListAdd[i].dataForm.valid)
                    if (!a.isPass) {
                        isSubmit = false;
                        this.isSpinning = false;
                        let titleSname = '';
                        if (this.planOtherInfo.status === 'TO_BE_ADDED') {
                            titleSname = tabsListAdd[i].titleName + (i + 1);
                        } else {
                            titleSname = tabsListAdd[i].tname ? tabsListAdd[i].tname : tabsListAdd[i].titleName + (i + 1);
                        }
                        this.messageService.create('error', titleSname + '内容不全。' + a.error);
                        i += 100;
                    };
                };
                if (isSubmit) {
                    if (this.planOtherInfo.id) {
                        const Arr = [];
                        tabsListAdd.forEach((tab, i) => {
                            if (this.planOtherInfo.status === 'TO_BE_ADDED') {
                                Arr.push({
                                    id: tab.id || null,
                                    planId: this.planOtherInfo.id,
                                    // name: tab.tname ? tab.tname : tab.titleName + ' ' + (i + 1),
                                    name: tab.titleName + ' ' + (i + 1),
                                    details: this.submitDataGoing(tab),
                                    status: tab.status,
                                });
                            } else {
                                Arr.push({
                                    id: tab.id || null,
                                    planId: this.planOtherInfo.id,
                                    name: tab.tname ? tab.tname : tab.titleName + ' ' + (i + 1),
                                    // name: tab.titleName + ' ' + (i + 1),
                                    details: this.submitDataGoing(tab),
                                    status: tab.status,
                                });
                            }
                        });
                        this.arrListHttp = Arr;
                        this.submitArrA(this.arrListHttp);
                    } else {
                        this.httpFunction.addNewPlan().subscribe(data => {
                            this.planOtherInfo = {
                                ...data,
                                planner: {
                                    name: data.plannerName
                                }
                            };
                            if (this.planOtherInfo.technician) {

                            } else {
                                this.planOtherInfo.technician = {
                                    name: '技术员姓名'
                                };
                            }
                            const Arr = [];
                            tabsListAdd.forEach((tab, i) => {
                                Arr.push({
                                    id: tab.id || null,
                                    planId: this.planOtherInfo.id,
                                    name: tab.titleName + ' ' + (i + 1),
                                    status: tab.status,
                                    details: this.submitDataGoing(tab)
                                });
                            });
                            this.arrListHttp = Arr;
                            this.submitArrA(this.arrListHttp);
                        }, error => {
                            this.messageService.create('error', `保存失败， ${error.error.message}`);
                            this.isSpinning = false;
                        });
                    }
                }
            }
        });
    }
    arrListHttp = [];
    // 保存按钮，保存本页-验证必填项
    saveSubmit(tab: FormInfo, data: boolean): MsgCode {
        if (data) {
            let isSubmit = true;
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < tab.rollsList.length; i++) {
                if (tab.rollsList[i].list.length) {
                    // tslint:disable-next-line: prefer-for-of
                    for (let j = 0; j < tab.rollsList[i].list.length; j++) {
                        if (tab.rollsList[i].list[j].numChoose.length) {
                        } else {
                            isSubmit = false;
                            // this.messageService.create('error', '请您检查计划处理轧辊货号是否完整');
                            return {
                                isPass: false,
                                error: '请您检查计划处理轧辊货号是否完整',
                            };
                        }
                    }
                } else {
                    isSubmit = false;
                    // this.messageService.create('error', '请您选择计划处理轧辊');
                    i += 100;
                    return {
                        isPass: false,
                        error: '请您选择计划处理轧辊',
                    };
                }
            }
            if (isSubmit) {
                let isSubmitTime = true;
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < tab.dataForm.length; i++) {
                    const aTime = new Date(tab.dataForm.value[i].startTime);
                    const bTime = new Date(tab.dataForm.value[i].endTime);
                    const nowTime = new Date();
                    const preDate = new Date(nowTime.getTime() - 24 * 60 * 60 * 1000); // 前一天

                    if (aTime.getTime() < preDate.getTime()) {
                        isSubmitTime = false;
                        // this.messageService.create('error', '生产日期请大于当前时间');
                        i += 100;
                        return {
                            isPass: false,
                            error: '生产日期请大于当前时间',
                        };
                    }
                    if (bTime.getTime() < preDate.getTime()) {
                        isSubmitTime = false;
                        // this.messageService.create('error', '预计结束时间请大于当前时间');
                        i += 100;
                        return {
                            isPass: false,
                            error: '预计结束时间请大于当前时间',
                        };
                    }
                    if (aTime.getTime() > bTime.getTime()) {
                        isSubmitTime = false;
                        // this.messageService.create('error', '生产日期请大于预计结束时间');
                        i += 100;
                        return {
                            isPass: false,
                            error: '生产日期请大于预计结束时间',
                        };
                    }
                }
                if (isSubmitTime) {
                    // this.submitDataGoing(tab);
                    return {
                        isPass: true
                    };
                }
            }
        } else {
            // this.messageService.create('error', '请您检查必填项填写');
            return {
                isPass: false,
                error: '请您检查必填项填写',
            };
        }
    }
    // 保存第二步-数据整合组
    submitDataGoing(data: FormInfo): Array<PlanRollsListChoose> {
        const details = [];
        data.dataForm.value.forEach((item, index) => {
            details.push(this.dataProcess(item, data.rollsList[index].list));
        });
        return details;
    }
    // 保存第三步-数据整合-单个
    dataProcess(data: DataFormValue, list: Array<PlanRollsListChoose>): LinkDetailValue {
        const idArr = [];
        if (list && list.length) {
            list.forEach(item => {
                item.idChoose.forEach((item2, i2) => {
                    idArr.push({
                        rollId: item2,
                        status: item.statusChoose[i2] ? item.statusChoose[i2] : 'NOT_PUT'
                    });
                });
            });
        }
        const startTime = new Date(data.startTime);
        const endTime = new Date(data.endTime);
        const val = {
            deviceId: data.deviceId,
            areaId: data.areaId,
            craftId: data.craftId ? data.craftId : null,
            startTime: startTime.getTime(),
            endTime: endTime.getTime(),
            detailRolls: idArr,
            remark: data.remark,
            id: data.id || null,
        };
        return val;
    }
    // 保存第3.5步-创建计划拿id
    getPlanOtherInfo(value: FormInfo, Pid: number, list: Array<LinkDetailValue>): void {
        // 判断有无计划id
        if (Pid) {
            // this.submitHttpFunction(value, Pid, list);
        } else {
            this.httpFunction.addNewPlan().subscribe(data => {
                this.planOtherInfo = {
                    ...data,
                    planner: {
                        name: data.plannerName
                    }
                };
                if (this.planOtherInfo.technician) {

                } else {
                    this.planOtherInfo.technician = {
                        name: '技术员姓名'
                    };
                }
                // this.submitHttpFunction(value, this.planOtherInfo.id, list);
            });
        }
    }
    // 保存第四步-保存环节走接口
    submitHttpFunction(data, i, max): any {
        this.httpFunction.savePlanLink(data).subscribe(success => {
            if (i === max) {
                // 最后一个
                this.messageService.create('success', '保存成功！即将返回列表页面查看');
                this.isSpinning = false;
                const path = localStorage.getItem('deleteRoutePath') || '/chargingPlan/planList/PlanListComponent';
                AppRoutingCache.deleteRouteSnapshot(path);
                this.router.navigate(['/chargingPlan/planList']);
            }
        }, error => {
            this.messageService.create('error', `${data.name}保存失败， ${error.error.message}`);
            this.isSpinning = false;
        });
    }
    submitArrA(list) {
        this.submitArrB(this.arrListHttp[0], 1, this.arrListHttp.length);
    }
    submitArrB(data, i, max) {
        if (this.planOtherInfo.status === 'TO_BE_EXECUTED' || this.planOtherInfo.status === 'EXECUTING') {
            data.updateButton = true;
        }
        this.httpFunction.savePlanLink(data).subscribe(success => {
            if (i === max) {
                // 最后一个
                this.messageService.create('success', '保存成功！即将返回列表页面查看');
                this.isSpinning = false;
                this.arrListHttp = [];
                const path = localStorage.getItem('deleteRoutePath') || '/chargingPlan/planList/PlanListComponent';
                AppRoutingCache.deleteRouteSnapshot(path);
                this.router.navigate(['/chargingPlan/planList']);
            } else {
                this.submitArrB(this.arrListHttp[i], i + 1, max);
            }
        }, error => {
            this.messageService.create('error', `${data.name}保存失败， ${error.error.message}`);
            console.log(1);
            if (i === 1) {
                console.log(2);
                // 第一个没保存成功，不生成
                // 走撤销啦
                this.httpFunction.delPlan(this.planOtherInfo.id).subscribe(success => {
                    console.log(3);
                    this.planOtherInfo = {
                        planner: {
                            name: '调度员姓名',
                        },
                        plannerName: '调度员姓名',
                        technician: {
                            name: '技术员姓名',
                        },
                        status: '',
                    };
                }, error => {
                    this.messageService.create('error', `撤销保存记录失败，${error.error.message}`);
                });
            }
            this.isSpinning = false;
        });
    }
    lookPaidate(): void {
        const { hostname, port } = location;
        const wsUri = `${hostname}:${port}`;
        window.open(`http://${wsUri}/heatTreatment`, '_blank');
    }
    // 追加环节-追加表单
    createDataForm(): FormGroup {
        return this.fb.group({
            startTime: [null, [Validators.required]],
            deviceId: [null, [Validators.required]],
            deviceName: [null],
            endTime: [null, [Validators.required]],
            areaId: [null, [Validators.required]],
            remark: [null],
            id: [null],
            craftName: [null],
            craftId: [null],
            craftNo: [null],
        });
    }
    // 追加环节按钮
    addDataFormOne(data: FormInfo, tabIndex): void {
        let Arr = [];
        console.log(tabIndex);
        if (tabIndex !== 0) {
            // 获取第一环节信息
            const listRolls = this.getRollsFormFirstTab();
            if (listRolls.length) {
                // 去掉联系
                listRolls.forEach(iit => {
                    Arr.push(JSON.parse(iit));
                });
                // 重新确定谁是最大的辊
                Arr = this.ComparativeSize(Arr);
            }
        }
        data.rollsList.push({
            list: Arr
        });
        data.deviceDialog.push({ show: false });
        const arr = data.dataForm as FormArray;
        arr.push(this.createDataForm());
    }
    // 删除追加计划
    delDataFormOne(data: FormInfo, i: number): void {
        this.modalService.create({
            nzTitle: '确认要删除吗？',
            nzContent: '您确认要执行删除本环节追加计划吗？',
            nzClosable: false,
            nzOnOk: () => {
                const arr = data.dataForm as FormArray;
                arr.removeAt(i);
                data.rollsList.splice(i, 1);
                data.deviceDialog.splice(i, 1);
            }
        });
    }
    // 选择辊弹窗
    addFormOne(arr: Array<PlanRollsListChoose>, tab, i): void {
        console.log(arr, tab, i);
        const rollsList = arr;
        const modal = this.modalService.create({
            nzTitle: '添加热处理轧辊',
            nzWidth: '1276px',
            nzComponentParams: {
                rollsList,
                furnacePlanId: this.planOtherInfo.id ? this.planOtherInfo.id : 0
            },
            nzBodyStyle: {
                padding: 0,
            },
            nzContent: AddHeatTreatmentRollComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    disabled: (contentComponentInstance) => !contentComponentInstance.rightChooseList.length,
                    onClick: (contentComponentInstance) => {
                        const cci = contentComponentInstance;
                        // arr = this.ComparativeSize(cci.rightChooseList);


                        tab.rollsList[i].list = this.ComparativeSize(cci.rightChooseList);
                        console.log('all', this.tabsList);
                        modal.destroy();
                    }
                }
            ]
        });
    }
    unique(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }
    unique2(arr) {
        return Array.from(new Set(arr))
    }
    // 辊列表之间的比较大小
    ComparativeSize(data: Array<PlanRollsListChoose>): Array<PlanRollsListChoose> {
        if (data && data.length) {
            let maxData = this.CuttingData(data[0].freight.size);
            data.forEach(item => {
                const a = this.CuttingData(item.freight.size);
                if (maxData < a) {
                    maxData = a;
                }
            });
            data.forEach(item => {
                const b = this.CuttingData(item.freight.size);
                if (maxData === b) {
                    item.freight.isBig = true;
                } else {
                    item.freight.isBig = false;
                }
                item.idChoose = this.unique(item.idChoose);
            });
            return data;
        }
    }
    // 切割‘*’获取最大值
    CuttingData(data: string): number {
        const a = data.split('*');
        const b = Number(a[0]);
        return b;
    }
    // 删除选中辊弹窗
    delTableRolls(data: PlanRollsListChoose, list: Array<PlanRollsListChoose>): void {
        this.modalService.create({
            nzTitle: '确认要删除吗？',
            nzContent: '您目前正在执行删除操作删除内容：货号' + data.number,
            nzClosable: false,
            nzOnOk: () => {
                list.splice(list.indexOf(data), 1);
                list = this.ComparativeSize(list);
            }
        });
    }
    // 编辑
    // 获取详情列表
    getPlanLinkOne(): void {
        this.httpFunction.getPlanLinkOne(this.planOtherInfo.planId).subscribe(data => {
            this.isEdit = true;
            this.planOtherInfo = data;
            const titleNumList = [];
            const AllList = [];

            if (data.links.length) {
                this.tabsList = [];
                data.links.forEach(item => {
                    const Arr = {
                        ...item,
                        // titleName: item.name,
                        titleName: '环节',
                        isAdd: true,
                        status: item.status,
                        dataForm: this.fb.array([]),
                        rollsList: [],
                        deviceDialog: [],
                        tname: item.name
                    };
                    const numArr = item.name.split('环节 ');
                    titleNumList.push(Number(numArr[1]));
                    const formArr = [];
                    item.details.forEach((detail, i) => {
                        // 表单
                        Arr.dataForm.push(this.createDataForm());
                        const val = {
                            startTime: detail.startTime,
                            deviceId: detail.device.id,
                            deviceName: detail.device.name,
                            endTime: detail.endTime,
                            areaId: detail.area.id,
                            remark: detail.remark,
                            id: detail.id,
                            // 工艺
                            craftName: detail.craft ? detail.craft.name : null,
                            craftId: detail.craft ? detail.craft.id : null,
                            craftNo: detail.craft ? detail.craft.craftNo : null,
                        };
                        formArr.push(val);
                        // 列表
                        const alist = [];
                        // 状态列表-该环节是否可改
                        const status1 = [];
                        if (detail.freights && detail.freights.length) {
                            detail.freights.forEach(afreight => {
                                const valto = {
                                    ...afreight,
                                    freight: afreight,
                                    number: afreight.freightNumber,
                                    numChoose: [],
                                    idChoose: [],
                                    statusChoose: [],
                                    myRollList: [],
                                };
                                afreight.detailRolls.forEach(roll => {
                                    valto.numChoose.push(roll.roll.productNo);
                                    valto.idChoose.push(roll.roll.id);
                                    valto.myRollList.push(roll.roll);
                                    valto.statusChoose.push(roll.status);
                                    if (roll.status === 'EXECUTING' || roll.status === 'OUT_FURNACE') {
                                        status1.push(roll);
                                    }
                                });
                                alist.push(valto);
                            });
                        }

                        if (status1 && status1.length) {
                            if (this.planOtherInfo.status === 'EXECUTING' || this.planOtherInfo.status === 'TO_BE_EXECUTED' || this.planOtherInfo.status === 'PLAN_UPDATE') {
                                Arr.isAdd = false;
                            }
                        }
                        Arr.rollsList.push({
                            list: this.ComparativeSize(alist)
                        });
                        Arr.deviceDialog.push({
                            show: false
                        });
                    });
                    Arr.dataForm.patchValue(formArr);
                    AllList.push(Arr);
                });
                // '环节 '
                // tslint:disable-next-line: prefer-for-of
                for (let index = 0; index < Math.max(...titleNumList); index++) {
                    // tslint:disable-next-line: prefer-for-of
                    this.tabsList.push({
                        titleName: '环节 ' + (index + 1),
                        isAdd: true,
                        status: 'TO_BE_ADDED',
                        dataForm: this.fb.array([
                            this.createDataForm()
                        ]),
                        rollsList: [
                            {
                                list: []
                            }
                        ],
                        deviceDialog: [
                            { show: false }
                        ],
                    });
                }
                for (let num = 0; num < titleNumList.length; num++) {
                    this.tabsList[titleNumList[num] - 1] = AllList[num];
                }
            }
        });
    }
    // 选择设备
    deviceDialogClose(data) {
        this.tabsList[data.tadIndex].dataForm.controls[data.formIndex].patchValue({
            deviceId: data.chooseData.id,
            deviceName: data.chooseData.name,
            areaId: data.chooseData.areaId,
        });
        this.tabsList[data.tadIndex].deviceDialog[data.formIndex].show = false;
    }
    myNumber(val: string): number {
        return Number(val);
    }
}
