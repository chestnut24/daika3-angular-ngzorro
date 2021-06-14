import {Component, Input, OnInit} from '@angular/core';
import {HtDetail, HtRecord} from '../../../../public/interface/heat-treatment';

@Component({
  selector: 'app-standard-process-curve-modal',
  templateUrl: './standard-process-curve-modal.component.html',
  styleUrls: ['./standard-process-curve-modal.component.scss']
})
export class StandardProcessCurveModalComponent implements OnInit {
  @Input() dataDetail: HtDetail;
  constructor() { }

  ngOnInit() {
  }

}
