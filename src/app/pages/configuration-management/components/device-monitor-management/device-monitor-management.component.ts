import { Component, OnInit } from '@angular/core';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
// 树控件
import { NzFormatEmitEvent, NzTreeNode, NzContextMenuService } from 'ng-zorro-antd';

// dialog服务式引入
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TypeList, MonitorList } from 'src/app/public/interface/configuration-management';
import { TitleType } from 'src/app/public/components/delong-table/delong-table.component';
import { DeviceMonitorFormComponent } from './device-monitor-form/device-monitor-form.component';
import { DelongTableService } from '../../../../services/delong-table.service';

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
    selector: 'app-device-monitor-management',
    templateUrl: './device-monitor-management.component.html',
    styleUrls: ['./device-monitor-management.component.scss']
})
export class DeviceMonitorManagementComponent implements OnInit {
    tablePadding = 17; // 保持表格宽度的数据
    productTypeList: TypeList;
    // 右侧表格头
    titleList: Array<TitleType> = [
        { name: '创建时间', canSort: false, sortField: 'createdTime', width: "147px" },
        { name: '创建人', canSort: false, sortField: 'createdUserName', width: "60px" },
        { name: '设备名称', canSort: false, sortField: 'name', width: "120px" },
        { name: '设备编号', canSort: false, sortField: 'number', width: "75px" },
        { name: '设备类型', canSort: false, sortField: 'productionTypeName', width: "75px" },
        { name: '所在区域', canSort: false, sortField: 'areaName', width: "110px" },
        { name: '关联设备', canSort: false, sortField: 'productionName', width: "110px" },
        { name: '操作', canSort: false, sortField: 'action', width: "120px", right: "0px" },
    ];
    // 添加/编辑
    editNodeDialog = false;
    editData: {
        parentId?: number,
        typeName: string,
        id?: number,
        isAdd: boolean,
        isType: boolean,
    } = {
            parentId: 0,
            typeName: '',
            id: 0,
            isAdd: true,
            isType: true
        };
    // tabs 2
    activedNode: NzTreeNode;
    nodes: Array<TreeList> = [];
    nodes2: Array<TreeList> = [];

    // 搜索条件
    sendData: {
        nameOrNumber?: string | number,
        typeid?: number,
        areaid?: number,
    } = {
            nameOrNumber: '',
        };
    routerWata = {
        searchParams: {},
        pageNum: 1,
        pageSize: 10,
    };

    constructor(
        public delongTable: DelongTableService<MonitorList>,
        private nzContextMenuService: NzContextMenuService,
        private modalService: NzModalService,
        private messageService: NzMessageService,
        private configurationManagement: ConfigurationManagementService,
    ) { }

    ngOnInit() {
        // 获取树节点
        this.getNodeList();
        this.getNodeAreaList();
        // table-获取数据
        this.delongTable.observeFunction = this.configurationManagement.getMonitorFindList.bind(this.configurationManagement);
    }

    pageChange() {
        this.routerWata = {
            searchParams: this.delongTable.searchParams,
            pageNum: this.delongTable.pageNum,
            pageSize: this.delongTable.pageSize,
        };
    }

    init(val) {
        let data = JSON.parse(val);
        this.delongTable.observeFunction = this.configurationManagement.getMonitorFindList.bind(this.configurationManagement);
        this.delongTable.searchParams = data.searchParams;
        this.delongTable.pageNum = data.pageNum;
        this.delongTable.pageSize = data.pageSize;
        this.delongTable.search();
    }

