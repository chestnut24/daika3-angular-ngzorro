import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HtInfo, HtStatus} from '../../../../public/interface/heat-treatment';

@Component({
  selector: 'app-ht-detail-modal',
  templateUrl: './ht-detail-modal.component.html',
  styleUrls: ['./ht-detail-modal.component.scss']
})
export class HtDetailModalComponent implements OnInit, OnDestroy {
  @Input() htStatus: HtStatus;
  @Input() htInfo: HtInfo;
  nowTime: number;
  timer;
  constructor() { }

  ngOnInit() {
    console.log(this.htInfo.linkDetail.freights[0].detailRolls)
    this.timer = setInterval(() => {
      this.nowTime = Date.now();
    }, 1000);
    // if (this.htInfo.linkDetail) {
    //   this.htInfo.linkDetail.freights.forEach(item => {
    //     item.detailRolls = item.detailRolls.filter(data => data.status === 'EXECUTING');
    //   });
    // }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
  getPauseTime(): number {
    if (this.htInfo.htRecord.htPauses && this.htInfo.htRecord.htPauses.length) {
      const htPauses = this.htInfo.htRecord.htPauses;
      let count = 0;
      for (let i = 0; i < htPauses.length - 1; i += 2) {
        count += this.htInfo.htRecord.htPauses[i + 1].time - this.htInfo.htRecord.htPauses[i].time;
      }
      return count;
    } else {
      return 0;
    }

  }

}
