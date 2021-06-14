import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pagination } from '../public/interface/common';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class DelongTableService<T> {

  public currentObserve: Observable<Pagination<T>>;
  // tslint:disable-next-line:variable-name
  private _observeFunction; // 接收服务
  public get observeFunction() {
    return this._observeFunction;
  }
  public set observeFunction(val) {
    this._observeFunction = val;
    this.settingInit();
  }
  public tableData: Array<T> = [];
  public tableTotal = 0;
  public pageSize = 10;
  public pageNum = 1;
  public searchParams = {};
  public orderParams: { order?: string, direction?: 'DESC' | 'ASC' } = {};
  public isLoading = true;
  private isPending = false;
  public messageSubject = new Subject();
  constructor(private message: NzMessageService) { }

  search(): void {

    this.isLoading = true;
    for (const key in this.searchParams) {
      if (this.searchParams[key] === '' || this.searchParams[key] === null || this.searchParams[key] === undefined) {
        delete this.searchParams[key];
      }
    }
    this.currentObserve = this.observeFunction(Object.assign({}, this.searchParams, {
      pageNum: (this.pageNum - 1).toString(),
      pageSize: this.pageSize.toString(),
    }, this.orderParams));
    this.isPending = false;
    setTimeout(() => {
      if (!this.isPending) {
        this.currentObserve.subscribe(data => {
          this.isLoading = false;
          this.tableData = data.content;
          this.tableTotal = data.totalElements;
          // this.messageSubject.next({
          //   searchParams: this.searchParams,
          //   pageNum: this.pageNum
          // });
        }, error => {
          if (error && error.error && error.error.message) {
            this.message.error(`查询失败 ${error.error.message}`);
          } else {
            this.message.error(`查询失败, ${error}`);
          }
        });
      }
      this.isPending = true;
    }, 300);
  }
  settingInit(): void {
    this.currentObserve = null;
    this.tableData = [];
    this.tableTotal = 0;
    this.pageSize = 10;
    this.pageNum = 1;
    this.isLoading = true;
    this.searchParams = {};
    this.orderParams = {};
    this.search();
  }
}
