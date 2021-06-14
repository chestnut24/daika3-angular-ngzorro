import {Component, Input, OnInit} from '@angular/core';
import {HtInfo, HtStatus} from '../../../../public/interface/heat-treatment';
import {CraftApprovalsComponent} from '../../../configuration-management/components/craft-approvals/craft-approvals.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HtDetailModalComponent} from '../ht-detail-modal/ht-detail-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heat-treatment-device',
  templateUrl: './heat-treatment-device.component.html',
  styleUrls: ['./heat-treatment-device.component.scss']
})
export class HeatTreatmentDeviceComponent implements OnInit {
  @Input() htInfo: HtInfo;
  @Input() deviceId: string;
  constructor(private message: NzMessageService,
              private modalService: NzModalService,
              private router: Router) { }

  ngOnInit() {
  }

  htStatus2info(htStatus: HtStatus): {label: string, color: string} {
    switch (htStatus) {
      case HtStatus.COMING_SOON: return {label: '即将开启', color: '#F5222D'};
      case HtStatus.END: return {label: '加热结束', color: '#B7EA8F'};
      case HtStatus.NOT_START: return {label: '未开启', color: '#707070'};
      case HtStatus.PROCESSING: return {label: '热处理中', color: '#FB5F1E'};
      case HtStatus.COMING_TO_END: return {label: '即将结束', color: '#FB5F1E'};
      default : return {label: htStatus, color: '#000'};
    }
  }

  detailInfo(htStatus: HtStatus) {
    let title = '';
    switch (htStatus) {
      case HtStatus.COMING_SOON: title = '即将开启'; break;
      case HtStatus.END: title = '加热结束'; break;
      case HtStatus.NOT_START: title = '未开启'; break;
      case HtStatus.PROCESSING: title = '热处理中'; break;
      case HtStatus.COMING_TO_END: title = '即将结束'; break;
      default : title = htStatus;
    }
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '700px',
      nzComponentParams: {htStatus, htInfo: this.htInfo},
      nzContent: HtDetailModalComponent,
      nzFooter: [
        {
          label: '关闭',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '查看装炉计划',
          shape: 'primary',
          show: htStatus === HtStatus.COMING_SOON || htStatus === HtStatus.END,
          onClick: () => {
            this.router.navigate([`/chargingPlan/lookPlan/${this.htInfo.planLink.planId}`]);
            modal.destroy();
          }
        },
      ]
    });
  }
  routerLink(url, id) {
    if (this.htInfo.htRecord) {
      this.router.navigate([url + id]);
    } else {
      this.message.error('该设备目前无热处理计划!');
    }
  }
}
