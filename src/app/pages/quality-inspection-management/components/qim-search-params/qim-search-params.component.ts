import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { QualityInspectionResult, SelfCheck } from '../../../../public/interface/quality-inspection-management';

@Component({
  selector: 'app-qim-search-params',
  templateUrl: './qim-search-params.component.html',
  styleUrls: ['./qim-search-params.component.scss']
})
export class QimSearchParamsComponent implements OnInit {
  @Input() hasQualityInspectionResult = true;
  @Output() private pageChange = new EventEmitter<any>();
  dateRange: any[] = [];
  freightNumber;
  productNo;
  selectedValue;
  qualityInspectionResultList: Array<{ label: string, value: QualityInspectionResult }> = [
    {
      label: '全部', value: null
    },
    {
      label: '未填写', value: QualityInspectionResult.NOT_CHECK
    },
    {
      // ONGOING
      label: '填写中', value: QualityInspectionResult.ONGOING
    },
    {
      label: '合格', value: QualityInspectionResult.OK
    },
    {
      label: '不合格', value: QualityInspectionResult.NG
    },
    {
      label: '报废', value: QualityInspectionResult.SCRAPPED
    },
    {
      label: '二次质检', value: QualityInspectionResult.SECOND_CHECK
    },
  ];
  constructor(public delongTable: DelongTableService<SelfCheck>) { }

  ngOnInit() {
    // this.nowTimeGet();
  }

  search() {
    this.delongTable.searchParams = {
      startTime: this.dateRange[0] ? this.dateRange[0].getTime() : null,
      endTime: this.dateRange[1] ? this.dateRange[1].getTime() : null,
      freightNumber: this.freightNumber,
      productNo: this.productNo,
      result: this.selectedValue
    };
    this.delongTable.pageNum = 1;
    this.delongTable.search();
    this.pageChange.emit();
  }


  nowTimeGet() {
    // 获取时间
    let today = new Date();
    let mt = today.getMonth() + 1;
    let formatnowdate = today.getFullYear() + '-' + mt + '-' + today.getDate();
    today.setMonth(today.getMonth() - 1);
    let m = today.getMonth() + 1;
    let Last_month = today.getFullYear() + '-' + m + '-' + today.getDate();
    // 赋值阶段
    this.dateRange = [new Date(Last_month), new Date(formatnowdate)]
  }
}
