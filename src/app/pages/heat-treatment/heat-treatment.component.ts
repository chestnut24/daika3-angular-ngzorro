import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeatTreatmentService} from '../../services/heat-treatment.service';
import {HeatTreatment} from '../../public/interface/heat-treatment';

@Component({
  selector: 'app-heat-treatment',
  templateUrl: './heat-treatment.component.html',
  styleUrls: ['./heat-treatment.component.scss']
})
export class HeatTreatmentComponent implements OnInit, OnDestroy {
  deviceList: Array<HeatTreatment>;
  timer;
  constructor(private heatTreatmentService: HeatTreatmentService) { }

  ngOnInit() {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 30000);
  }

  getData(): void {
    this.heatTreatmentService.getHts().subscribe(data => {
      this.deviceList = data;
    });
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
