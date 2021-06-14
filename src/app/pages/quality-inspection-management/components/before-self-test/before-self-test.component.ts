import { Component, OnInit } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { Result, SelfCheck } from '../../../../public/interface/quality-inspection-management';
import { QualityInspectionManagementService } from '../../../../services/quality-inspection-management.service';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { Craft } from '../../../../public/interface/configuration-management';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SelfTestModalComponent } from '../self-test-modal/self-test-modal.component';

@Component({
  selector: 'app-before-self-test',
  templateUrl: './before-self-test.component.html',
  styleUrls: ['./before-self-test.component.scss']
})
export class BeforeSelfTestComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  titleList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: 'name', width: '147px' },
    { name: '货号', canSort: false, sortField: 'id', width: '100px' },
    { name: '生产号', canSort: false, sortField: 'phone', width: '60px' },
    { name: '材质', canSort: false, sortField: 'phone', width: '81px' },
    { name: '材质代码', canSort: false, sortField: 'phone', width: '75px' },
    { name: '尺寸(mm)', canSort: false, sortField: 'phone', width: '120px' },
    { name: '净重(t)', canSort: false, sortField: 'phone', width: '60px' },
    { name: '质检人', canSort: false, sortField: 'phone', width: '60px' },
    { name: this.qualityInspectionManagement.getCurrentUrl() === 'beforeSelfTest' ? '热前自检结果' : '热后自检结果', canSort: false, sortField: 'phone', width: '110px', right: '80px' },
    { name: '履历', canSort: false, sortField: 'phone', width: '80px', right: '0px' },
  ];

  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };;

  constructor(public delongTable: DelongTableService<SelfCheck>,
    private qualityInspectionManagement: QualityInspectionManagementService,
    private message: NzMessageService,
    private modalService: NzModalService,
    public delongTableS: DelongTableService<any>) { }

  ngOnInit() {
    if (this.qualityInspectionManagement.getCurrentUrl() === 'beforeSelfTest') {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeSelfList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterSelfList.bind(this.qualityInspectionManagement);
    }
  }

  init(val) {
    let data = JSON.parse(val);
    if (this.qualityInspectionManagement.getCurrentUrl() === 'beforeSelfTest') {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getBeforeSelfList.bind(this.qualityInspectionManagement);
    } else {
      this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterSelfList.bind(this.qualityInspectionManagement);
    }
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  pageChange() {
    // this.delongTableS.messageSubject.subscribe(data => {
    //   console.log(data);
    //   this.routerWata = data;
    // });
    this.routerWata = {
      searchParams: this.delongTable.searchParams,
      pageNum: this.delongTable.pageNum,
      pageSize: this.delongTable.pageSize,
    };
  }

  selfTestResult(data: SelfCheck) {
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
        {
          label: '确定',
          type: 'primary',
          onClick: (contentComponentInstance) => {
            const cci = contentComponentInstance;
            cci.save(modal);
          }
        }
      ]
    });
  }

  checkWitchIsUser(data): string {
    if (data.hardnessUser && data.hardnessUser.name && data.exteriorUser && data.exteriorUser.name) {
      return data.exteriorCheckTime > data.hardnessCheckTime ? data.exteriorUser.name : data.hardnessUser.name;
    } else if (data.hardnessUser && data.hardnessUser.name) {
      return data.hardnessUser.name;
    } else if (data.exteriorUser && data.exteriorUser.name) {
      return data.exteriorUser.name;
    } else {
      return '';
    }
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
}
