import { Component, OnInit } from '@angular/core';
import {DataReportService} from '../../../../services/data-report.service';
import {StandardProcessCurveModalComponent} from '../../../heat-treatment/components/standard-process-curve-modal/standard-process-curve-modal.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ElectricQuantityModalComponent} from '../electric-quantity-modal/electric-quantity-modal.component';

@Component({
  selector: 'app-cost-accounting-data',
  templateUrl: './cost-accounting-data.component.html',
  styleUrls: ['./cost-accounting-data.component.scss']
})
export class CostAccountingDataComponent implements OnInit {
  src = this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016fa37b6dfc5e4f&user=delong_ht&password=BI-Delong-HT';
  iFrame;
  constructor(public dataReport: DataReportService,
              private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.iFrame = document.getElementsByTagName('iframe')[0];
  }

  openModal() {
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: '电量倍数设置',
      nzWidth: '700px',
      nzComponentParams: {},
      nzContent: ElectricQuantityModalComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => {
            modal.destroy();
          }
        },
        {
          label: '保存',
          shape: 'primary',
          loading: () => showload,
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            cci.addItems().subscribe(data => {
              this.message.success('保存成功');
              showload = false;
              modal.destroy();
              location.reload();
              // this.iFrame.contentWindow.location.reload();
            }, error => {
              this.message.error(`保存失败 ${error.error.message}`);
              showload = false;
            });
          }
        },
      ]
    });
  }

}
