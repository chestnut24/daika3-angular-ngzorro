import {Component, Input, OnInit} from '@angular/core';
import {HtDetail} from '../../../../../public/interface/heat-treatment';
import {ChargingPlan, ChargingPlanCraft} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';

@Component({
  selector: 'app-craft-show-modal',
  templateUrl: './craft-show-modal.component.html',
  styleUrls: ['./craft-show-modal.component.scss']
})
export class CraftShowModalComponent implements OnInit {
  @Input() freight: ChargingPlan;
  craftData: ChargingPlanCraft;
  constructor(
      public rollResume: RollResumeService ,
  ) { }

  ngOnInit() {
    console.log('this.freight.craftId', this.freight.craftId);
    this.rollResume.getCraft(this.freight.craftId).subscribe( (data) => {
      console.log('data', data);
      this.craftData = data;
    });
  }

}
