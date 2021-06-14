import { Component, OnInit, Input } from '@angular/core';
import { ChargingPlanService } from 'src/app/services/charging-plan.service';
import { TitleType } from 'src/app/public/components/delong-table/delong-table.component';
import { PlanRollsList, PlanRollsListChoose, PlanRollsListHT } from 'src/app/public/interface/charging-plan';
import { NzMessageService } from 'ng-zorro-antd';



@Component({
    selector: 'app-add-heat-treatment-roll',
    templateUrl: './add-heat-treatment-roll.component.html',
    styleUrls: ['./add-heat-treatment-roll.component.scss']
})
export class AddHeatTreatmentRollComponent implements OnInit {
    @Input() rollsList: Array<PlanRollsListChoose>;
    @Input() furnacePlanId: number;

    tablePadding = 17; // 保持表格宽度的数据

    titleList: Array<TitleType> = [
        { name: '热前质检时间', canSort: false, sortField: 'createdTime' }, // 空
        { name: '货号', canSort: false, sortField: 'freight_number' },
        { name: '生产号', canSort: false, sortField: 'productNo' },
        { name: '尺寸(mm)', canSort: false, sortField: 'size' },
        { name: '材质', canSort: false, sortField: 'material' },
        { name: '材质代码', canSort: false, sortField: 'material_code' },
        { name: '毛坯辊', canSort: false, sortField: 'isBlank' },
        { name: '其他', canSort: false, sortField: 'remark' },
        { name: '操作', canSort: false, sortField: 'action' },
    ];
    leftRollsList: Array<PlanRollsListHT> = [];
    sendData: {
        freightNumber?: string;
        productNo?: string;
    } = {
            freightNumber: '',
            productNo: '',
        };


    rightChooseList: Array<PlanRollsListChoose>;


    constructor(
        public chargingPlanService: ChargingPlanService,
        private messageService: NzMessageService,
    ) { }

    ngOnInit() {
        this.rightChooseList = this.rollsList || [];
        this.getList();
    }


    // 单个生产号的删除
    delList(data: PlanRollsListChoose, list: Array<PlanRollsListChoose>): void {
        list.splice(list.indexOf(data), 1);
    }
    // 选项框中没有选中生产号，货号整体删除
    selectChange(data: string[], i: number) {
        if (data && data.length) {
            let idQI = 0;
            this.rightChooseList[i].myRollList.forEach((item, ir) => {
                if (data.indexOf(item.productNo) >= 0) {

                } else {
                    idQI = this.rightChooseList[i].idChoose.indexOf(item.id);
                    if (idQI >= 0) {
                        this.rightChooseList[i].idChoose.splice(this.rightChooseList[i].idChoose.indexOf(item.id), 1);
                        this.rightChooseList[i].statusChoose.splice(this.rightChooseList[i].idChoose.indexOf(item.id), 1);
                        this.rightChooseList[i].myRollList.splice(idQI, 1);
                    }
                }
            })
        } else {
            this.rightChooseList.splice(i, 1);
        }
    }
    // 整个货号的删除
    delBanner(data: PlanRollsListChoose): void {
        this.rightChooseList.splice(this.rightChooseList.indexOf(data), 1);
    }
    // 获取热辊列表
    getList(): void {
        this.chargingPlanService.getRollsList(this.sendData.freightNumber, this.sendData.productNo, this.furnacePlanId).subscribe(data => {
            this.leftRollsList = [];
            if (data.data && data.data.length) {
                data.data.forEach(item => {
                    //     if (item.beforeQualityCheck && item.beforeQualityCheck.result === 'OK') {
                    //         this.leftRollsList.push(item);
                    //     } else if (item.beforeQualityCheck && item.beforeQualityCheck.result === 'IGNORE') {
                    //         this.leftRollsList.push(item);
                    //     } else if (item.beforeQualityCheck == null) {
                    //         this.leftRollsList.push(item);
                    //     }
                    // item.isBlank = { 1: 'YES', 0: 'NO' }[item.isBlank];
                    item.isBlank = { 1: 'NO', 0: 'YES' }[item.isBlank];
                });
                this.leftRollsList = data.data;
            }
        });
    }
    // 添加进右侧列表
    addRightList(data: PlanRollsListHT): void {
        let isAdd = true;
        this.rightChooseList.forEach(item => {
            // if (item.number === data.freight.freightNumber) {
            if (item.number === data.freightNumber) {
                isAdd = false;
                let isNumAdd = true;
                item.numChoose.forEach(item2 => {
                    if (item2 === data.productNo) {
                        isNumAdd = false;
                        this.messageService.create('error', '已添加入右侧列表');
                    }
                });
                if (isNumAdd) {
                    item.numChoose.push(data.productNo);
                    item.idChoose.push(data.id);
                    item.statusChoose.push('NOT_PUT');
                    item.myRollList.push(data);
                }
            }
        });
        if (isAdd) {
            this.rightChooseList.push({
                ...data,
                freight: {
                    id: data.id,
                    freightNumber: data.freightNumber,
                    material: data.material,
                    materialCode: data.materialCode,
                    size: data.size,
                    netWeight: data.netWeight,
                },
                number: data.freightNumber,
                numChoose: [data.productNo],
                idChoose: [data.id],
                statusChoose: ['NOT_PUT'],
                myRollList: [data],
            });
            this.rightChooseList.forEach(item => {
                item.idChoose = this.unique(item.idChoose);
            })
        }
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
}
