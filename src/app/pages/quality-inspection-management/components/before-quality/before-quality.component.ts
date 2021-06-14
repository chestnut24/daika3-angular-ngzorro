import { Component, OnInit } from '@angular/core';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { DelongTableService } from '../../../../services/delong-table.service';
import {
  BeforeQualityCheck,
  QualityInspectionResult,
  SelfCheck
} from '../../../../public/interface/quality-inspection-management';
import { QualityInspectionManagementService } from '../../../../services/quality-inspection-management.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Craft } from '../../../../public/interface/configuration-management';
import { QualityResultModalComponent } from '../quality-result-modal/quality-result-modal.component';

@Component({
  selector: 'app-before-quality',
  templateUrl: './before-quality.component.html',
  styleUrls: ['./before-quality.component.scss']
})
export class BeforeQualityComponent implements OnInit {

  tablePadding = 17; // 保持表格宽度的数据
  titleList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: 'name', width: '147px' },
    { name: '货号', canSort: false, sortField: 'id', width: '100px' },
    { name: '生产号', canSort: false, sortField: 'phone', width: '60px' },
    { name: '材质', canSort: false, sortField: 'phone', width: '81px' },
    { name: '材质代码', canSort: false, sortField: 'phone', width: '75px' },
    { name: '尺寸(mm)', canSort: false, sortField: 'phone', width: '120px' },
    { name: '净重(t)', canSort: false, sortField: 'phone', width: '60px' },
    { name: '化学', canSort: false, sortField: 'phone', width: '60px' },
    { name: '金相', canSort: false, sortField: 'phone', width: '60px' },
    { name: '探伤', canSort: false, sortField: 'phone', width: '60px' },
    { name: '硬度', canSort: false, sortField: 'phone', width: '60px' },
    { name: '尺寸', canSort: false, sortField: 'phone', width: '60px' },
    { name: this.qualityInspectionManagement.getCurrentUrl().includes('before') ? '热前质检结果' : '热后质检结果', canSort: false, sortField: 'phone', width: '110px', right: '80px' },
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
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeQualityList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterQualityList.bind(this.qualityInspectionManagement);
    }
  }
  init(val) {
    let data = JSON.parse(val);
    if (this.qualityInspectionManagement.getCurrentUrl().includes('before')) {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeQualityList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterQualityList.bind(this.qualityInspectionManagement);
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

  qualityResult(data: SelfCheck, type: string) {
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: type + '检测',
      nzWidth: '700px',
      nzComponentParams: { data, type },
      nzContent: QualityResultModalComponent,
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
          show: data.beforeQualityCheck ? data.beforeQualityCheck.result !== QualityInspectionResult.SCRAPPED :
            data.afterQualityCheck.result !== QualityInspectionResult.SCRAPPED,
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            if (cci.form.valid) {
              cci.save().subscribe(() => {
                this.message.success('保存成功');
                this.delongTable.settingInit();
                showload = false;
                modal.destroy();
              }, error => {
                this.message.error(`保存失败 ${error.error.message}`);
                showload = false;
              });
            } else {
              this.message.error(`请填写完整`);
              showload = false;
            }
          }
        }
      ]
    });
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
  toFontFormCheck(data): string {
    if (data) {
      return { 'OK': '合格', 'NG': '不合格', 'EXEMPT': '免检' }[data];
    } else {
      return '未检测';
    }

  }

}
