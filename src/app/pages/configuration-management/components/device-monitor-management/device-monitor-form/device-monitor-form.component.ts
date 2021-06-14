import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { group } from '@angular/animations';

import { ConfigurationManagementService } from '../../../../../services/configuration-management.service';
import { AreaList, TypeList, MonitorList } from 'src/app/public/interface/configuration-management';

// Cascader级联选择
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
// 组件第二层第三层
export interface TreeList {
    title: string; // 展示的名字
    key: number;   // 自己的id
    isLeaf?: boolean;   // 是不是子节点
    parentId?: number;  // 父组件id
    children?: Array<TreeList>;  // 子节点
    expanded?: boolean; // 是否展开
    id?: number;
    typeName?: string;
}

@Component({
    selector: 'app-device-monitor-form',
    templateUrl: './device-monitor-form.component.html',
    styleUrls: ['./device-monitor-form.component.scss']
})
export class DeviceMonitorFormComponent implements OnInit {

    @Input() dataId: MonitorList;
    dataForm: FormGroup;

    deviceList = [
        { id: 1, name: '设备1' },
        { id: 2, name: '设备2' },
        { id: 3, name: '设备3' },
        { id: 4, name: '设备4' }
    ];

    typeList: Array<any> = [];
    areaList: Array<AreaList> = [];
    // 展示生产设备数据
    showData: Array<{
        name: string,
        type: string,
        number: string,
    }> = [];

    nzOptions: NzCascaderOption[] = this.typeList;

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
                typeIdArr: [null, [Validators.required]],
                productionManufacturers: [null],
                responsibleUser: [null],
                areaName: [null],
                jcUuid: [null],
                jcAttribute: [null],
            }
        );
    }

    ngOnInit() {
        // 获取设备类型
        this.getProductType();
    }


    getProductType(): void {
        this.deviceService.getMonitorTypeList().subscribe(data => {
            // this.typeList = data;
            let valData = [];
            data.forEach((item, index) => {
                if (item.list && item.list.length) {
                    valData = [];
                    item.list.forEach((item1, index1) => {
                        valData.push(this.changeData(item1));
                    });
                }
                this.typeList.push({
                    title: item.typeName,
                    key: item.id,
                    children: valData
                });
            });
            this.nzOptions = this.typeList;
            // 初始化表单数据
            if (this.dataId) {
                this.getInfo(this.dataId);
            } else {

            }
        });
    }
    changeData(data: TypeList): TreeList {
        let returnData;
        const val = {
            title: '1',
            key: 0,
            isLeaf: true,
            parentId: 0,
            children: [],
        };
        if (data.list && data.list.length) {
            val.title = data.typeName;
            val.key = data.id;
            val.parentId = data.parentId;
            val.isLeaf = false;

            const Arr = [];
            data.list.forEach(item1 => {
                Arr.push(this.changeData(item1));
            });
            val.children = Arr;
            returnData = val;
        } else {
            val.title = data.typeName;
            val.key = data.id;
            val.parentId = data.parentId;
            returnData = val;
        }
        return returnData;
    }
    getInfo(id: MonitorList): void {
        const Arr = this.getIdProcessArrId(id.typeid);
        this.dataForm.patchValue({
            ...id,
            areaName: id.production ? id.production.productionArea.areaName : '',
            typeIdArr: Arr
        });
        if (id.production) {
            this.showData.push({
                name: id.production.name,
                type: id.production.productionType.typeName,
                number: id.production.number,
            });
        }


    }
    // 根据底层id获取整组id
    getIdProcessArrId(id: number): Array<number> {
        let Arr = [];
        if (this.typeList && this.typeList.length) {
            Arr = this.changeArrId(id, this.typeList);
        } else {
        }
        return Arr;
    }
    changeArrId(Did: number, list): Array<number> {
        let array = [];
        // tslint:disable-next-line: no-shadowed-variable
        function findId(id: number, typeList, arr): void {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < typeList.length; i++) {
                arr.push(typeList[i].key);
                if (typeList[i].key === id) {
                    array = [...arr];
                    break;
                } else if (typeList[i].children && typeList[i].children.length) {
                    findId(id, typeList[i].children, arr);
                }
                arr.pop();
            }
        }
        findId(Did, list, []);
        return array;
    }
    onChanges(values: string[]): void {
        const Arr = values.slice(-1);
        this.dataForm.patchValue({
            typeid: Arr[0]
        });
    }


}
