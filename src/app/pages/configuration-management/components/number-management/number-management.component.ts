import { Component, OnInit } from '@angular/core';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { DelongTableService } from '../../../../services/delong-table.service';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { Freight } from '../../../../public/interface/configuration-management';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AddFreightComponent } from './component/add-freight/add-freight.component';

@Component({
  selector: 'app-number-management',
  templateUrl: './number-management.component.html',
  styleUrls: ['./number-management.component.scss']
})
export class NumberManagementComponent implements OnInit {

  constructor(public delongTable: DelongTableService<Freight>,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private configurationManagement: ConfigurationManagementService
  ) { }
  // 868 + 1088
  titleList: Array<TitleType> = [
    { name: '创建时间', canSort: false, sortField: 'createdDt', width: "147px" },
    { name: '创建人', canSort: false, sortField: 'createdBy', width: "60px" },
    { name: '货号', canSort: false, sortField: 'freightNumber', width: "100px" },
    { name: '材质', canSort: false, sortField: 'material', width: "70px" },
    { name: '材质代码', canSort: false, sortField: 'materialCode', width: "81px" },
    { name: '尺寸(mm)', canSort: false, sortField: 'netWeight', width: "120px" },
    { name: '净重(t)', canSort: false, sortField: 'size', width: "70px" },
    { name: '辊身硬度要求', canSort: false, sortField: 'bodyHardness', width: "110px" },
    { name: '辊颈硬度要求', canSort: false, sortField: 'neckHardness', width: "110px" },
    { name: '生产单位', canSort: false, sortField: 'productionUnit', width: "70px" },
    { name: '用户信息', canSort: false, sortField: 'client', width: "75px" },
    { name: '操作', canSort: false, sortField: '', width: "50px", right: '0px' },
  ];
  searchText = '';
  text;
  pageNum = 1;
  pageSize = 10;
  tablePadding = 17; // 保持表格宽度的数据
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };

  ngOnInit() {
    this.delongTable.observeFunction = this.configurationManagement.inquireFreight.bind(this.configurationManagement);
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
    this.delongTable.observeFunction = this.configurationManagement.inquireFreight.bind(this.configurationManagement);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  deleteFreight(id): void { // 删除货号
    const deleteModal = this.modalService.create({
      nzTitle: '删除',
      nzContent: '是否删除该货号信息？',
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => deleteModal.destroy()
        },
        {
          label: '确定',
          shape: 'primary',
          onClick: () => {
            deleteModal.destroy();
            this.configurationManagement.deleteFreight(id).subscribe(
              success => {
                this.messageService.success('删除成功');
                this.delongTable.search();
              }, error => {
                this.messageService.error('删除失败');
                this.delongTable.search();
              }
            );
          }
        },
      ],
    });
  }
  searchClick(): void { // 查询货号
    this.delongTable.searchParams = { freightNumber: this.searchText }; // 使用 delongTable 中的封装方法 searchParams 是查询的参数
    this.delongTable.pageNum = 1;
    this.delongTable.search(); // search() 查询方法
  }
  modifyFreight(data): void { // 修改货号
    this.creatFreightModel('修改货号', data);
  }
  checkResume(): void {
    alert('查看轧辊履历');
  }
  addFreight(): void { // 新增货号
    this.creatFreightModel('新增货号', {
      id: null,
      freightNumber: null,
      material: null,
      materialCode: null,
      size: null,
      netWeight: null,
      productionUnit: null,
      client: null,
      bodyHardness: null,
      neckHardness: null,
    });
  }
  creatFreightModel(title: string, freight: Freight): void { // 弹出框，新增和修改公用一个
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '700px',
      nzComponentParams: {
        freight,
      },
      nzContent: AddFreightComponent,
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
          disabled: (contentComponentInstance) => !contentComponentInstance.freightForm.valid,
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            this.configurationManagement.saveFreight({
              id: freight.id,
              freightNumber: cci.freightForm.value.freightNumber,
              material: cci.freightForm.value.material,
              materialCode: cci.freightForm.value.materialCode,
              size: cci.freightForm.value.size,
              netWeight: cci.freightForm.value.netWeight,
              productionUnit: cci.freightForm.value.productionUnit,
              client: cci.freightForm.value.client,
              bodyHardness: cci.freightForm.value.bodyHardness,
              neckHardness: cci.freightForm.value.neckHardness,
            }).subscribe(success => {
              this.messageService.create('success', `${title}成功`);
              this.delongTable.settingInit();
              modal.destroy();
              showload = false;
            }, error => {
              this.messageService.create('error', `${title}失败 ${error.error.message}`);
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
