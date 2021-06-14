import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { group } from '@angular/animations';

import { ConfigurationManagementService } from '../../../../../services/configuration-management.service';
import {
    AreaList, TypeList, MonitorList,
    ProductionFindRelevance, DeviceProductionList,
    DeviceBindingMonitorList, TemperatureList
} from 'src/app/public/interface/configuration-management';

@Component({
    selector: 'app-device-product-form',
    templateUrl: './device-product-form.component.html',
    styleUrls: ['./device-product-form.component.scss']
})
export class DeviceProductFormComponent implements OnInit {

    @Input() dataId: DeviceProductionList;
    dataForm: FormGroup;
    typeList: Array<TypeList> = [];
    areaList: Array<AreaList> = [];
    monitorList: Array<ProductionFindRelevance> = [];
    monitorListAll: Array<MonitorList> = [];
    // 是否新增状态
    isAdd = true;

    get ListFurnaceTemperature() {
        return this.dataForm.get('ListFurnaceTemperature') as FormArray;
    }
    get MillRollTemperature() {
        return this.dataForm.get('millRollTemperature') as FormArray;
    }
    constructor(
        private fb: FormBuilder,
        private deviceService: ConfigurationManagementService,
    ) {
        this.dataForm = this.fb.group(
            {
                // 基本信息
                name: [null, [Validators.required]],
                number: [null, [Validators.required]],
                typeid: [null, [Validators.required]],
                productionManufacturers: [null],
                responsibleUser: [null],
                jcUuid: [null],
                jcAttribute: [null],
                areaid: [null, [Validators.required]],
                // 相关设备-炉温
                ListFurnaceTemperature: this.fb.array([
                    this.createForm()
                ]),
                // 相关设备-辊温
                millRollTemperature: this.fb.array([
                    this.createForm()
                ])
            }
        );
    }

    ngOnInit() {
        this.getProductType();
        this.getProductArea();
        this.getMonitorList();
        if (this.dataId) {
            this.getInfo(this.dataId);
            this.isAdd = false;
            this.getMonitorListAll();
        }
    }

    // 获取设备类型
    getProductType(): void {
        this.deviceService.getProductionTypeList().subscribe(data => {
            this.typeList = data;
        });
    }
    // 获取区域
    getProductArea(): void {
        this.deviceService.getProductionAreaList().subscribe(data => {
            this.areaList = data;
        });
    }
    // 获取监测设备-未绑定的
    getMonitorList(): void {
        this.deviceService.getMonitorFindListOne().subscribe(data => {
            this.monitorList = data;
            this.monitorList.forEach(item => {
                item.isHide = false;
            });
        });
    }
    // 未绑定设备在本页选中后不显示
    isNotSelected(valueA: Array<AbstractControl>, valueB: Array<AbstractControl>): void {
        let Arr = [];
        valueA.forEach(item => {
            Arr = [
                ...Arr,
                ...item.value.monitorId
            ];
        });
        valueB.forEach(item => {
            Arr = [
                ...Arr,
                ...item.value.monitorId
            ];
        });
        this.monitorList.forEach(item => {
            item.isHide = false;
            Arr.forEach(data => {
                if (item.id === data) {
                    item.isHide = true;
                }
            });
        });
    }
    // 获取监测设备-全部
    getMonitorListAll(): void {
        this.deviceService.getMonitorFindList({
            pageNum: '0',
            pageSize: '99999'
        }).subscribe(data => {
            this.monitorListAll = data.content;
        });
    }
    // 编辑时数据处理
    getInfo(data: DeviceProductionList): void {
        let val: any;
        val = data;
        val = {
            ...val,
            typeid: data.typeId,
            areaid: data.areaId,
            productionManufacturers: data.manufacturer,
        };
        val.ListFurnaceTemperature = this.TemperatureDataProcessing(data.monitorList, 'FURNACE_TEMPERATURE');
        for (let i = 0; i < val.ListFurnaceTemperature.length - 1; i++) {
            this.addFormOne();
        }
        val.millRollTemperature = this.TemperatureDataProcessing(data.monitorList, 'ROLL_TEMPERATURE');
        for (let i = 0; i < val.millRollTemperature.length - 1; i++) {
            this.addFormTwo();
        }
        this.dataForm.patchValue(val);
    }
    TemperatureDataProcessing(data: Array<DeviceBindingMonitorList>, name: string): TemperatureList | Array<[]> {
        const lftArr = [];
        if (data && data.length) {
            data.forEach(item1 => {
                if (item1.type === name) {
                    lftArr.push(item1);
                }
            });
            let valArr = [];
            if (lftArr.length) {
                const obj = {};
                lftArr.forEach(item => {
                    if (!obj[item.monitorPostion]) {
                        obj[item.monitorPostion] = [item.id];
                    } else {
                        obj[item.monitorPostion].push(item.id);
                    }
                });
                valArr = Object.keys(obj).map(item => {
                    return {
                        monitorId: obj[item],
                        monitorName: item
                    };
                });
                return valArr;
            } else {
                return [];
            }
        } else {
            return [];
        }
    }
    // 添加表单
    createForm(): FormGroup {
        return this.fb.group({
            monitorName: [null, [Validators.required]],
            monitorId: [[], [Validators.required]],
        });
    }
    // 炉温+-
    addFormOne(): void {
        const arr = this.dataForm.get('ListFurnaceTemperature') as FormArray;
        arr.push(this.createForm());
    }
    delFormOne(i): void {
        const arr = this.dataForm.get('ListFurnaceTemperature') as FormArray;
        arr.removeAt(i);
    }
    // 辊温+-
    addFormTwo(): void {
        const arr = this.dataForm.get('millRollTemperature') as FormArray;
        arr.push(this.createForm());
    }
    delFormTwo(i): void {
        const arr = this.dataForm.get('millRollTemperature') as FormArray;
        arr.removeAt(i);
    }
    getNumber(i: number): number {
        return Number(i);
    }
}
