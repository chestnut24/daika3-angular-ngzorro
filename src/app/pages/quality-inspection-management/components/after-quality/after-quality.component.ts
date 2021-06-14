import { Component, OnInit } from '@angular/core';
import {TitleType} from '../../../../public/components/delong-table/delong-table.component';
import {DelongTableService} from '../../../../services/delong-table.service';
import {SelfCheck} from '../../../../public/interface/quality-inspection-management';
import {QualityInspectionManagementService} from '../../../../services/quality-inspection-management.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {QualityResultModalComponent} from '../quality-result-modal/quality-result-modal.component';

@Component({
  selector: 'app-after-quality',
  templateUrl: './after-quality.component.html',
  styleUrls: ['./after-quality.component.scss']
})
export class AfterQualityComponent implements OnInit {
  titleList: Array<TitleType> = [
    {name: '质检时间', canSort: false, sortField: 'name'},
    {name: '货号', canSort: false, sortField: 'id'},
    {name: '生产号', canSort: false, sortField: 'phone'},
    {name: '材质', canSort: false, sortField: 'phone'},
    {name: '材质代码', canSort: false, sortField: 'phone'},
    {name: '尺寸(mm)', canSort: false, sortField: 'phone'},
    {name: '净重(t)', canSort: false, sortField: 'phone'},
    {name: '质检人', canSort: false, sortField: 'phone'},
    {name: '热前质检结果', canSort: false, sortField: 'phone'},
    {name: '履历', canSort: false, sortField: 'phone'},
  ];
  constructor(public delongTable: DelongTableService<SelfCheck>,
              private qualityInspectionManagement: QualityInspectionManagementService,
              private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.qualityInspectionManagement.getAfterQualityList.bind(this.qualityInspectionManagement);
  }


  qualityResult(data: SelfCheck) {
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: '质检结果',
      nzWidth: '700px',
      nzComponentParams: {data},
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
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            cci.save().subscribe(() => {
              this.message.success('保存成功');
              showload = false;
            }, error => {
              this.message.error(`保存失败 ${error.error.message}`);
              showload = false;
            });
            modal.destroy();
          }
        }
      ]
    });
  }
}
