/*
* dlTable组件使用说明
* @dlLoading: 是否需要加载中的状态，默认不需要
* @titleList: 表格的th中的内容，其中
*   name：th中展示的名称
*   canSort：是否能排序
*   sortField：排序的字段名
* 新建组件时，只需要在ngOnInit中将该请求的可观察对象赋给DelongTable服务中的 【observeFunction】 即可
*  */

import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DelongTableService } from '../../../services/delong-table.service';
export interface TitleType {
  name: string;
  canSort: boolean;
  sortField: string;
  width?: string;
  right?: string;
}
interface OrderParam {
  key: string;
  value: 'descend' | 'ascend' | null | string;
}
@Component({
  selector: 'app-delong-table',
  templateUrl: './delong-table.component.html',
  styleUrls: ['./delong-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DelongTableComponent implements OnInit {
  @Input() dlLoading = false;
  @Input() titleList: Array<TitleType>;
  @Input() nzScrollX: string;
  @Input() nzScrollY: string = null;

  @Output() private pageChange = new EventEmitter<any>();
  constructor(public delongTable: DelongTableService<any>) { }

  ngOnInit() {
  }

  sort(e: OrderParam): void {
    let orderParams = {};
    if (e.key) {
      switch (e.value) {
        case 'ascend': orderParams = { order: e.key, direction: 'ASC' }; break;
        case 'descend': orderParams = { order: e.key, direction: 'DESC' }; break;
        default: orderParams = {};
      }
    }
    this.delongTable.orderParams = orderParams;
    this.delongTable.search();
  }

  getScroll() {
    let a: {
      x: string;
      y?: string;
    } = {
      x: '800px'
    };
    if (this.nzScrollX && this.nzScrollY) {
      a = {
        x: this.nzScrollX,
        y: this.nzScrollY
      };
    } else if (this.nzScrollX && !this.nzScrollY) {
      a = {
        x: this.nzScrollX,
      };
    }
    return a;
  }

  // 
  pageNumChange(){
    this.pageChange.emit();
  }

}
