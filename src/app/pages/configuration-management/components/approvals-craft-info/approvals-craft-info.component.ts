import {Component, Input, OnInit} from '@angular/core';
import {Craft} from '../../../../public/interface/configuration-management';

@Component({
  selector: 'app-approvals-craft-info',
  templateUrl: './approvals-craft-info.component.html',
  styleUrls: ['./approvals-craft-info.component.scss']
})
export class ApprovalsCraftInfoComponent implements OnInit {
  @Input() craft: Craft;
  text;
  constructor() { }

  ngOnInit() {

  }

}
