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
import { SelectCraftComponent } from '../select-craft/select-craft.component';
import { UserService } from '../../../../services/user.service';
import { AppRoutingCache } from 'src/app/app-routing.cache';

export interface MsgCode {
    isPass: boolean;
    error?: string;
}

@Component({
    selector: 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private httpFunction: ChargingPlanService,
        private httpArea: ConfigurationManagementService,
        private messageService: NzMessageService,
        private route: ActivatedRoute,
        public router: Router,
        public user: UserService,
    ) { }
    index = 0;
    tabsList: Array<FormInfo> = [
        {
            titleName: '环节 1',
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
    Tshow = false;
    Pshow = false;
    isEdit = false;
    isSpinning = false;


    ngOnInit() {
        this.user.getCurrentUser().subscribe(data => {
            if (data.role) {
                if (data.role.accesses && data.role.accesses.length) {
                    data.role.accesses.forEach(item => {
                        if (item.value === 'technician') {
                            this.Tshow = true;
                        } else if (item.value === 'planner') {
                            this.Pshow = true;
                        }
                    });
                }
            }
        });
        // 小部分的显示隐藏
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
        this.tabsList.splice(this.tabsList.indexOf(tab), 1);
    }
    // 环节页面的增加
    newTab(): void {
        this.tabsList.push({
            titleName: '环节 ' + (this.tabsList.length + 1),
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
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < tabsListAdd.length; i++) {
                    const a = this.saveSubmit(tabsListAdd[i], tabsListAdd[i].dataForm.valid)
                    if (!a.isPass) {
                        isSubmit = false;
                        this.isSpinning = false;
                        this.messageService.create('error', tabsListAdd[i].titleName + '内容不全。' + a.error);
                        i += 100;
                    };
                };
                if (isSubmit) {
                    const Arr = [];
                    tabsListAdd.forEach(tab => {
                        if (tab.isAdd) {
                            Arr.push({
                                id: tab.id || null,
                                planId: this.planOtherInfo.id,
                                name: tab.titleName,
                                details: this.submitDataGoing(tab)
                            });
                        }
                    });
                    this.arrListHttp = Arr;
                    this.submitArrA(this.arrListHttp);
                    // Arr.forEach((arr, i) => {
                    //     this.submitHttpFunction(arr, i + 1, Arr.length)
                    // });
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
                item.idChoose.forEach(item2 => {
                    idArr.push({
                        rollId: item2,
                        status: 'NOT_PUT'
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
            this.submitHttpFunction(value, Pid, list);
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
                this.submitHttpFunction(value, this.planOtherInfo.id, list);
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
        });
    }
    submitArrA(list) {
        this.submitArrB(this.arrListHttp[0], 1, this.arrListHttp.length);
    }
    submitArrB(data, i, max) {
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
            this.isSpinning = false;
        });
    }
    lookPaidate(): void {
        // alert('新增标签页，热处理过程管理页面');
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
            craftName: [null, [Validators.required]],
            craftId: [null],
            craftNo: [null],
        });
    }
    // 追加环节按钮
    addDataFormOne(data: FormInfo): void {
        data.rollsList.push({
            list: []
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
                        console.log(cci.rightChooseList);
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
                        titleName: item.name,
                        isAdd: true,
                        dataForm: this.fb.array([]),
                        rollsList: [],
                        deviceDialog: [],
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
                        if (status1 && status1.length) {
                            if (this.planOtherInfo.status === 'EXECUTING') {
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
    // 选择工艺弹窗
    openGongYi(form: FormGroup): void {
        const modal = this.modalService.create({
            nzTitle: '选择工艺',
            nzWidth: '851px',
            nzBodyStyle: {
                padding: 0,
            },
            nzContent: SelectCraftComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    disabled: (contentComponentInstance) => !contentComponentInstance.chooseCraft,
                    onClick: (contentComponentInstance) => {
                        const cci = contentComponentInstance;
                        form.patchValue({
                            craftId: cci.chooseCraft.id,
                            craftName: cci.chooseCraft.name,
                            craftNo: cci.chooseCraft.craftNo
                        });
                        modal.destroy();
                    }
                }
            ]
        });
    }
}
