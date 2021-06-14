import {Component, Input, OnInit} from '@angular/core';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {ResumeTableService} from '../../../../../services/resume-table.service';
interface OrderParam {
  key: string;
  value: 'descend' | 'ascend' | null | string;
}
@Component({
  selector: 'app-resume-table',
  templateUrl: './resume-table.component.html',
  styleUrls: ['./resume-table.component.scss']
})
export class ResumeTableComponent implements OnInit {
  @Input() dlLoading = false;
  @Input() titleList;

  constructor(
      public resumeTable: ResumeTableService<any>
  ) { }

  ngOnInit() {
  }
  sort(e: OrderParam): void {
    let orderParams = {};
    if (e.key) {
      switch (e.value) {
        case 'ascend': orderParams = {order: e.key, direction: 'ASC'}; break;
        case 'descend': orderParams = {order: e.key, direction: 'DESC'}; break;
        default : orderParams = {};
      }
    }
    this.resumeTable.orderParams = orderParams;
    this.resumeTable.search();
  }

}
