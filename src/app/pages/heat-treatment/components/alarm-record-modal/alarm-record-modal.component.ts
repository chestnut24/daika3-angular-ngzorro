import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HtAlarms, HtDetail} from '../../../../public/interface/heat-treatment';
import {HeatTreatmentService} from '../../../../services/heat-treatment.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {TemperatureType} from '../../../../public/interface/configuration-management';

@Component({
  selector: 'app-alarm-record-modal',
  templateUrl: './alarm-record-modal.component.html',
  styleUrls: ['./alarm-record-modal.component.scss']
})
export class AlarmRecordModalComponent implements OnInit {
  @Input() htAlarms: HtAlarms[];
  @Input() father;
  // dataSet: HtAlarms[];
  deviceId: string;
  constructor(private heatTreatmentService: HeatTreatmentService,
              private message: NzMessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.dataSet = this.dataDetail.htRecord.htAlarms;
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.father.alarmUpdate.subscribe(alarms => {
      this.htAlarms = alarms;
    });
  }
  ignoreAlarm(data): void {
    this.heatTreatmentService.ignoreMonitor(data.id).subscribe(() => {
      this.message.success('忽略成功');
      data.status = 'CLEARED';
      this.father.initHtById();
    }, error => {
      this.message.error(`忽略失败 ${error.error.message}`);
    });
  }

}
