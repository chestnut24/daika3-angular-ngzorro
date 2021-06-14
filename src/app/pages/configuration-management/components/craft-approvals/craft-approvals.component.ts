import {Component, Input, OnInit} from '@angular/core';
import {DelongTableService} from '../../../../services/delong-table.service';
import {Craft, CraftApproval} from '../../../../public/interface/configuration-management';
import {ConfigurationManagementService} from '../../../../services/configuration-management.service';
import {TitleType} from '../../../../public/components/delong-table/delong-table.component';

@Component({
  selector: 'app-craft-approvals',
  templateUrl: './craft-approvals.component.html',
  styleUrls: ['./craft-approvals.component.scss']
})
export class CraftApprovalsComponent implements OnInit {
  @Input() craft: Craft;
  titleList: Array<TitleType> = [
    {name: '审批时间', canSort: false, sortField: 'name'},
    {name: '审批人', canSort: false, sortField: 'id'},
    // {name: '审批阶段', canSort: false, sortField: 'phone'},
    {name: '审批结果', canSort: false, sortField: 'phone'},
    {name: '审批意见', canSort: false, sortField: 'phone'},
  ];
  constructor(public delongTable: DelongTableService<CraftApproval>,
              private configurationManagement: ConfigurationManagementService) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.configurationManagement.getCraftApprovals.bind(this.configurationManagement);
    this.delongTable.searchParams = {craftId: this.craft.id};
    this.delongTable.search();
  }

}
