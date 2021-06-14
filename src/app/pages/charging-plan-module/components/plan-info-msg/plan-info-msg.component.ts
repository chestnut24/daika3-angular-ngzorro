import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChargingPlanService } from '../../../../services/charging-plan.service';
import { ActivatedRoute } from '@angular/router';
import { FormInfo } from 'src/app/public/interface/charging-plan';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';

@Component({
    selector: 'app-plan-info-msg',
    templateUrl: './plan-info-msg.component.html',
    styleUrls: ['./plan-info-msg.component.scss']
})
export class PlanInfoMsgComponent implements OnInit {

    index = 0;
    tabsList: Array<FormInfo> = [];
    // 计划存储的信息
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

    constructor(
        private fb: FormBuilder,
        private httpFunction: ChargingPlanService,
        private route: ActivatedRoute,
        private httpArea: ConfigurationManagementService,
    ) {
    }

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
    // 追加环节-追加表单
    createDataForm(): FormGroup {
        return this.fb.group({
            startTime: [null],
            deviceId: [null],
            deviceName: [null],
            endTime: [null],
            areaId: [null],
            areaName: [null],
            remark: [null],
            craftName: [null],
            craftId: [null],
            craftNo: [null],
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
                        isAdd: false,
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
                            areaName: detail.area.areaName,
                            remark: detail.remark,
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
                                };
                                afreight.detailRolls.forEach(roll => {
                                    valto.numChoose.push(roll.roll.productNo);
                                    valto.idChoose.push(roll.roll.id);
                                });
                                alist.push(valto);
                            });
                        }
                        Arr.rollsList.push({
                            list: alist
                        });
                    });
                    Arr.dataForm.patchValue(formArr);
                    AllList.push(Arr);
                    // this.tabsList.push(Arr);
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
    goBack(): void {
        history.go(-1);
    }
    myNumber(val: string): number {
        return Number(val);
    }

}