    // 获取设备类型
    getNodeList(): void {
        this.nodes = [];
        this.configurationManagement.getMonitorTypeList().subscribe(data => {
            let valData = [];
            data.forEach((item, index) => {
                if (item.list.length) {
                    valData = [];
                    item.list.forEach((item1, index1) => {
                        valData.push(this.changeData(item1));
                    });
                } else {
                    valData = [];
                }
                this.nodes.push({
                    title: item.typeName,
                    key: item.id,
                    expanded: index === 0 ? true : false,
                    children: valData
                });
            });
        });
    }
    // 获取设备区域
    getNodeAreaList(): void {
        this.nodes2 = [];
        this.configurationManagement.getProductionAreaList().subscribe(data => {
            data.forEach(item => {
                this.nodes2.push({
                    title: item.areaName,
                    key: item.id,
                    isLeaf: true
                });
            });
        });
    }
    // 树控件加工数据
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
    // 获取table
    getList(): void {
        this.delongTable.searchParams = this.sendData;
        this.delongTable.pageNum = 1;
        this.delongTable.search();
    }



    // 树控件的点击事件
    openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
        // do something if u want
        if (data instanceof NzTreeNode) {
            data.isExpanded = !data.isExpanded;
        } else {
            const node = data.node;
            if (node) {
                node.isExpanded = !node.isExpanded;
            }
        }
    }
    // 类型
    // 树控件的高亮事件-点击触发的地方
    activeNode(data: NzFormatEmitEvent): void {
        // tslint:disable-next-line:no-non-null-assertion
        this.activedNode = data.node!;
        if (this.activedNode.isLeaf) {
            this.sendData.areaid = null;
            this.sendData.typeid = Number(this.activedNode.origin.key);
            this.getList();
        }
    }
    // -
    delNode(data: string): void {
        this.modalService.create({
            nzTitle: '提示',
            nzContent: '确认删除该设备类型吗？',
            nzClosable: false,
            nzOnOk: () => {
                this.configurationManagement.delMonitorType(Number(data)).subscribe(success => {
                    this.messageService.create('success', '删除成功');
                    this.getNodeList();
                }, error => {
                    this.messageService.create('error', `删除失败， ${error.error.message}`);
                });
                // let node = data;
                // node.remove();
            }
        });
    }

    // +
    getNode(data: NzTreeNode): void {
        this.editData = {
            parentId: Number(data.origin.key),
            typeName: '',
            isAdd: true,
            isType: true
        };
        this.editNodeDialog = true;
    }
    // 类型修改
    editNode(data: NzTreeNode): void {
        this.editData = {
            parentId: data.origin.parentId,
            typeName: data.origin.title,
            id: Number(data.origin.key),
            isAdd: false,
            isType: true
        };
        this.editNodeDialog = true;
    }
    // 区域添加
    getNodeArea(data: NzTreeNode): void {
        this.editData = {
            typeName: '',
            isAdd: true,
            isType: false
        };
        this.editNodeDialog = true;
    }
    // 区域修改
    editNodeArea(data: NzTreeNode): void {
        this.editData = {
            typeName: data.origin.title,
            id: Number(data.origin.key),
            isAdd: false,
            isType: false
        };
        this.editNodeDialog = true;
    }

    // 区域
    activeNode2(data: NzFormatEmitEvent): void {
        // tslint:disable-next-line:no-non-null-assertion
        this.activedNode = data.node!;
        if (this.activedNode.isLeaf) {
            this.sendData.typeid = null;
            this.sendData.areaid = Number(this.activedNode.origin.key);
            this.getList();
        }
    }





    // 添加修改点击提交
    handleOk(): void {
        if (this.editData.isType) {
            // 类型
            this.configurationManagement.addMonitorType({
                typeName: this.editData.typeName,
                parentId: this.editData.parentId,
                id: this.editData.id
            }).subscribe(success => {
                this.messageService.create('success', '添加成功');
                this.getNodeList();
                this.editNodeDialog = false;
            }, error => {
                this.messageService.create('error', `添加失败， ${error.error.message}`);
            });
        } else {
            // 区域
            this.configurationManagement.addProductionArea({
                areaName: this.editData.typeName,
                id: this.editData.id
            }).subscribe(success => {
                this.messageService.create('success', `${this.editData.isAdd ? '添加' : '编辑'}成功`);
                this.getNodeAreaList();
                this.editNodeDialog = false;
            }, error => {
                this.messageService.create('error', `${this.editData.isAdd ? '添加' : '编辑'}失败， ${error.error.message}`);
            });
        }
    }
    // 修改关闭
    handleCancel(): void {
        this.editNodeDialog = false;
        this.emptyEditNode();
    }
    // 清空
    emptyEditNode(): void {
        this.editData = {
            typeName: '',
            isAdd: true,
            isType: true,
            parentId: 0
        };
    }
    // 列表
    // 列表删除
    delListData(data: number, listData: MonitorList): void {
        if (listData.production && listData.production.name) {
            this.messageService.create('error', '该监测设备已关联生产设备，不能删除');
        } else {
            this.modalService.create({
                nzTitle: '提示',
                nzContent: '确认删除该数据吗？',
                nzClosable: false,
                nzOnOk: () => {
                    this.configurationManagement.delMonitor(data).subscribe(success => {
                        this.messageService.create('success', '删除成功');
                        this.getList();
                    }, error => {
                        this.messageService.create('error', `删除失败， ${error.error.message}`);
                    });
                }
            });
        }
    }
    // 列表添加
    addListData(): void {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: '添加监测设备',
            nzWidth: '792px',
            nzContent: DeviceMonitorFormComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    loading: () => showload,
                    disabled: (contentComponentInstance) => !contentComponentInstance.dataForm.valid,
                    onClick: (contentComponentInstance) => {
                        showload = true;
                        const cci = contentComponentInstance;
                        this.configurationManagement.addMonitor({
                            name: cci.dataForm.value.name,
                            typeid: cci.dataForm.value.typeid,
                            number: cci.dataForm.value.number,
                            productionManufacturers: cci.dataForm.value.productionManufacturers,
                            responsibleUser: cci.dataForm.value.responsibleUser,
                            areaid: cci.dataForm.value.areaName,
                            jcUuid: cci.dataForm.value.jcUuid,
                            jcAttribute: cci.dataForm.value.jcAttribute,
                        }).subscribe(success => {
                            this.messageService.create('success', '添加成功');
                            this.getList();
                            showload = false;
                            modal.destroy();
                        }, error => {
                            this.messageService.create('error', `添加失败， ${error.error.message}`);
                            showload = false;
                        });
                    }
                }
            ]
        });
    }
    // 修改
    editListData(dataId: MonitorList): void {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: '修改监测设备',
            nzWidth: '792px',
            nzComponentParams: {
                dataId
            },
            nzContent: DeviceMonitorFormComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    loading: () => showload,
                    disabled: (contentComponentInstance) => !contentComponentInstance.dataForm.valid,
                    onClick: (contentComponentInstance) => {
                        showload = true;
                        const cci = contentComponentInstance;
                        this.configurationManagement.addMonitor({
                            id: dataId.id,
                            name: cci.dataForm.value.name,
                            typeid: cci.dataForm.value.typeid,
                            number: cci.dataForm.value.number,
                            productionManufacturers: cci.dataForm.value.productionManufacturers,
                            responsibleUser: cci.dataForm.value.responsibleUser,
                            areaid: dataId.production ? dataId.production.areaId : null,
                            productionId: dataId.production ? dataId.production.id : null,
                            monitorPostion: dataId.monitorPostion,
                            jcUuid: cci.dataForm.value.jcUuid,
                            jcAttribute: cci.dataForm.value.jcAttribute,
                        }).subscribe(success => {
                            this.messageService.create('success', '修改成功');
                            this.getList();
                            showload = false;
                            modal.destroy();
                        }, error => {
                            this.messageService.create('error', `修改失败， ${error.error.message}`);
                            showload = false;
                        });
                    }
                }
            ]
        });
    }
    getIframeHeight() {
        return window.innerHeight - 290 + 'px';
    }
}
