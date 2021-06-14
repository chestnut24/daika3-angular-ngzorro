import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HtAlarmsDevice, HtDetail} from '../../../../public/interface/heat-treatment';
import {RollAndFurnaceDevices} from '../heat-treatment-detail/heat-treatment-detail.component';

@Component({
  selector: 'app-heat-position-temperature',
  templateUrl: './heat-position-temperature.component.html',
  styleUrls: ['./heat-position-temperature.component.scss']
})
export class HeatPositionTemperatureComponent implements OnInit {
  @Input() monitorList: HtAlarmsDevice;
  @Output() changeDevice = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  deviceClick() {
    this.changeDevice.emit(this.monitorList);
  }

}
