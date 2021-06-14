import { Component, OnInit } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { CoolingDetails, CoolingPages, Product } from '../../../../public/interface/normalizing-cooling';
import { NormalizingCoolingService } from '../../../../services/normalizing-cooling.service';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { BeginCoolingComponent } from '../cooling/component/begin-cooling/begin-cooling.component';
import { NzModalService } from 'ng-zorro-antd';
import { CheckCoolingComponent } from './component/check-cooling/check-cooling.component';
import { CoolingStatus } from '../../../../public/interface/quality-inspection-management';

@Component({
  selector: 'app-cooling-history-record',
  templateUrl: './cooling-history-record.component.html',
  styleUrls: ['./cooling-history-record.component.scss']
})
export class CoolingHistoryRecordComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  SearchParams: {
    date: Date;
    freightNo: string;
    productNo: string;
    coolingStatus: string;
    startTemp: string;
    endTemp: string;
  } = {
      date: null,
      freightNo: '',
      productNo: '',
      coolingStatus: '全部',
      startTemp: '',
      endTemp: ''
    };
  coolingStatus = [
    { status: '全部' },
    { status: '强制结束' },
    { status: '正常完成' },
  ];
  CoolingLabel: string;
  titleList: Array<TitleType> = [
    { name: '开始冷却时间', canSort: false, sortField: '', width: '147px' },
    { name: '结束冷却时间', canSort: false, sortField: '', width: '147px' },
    { name: '货号', canSort: false, sortField: '', width: '100px' },
    { name: '生产号', canSort: false, sortField: '', width: '60px' },
    { name: '尺寸（mm）', canSort: false, sortField: '', width: '120px' },
    { name: '净重（t）', canSort: false, sortField: '', width: '80px' },
    { name: '操作人', canSort: false, sortField: '', width: '60px' },
    { name: '目标温度（℃）', canSort: false, sortField: '', width: '115px' },
    { name: '结束温度（℃）', canSort: false, sortField: '', width: '115px' },
    { name: '冷却状态', canSort: false, sortField: '', width: '100px' },
    { name: '操作', canSort: false, sortField: '', width: '60px', right: '0px' },
  ];
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };

  constructor(
    public delongTable: DelongTableService<CoolingDetails>,
    private normalizingCooling: NormalizingCoolingService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.normalizingCooling.getDetails.bind(this.normalizingCooling);
  }

  pageChange() {
    this.routerWata = {
      searchParams: this.delongTable.searchParams,
      pageNum: this.delongTable.pageNum,
      pageSize: this.delongTable.pageSize,
    };
  }

  init(val) {
    let data = JSON.parse(val);
    this.delongTable.observeFunction = this.normalizingCooling.getDetails.bind(this.normalizingCooling);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  search(): void {
    const object: {
      startTime: string;
      freightNumber: string;
      productNo: string;
      status: string;
      startTemp: string;
      endTemp: string;
    } = {
      startTime: '',
      freightNumber: '',
      productNo: '',
      status: '',
      startTemp: '',
      endTemp: ''
    };
    object.startTime = new Date(this.SearchParams.date).getTime().toString();
    object.freightNumber = this.SearchParams.freightNo;
    object.productNo = this.SearchParams.productNo;
    object.startTemp = this.SearchParams.startTemp;
    object.endTemp = this.SearchParams.endTemp;
    switch (this.SearchParams.coolingStatus) {
      case '强制结束': { object.status = CoolingStatus.COERCE_WIN; break; }
      case '正常完成': { object.status = CoolingStatus.WIN; break; }
      default: { object.status = ''; }
    }
    this.delongTable.searchParams = object;
    this.delongTable.pageNum = 1;
    this.delongTable.search();
  }
  Cooling(title: string, freight: CoolingDetails): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '850px',
      nzContent: CheckCoolingComponent,
      nzComponentParams: {
        freight,
      },
      nzFooter: null
    });
  }
  startCooling(freight: CoolingDetails) {
    this.Cooling('炉外正火冷却', freight);
  }
  checkStatus(status) {
    switch (status) {
      case 'WIN': { return this.CoolingLabel = '正常完成'; break; }
      case 'COERCE_WIN': { return this.CoolingLabel = '强制结束'; break; }
    }
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }

}
