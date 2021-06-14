import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ChargingPlanService } from '../../../../services/charging-plan.service';
import { SelectCraftComponent } from '../select-craft/select-craft.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInfo, PlanRollsListChoose, LinkDetailValue, DataFormValue } from 'src/app/public/interface/charging-plan';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { AppRoutingCache } from 'src/app/app-routing.cache';

export interface MsgCode {
    isPass: boolean;
    error?: string;
}

@Component({
    selector: 'app-add-plan-craft',
    templateUrl: './add-plan-craft.component.html',
    styleUrls: ['./add-plan-craft.component.scss']
})
export class AddPlanCraftComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private httpFunction: ChargingPlanService,
        private httpArea: ConfigurationManagementService,
        private messageService: NzMessageService,
        private route: ActivatedRoute,
        private router: Router,
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
        }
    ];
    // 新增的计划存储的信息
    planOtherInfo: any = {
        planner: {
            name: '调度员姓名',
        },
        technician: {
            name: '技术员姓名',
        },
        status: '',
    };
    areaList = [];
    isSpinning = false;

    ngOnInit() {
        this.getAreaList();
        this.route.paramMap.subscribe(params => {
            this.planOtherInfo.planId = Number(params.get('fid'));
        });
        if (this.planOtherInfo.planId) {
            this.getPlanLinkOne();
        }
    }

    // 选择区域
    getAreaList(): void {
        this.httpArea.getProductionAreaList().subscribe(data => {
            this.areaList = data;
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
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < this.tabsList.length; i++) {
                    const a = this.saveSubmit(this.tabsList[i], this.tabsList[i].dataForm.valid)
                    if (!a.isPass) {
                        isSubmit = false;
                        this.isSpinning = false;
                        this.messageService.create('error', this.tabsList[i].titleName + '内容不全。' + a.error);
                        i += 100;
                    };
                };
                if (isSubmit) {
                    // 数据处理
                    const Arr = [];
                    this.tabsList.forEach(tab => {
                        Arr.push({
                            id: tab.id || null,
                            planId: this.planOtherInfo.id,
                            name: tab.titleName,
                            details: this.submitDataGoing(tab)
                        });
                    });
                    Arr.forEach((arr, i) => {
                        this.submitHttpFunction(arr, i + 1, Arr.length)
                    });
                }
            }
        });
    }
    // 保存按钮，保存本页
    saveSubmit(tab: FormInfo, data: boolean): MsgCode {
        if (data) {
            // this.submitDataGoing(tab);
            return {
                isPass: true
            };
        } else {
            return {
                isPass: false,
                error: '请您检查必填项填写',
            };
            // this.messageService.create('error', '请您检查必填项填写');
        }
    }
    // 保存第二步-数据整合组
    submitDataGoing(data: FormInfo): Array<PlanRollsListChoose> {
        const details = [];
        data.dataForm.value.forEach((item, index) => {
            details.push(this.dataProcess(item, data.rollsList[index].list));
        });
        return details;
        // this.submitHttpFunction(data, this.planOtherInfo.id, details);
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
            craftId: data.craftId,
            startTime: startTime.getTime(),
            endTime: endTime.getTime(),
            detailRolls: idArr,
            remark: data.remark,
            id: data.id || null,
        };
        return val;
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
    // submitHttpFunction(data: FormInfo, Pid: number, list: Array<LinkDetailValue>): void {
    //     this.httpFunction.savePlanLink({
    //         id: data.id || null,
    //         planId: Pid,
    //         name: data.titleName,
    //         details: list
    //     }).subscribe(success => {
    //         data.isAdd = false;
    //         this.modalService.create({
    //             nzTitle: '保存成功！',
    //             nzContent: '是否立即返回列表查看计划？',
    //             nzClosable: false,
    //             nzOnOk: () => {
    //                 this.router.navigate(['/chargingPlan/planList']);
    //             }
    //         });
    //     }, error => {
    //         this.messageService.create('error', `保存失败， ${error.error.message}`);
    //     });
    // }
    // 追加环节-追加表单
    createDataForm(): FormGroup {
        return this.fb.group({
            startTime: [null],
            deviceId: [null],
            deviceName: [null],
            endTime: [null],
            areaId: [null],
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
        const arr = data.dataForm as FormArray;
        arr.push(this.createDataForm());
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

    // 编辑
    // 获取详情列表
    getPlanLinkOne(): void {
        this.httpFunction.getPlanLinkOne(this.planOtherInfo.planId).subscribe(data => {
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
                    };
                    const numArr = item.name.split('环节 ');
                    titleNumList.push(Number(numArr[1]));
                    const formArr = [];
                    const listArr = [];
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
                console.log(this.tabsList);
            } else {

            }
        });
    }
    myNumber(val: string): number {
        return Number(val);
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


}
