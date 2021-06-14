import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChargingPlanService } from 'src/app/services/charging-plan.service';
import { PlanRollsList } from 'src/app/public/interface/charging-plan';
import { TypeList, DeviceProductionList } from 'src/app/public/interface/configuration-management';
import { ConfigurationManagementService } from 'src/app/services/configuration-management.service';

export interface PlanRollsListChoose extends PlanRollsList {
    numChoose?: Array<number | string>;
    idChoose?: Array<number | string>;
    number?: string;
}

@Component({
    selector: 'app-add-device-choose',
    templateUrl: './add-device-choose.component.html',
    styleUrls: ['./add-device-choose.component.scss']
})
export class AddDeviceChooseComponent implements OnInit {
    @Input() formIndex: number;
    @Input() tadIndex: number;
    @Output() notify = new EventEmitter();

    deviceType: Array<TypeList> = [];
    leftChoose: number;
    deviceList: Array<DeviceProductionList> = [];
    rightChoose: number;
    chooseData: DeviceProductionList;



    constructor(
        public chargingPlanService: ChargingPlanService,
        private configurationManagement: ConfigurationManagementService,
    ) { }

    ngOnInit() {
        this.getNodeList();
    }

    // 获取设备类型
    getNodeList(): void {
        this.deviceType = [];
        this.configurationManagement.getProductionTypeList().subscribe(data => {
            this.deviceType = data;
        });
    }
    // 选择type
    clickType(val: TypeList): void {
        this.leftChoose = val.id;
        this.getDeviceList(val.id);
        this.rightChoose = null;
        this.chooseData = null;
    }
    // 获取设备列表
    getDeviceList(id: number): void {
        this.configurationManagement.getProductFindList({
            pageNum: '0',
            pageSize: '99999',
            typeid: id.toString()
        }).subscribe(data => {
            this.deviceList = data.content;
        });
    }
    // 选择列表项
    clickList(val: DeviceProductionList): void {
        this.rightChoose = val.id;
        this.chooseData = val;
        // this.formIndex,this.tadIndex,this.chooseData
        this.notify.emit({
            formIndex: this.formIndex,
            tadIndex: this.tadIndex,
            chooseData: this.chooseData,
        });
    }
    getData(): DeviceProductionList {
        return this.chooseData;
    }
}
