import { Component, OnInit } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { Craft, ApprovalStatus } from '../../../../public/interface/configuration-management';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-craft-management',
  templateUrl: './craft-management.component.html',
  styleUrls: ['./craft-management.component.scss']
})
export class CraftManagementComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  titleList: Array<TitleType> = [
    { name: '录入时间', canSort: false, sortField: 'name', width: '147px' },
    { name: '录入人', canSort: false, sortField: 'id', width: '60px' },
    // {name: '工艺名称', canSort: false, sortField: 'phone', width: '200px'},
    { name: '工艺名称', canSort: false, sortField: 'phone', width: '150px' },
    { name: '工艺编号', canSort: false, sortField: 'phone', width: '75px' },
    { name: '材质范围', canSort: false, sortField: 'phone', width: '217px' },
    { name: '规格范围', canSort: false, sortField: 'phone', width: '90px' },
    { name: '硬度要求范围', canSort: false, sortField: 'phone', width: '100px' },
    { name: '校对时间', canSort: false, sortField: 'name', width: '147px' },
    { name: '校对人', canSort: false, sortField: 'id', width: '60px' },
    { name: '状态', canSort: false, sortField: 'phone', width: '60px', right: '120px' },
    { name: '操作', canSort: false, sortField: 'phone', width: '120px', right: '0px' },
  ];
  // 增加“校对人”和“校对时间”字段。
  searchText: string;
  searchSelect: string = '';
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };
  // 检索条件增加 状态检索，状态为启用、待校对、废止。
  statsLIst = [
    { val: '全部', data: '' },
    { val: '启用', data: 'APPROVAL' },
    { val: '待校对', data: 'NOT_APPROVAL' },
    { val: '废止', data: 'CANCELLATION' },
  ]
  constructor(public delongTable: DelongTableService<Craft>,
    private configurationManagement: ConfigurationManagementService,
    private message: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.configurationManagement.getCraftList.bind(this.configurationManagement);
    this.delongTable.searchParams = { searchText: this.searchText, approvalStatus: this.searchSelect };
  }


  init(val) {
    let data = JSON.parse(val);
    this.delongTable.observeFunction = this.configurationManagement.getCraftList.bind(this.configurationManagement);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  pageChange() {
    this.routerWata = {
      searchParams: this.delongTable.searchParams,
      pageNum: this.delongTable.pageNum,
      pageSize: this.delongTable.pageSize,
    };
  }

  searchTextChange(): void {
    this.delongTable.searchParams = { searchText: this.searchText, approvalStatus: this.searchSelect };
    this.delongTable.search();
  }

  deleteCraft(id: string): void {
    const modal = this.modalService.confirm({
      nzTitle: `删除工艺`,
      nzContent: `工艺信息删除后将不可恢复`,
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.configurationManagement.deleteCraft(id).subscribe(data => {
          this.message.success('删除成功');
          this.delongTable.search();
        }, error => {
          this.message.error(`删除失败 ${error.error.message}`);
        });
      }
    });
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
  // saveCraftApproval
  deleteCraftF(id: number): void {
    const modal = this.modalService.confirm({
      nzTitle: `废止工艺`,
      nzContent: `工艺信息废止后将不可恢复`,
      nzOkText: '废止',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.configurationManagement.saveCraftApproval({
          craftId: id,
          result: ApprovalStatus.CANCELLATION, // 审批结果
          comments: '申请废止',
          stage: '废止',
        }).subscribe(data => {
          this.message.success('废止成功');
          this.delongTable.search();
        }, error => {
          this.message.error(`废止失败 ${error.error.message}`);
        });
      }
    });
  }

}
