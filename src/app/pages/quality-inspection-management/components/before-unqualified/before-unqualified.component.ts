import { Component, OnInit } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { SelfCheck } from '../../../../public/interface/quality-inspection-management';
import { QualityInspectionManagementService } from '../../../../services/quality-inspection-management.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { QualityResultModalComponent } from '../quality-result-modal/quality-result-modal.component';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { QualityInspectionApprovalComponent } from '../quality-inspection-approval/quality-inspection-approval.component';
import { SelfTestModalComponent } from '../self-test-modal/self-test-modal.component';

@Component({
  selector: 'app-before-unqualified',
  templateUrl: './before-unqualified.component.html',
  styleUrls: ['./before-unqualified.component.scss']
})
export class BeforeUnqualifiedComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  titleList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: 'name', width: '147px' },
    { name: '货号', canSort: false, sortField: 'id', width: '100px' },
    { name: '生产号', canSort: false, sortField: 'phone', width: '60px' },
    { name: '尺寸(mm)', canSort: false, sortField: 'phone', width: '120px' },
    { name: '净重(t)', canSort: false, sortField: 'phone', width: '60px' },
    { name: '质检人', canSort: false, sortField: 'phone', width: '60px' },
    { name: this.qualityInspectionManagement.getCurrentUrl().includes('before') ? '热前自检' : '热后自检', canSort: false, sortField: 'phone', width: '110px' },
    { name: this.qualityInspectionManagement.getCurrentUrl().includes('before') ? '热前质检' : '热后质检', canSort: false, sortField: 'phone', width: '110px' },
    { name: '操作', canSort: false, sortField: 'phone', width: '110px', right: '80px' },
    { name: '履历', canSort: false, sortField: 'phone', width: '80px', right: '0px' },
  ];
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };
  constructor(public delongTable: DelongTableService<SelfCheck>,
    private qualityInspectionManagement: QualityInspectionManagementService,
    private message: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit() {
    if (this.qualityInspectionManagement.getCurrentUrl().includes('before')) {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeNgList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterNgList.bind(this.qualityInspectionManagement);
    }
  }
  init(val) {
    let data = JSON.parse(val);
    if (this.qualityInspectionManagement.getCurrentUrl().includes('before')) {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeNgList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterNgList.bind(this.qualityInspectionManagement);
    }
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
  qualityResult(data: SelfCheck): void {
    const modal = this.modalService.create({
      nzTitle: '质检结果',
      nzWidth: '700px',
      nzComponentParams: { data },
      nzContent: QualityResultModalComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
      ]
    });
  }
  ngCheckResult(data: SelfCheck): void {
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: '质检审批',
      nzWidth: '700px',
      nzComponentParams: { data },
      nzContent: QualityInspectionApprovalComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确定',
          shape: 'primary',
          loading: () => showload,
          show: (cci) => cci.data.ngCheck.result === 'NOT_DEAL',
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            cci.save().subscribe(() => {
              this.message.success('保存成功');
              this.delongTable.settingInit();
              showload = false;
              modal.destroy();
            }, error => {
              this.message.error(`保存失败 ${error.error.message}`);
              showload = false;
            });
          }
        },
      ]
    });
  }

  selfTest(data: SelfCheck): void {
    const modal = this.modalService.create({
      nzTitle: '自检结果',
      nzWidth: '850px',
      nzComponentParams: { data },
      nzContent: SelfTestModalComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
      ]
    });
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
}
