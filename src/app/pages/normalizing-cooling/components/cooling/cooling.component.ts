import { Component, OnInit } from '@angular/core';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { DelongTableService } from '../../../../services/delong-table.service';
import { User } from '../../../../public/interface/user';
import { CoolingPages, Product } from '../../../../public/interface/normalizing-cooling';
import { NormalizingCoolingService } from '../../../../services/normalizing-cooling.service';
import { EntryRecord, SelfCheck } from '../../../../public/interface/entry-record';
import { AddRecordComponent } from '../../../entry-record/component/add-record/add-record.component';
import { CoolingStatus, IsExempt } from '../../../../public/interface/quality-inspection-management';
import { NzModalService } from 'ng-zorro-antd';
import { BeginCoolingComponent } from './component/begin-cooling/begin-cooling.component';

@Component({
  selector: 'app-cooling',
  templateUrl: './cooling.component.html',
  styleUrls: ['./cooling.component.scss']
})
export class CoolingComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  state;
  modal;
  timer;
  CoolingLabel: string;
  SearchParams: {
    date: Date;
    freightNo: string;
    productNo: string;
    coolingStatus: string;
  } = {
      date: null,
      freightNo: '',
      productNo: '',
      coolingStatus: '全部'
    };
  titleList: Array<TitleType> = [
    { name: '开始冷却时间', canSort: false, sortField: '', width: '147px' },
    { name: '结束冷却时间', canSort: false, sortField: '', width: '147px' },
    { name: '货号', canSort: false, sortField: '', width: '100px' },
    { name: '生产号', canSort: false, sortField: '', width: '60px' },
    { name: '尺寸（mm）', canSort: false, sortField: '', width: '120px' },
    { name: '净重（t）', canSort: false, sortField: '', width: '80px' },
    { name: '操作人', canSort: false, sortField: '', width: '60px' },
    { name: '目标温度（℃）', canSort: false, sortField: '', width: '115px' },
    { name: '当前温度（℃）', canSort: false, sortField: '', width: '115px' },
    { name: '冷却状态', canSort: false, sortField: '', width: '100px' },
    { name: '操作', canSort: false, sortField: '', width: '60px', right: '0px' },
  ];
  coolingStatus = [
    { status: '全部' },
    { status: '未开始' },
    { status: '冷却中' },
    { status: '即将结束' },
  ];
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };
  constructor(
    public delongTable: DelongTableService<CoolingPages>,
    private normalizingCooling: NormalizingCoolingService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.normalizingCooling.getCooling.bind(this.normalizingCooling);
    this.timer = setInterval(() => {
      this.delongTable.search();
      this.delongTable.tableData.forEach((item) => {
        console.log('item', item);
      }
      );
    }, 20000);
  }
  init(val) {
    let data = JSON.parse(val);
    this.delongTable.observeFunction = this.normalizingCooling.getCooling.bind(this.normalizingCooling);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  pageChange() {
    this.routerWata = {
      searchParams: this.delongTable.searchParams,
      pageNum: this.delongTable.pageNum,
      pageSize: this.delongTable.pageSize,
    };
  }
  search() {
    const object: {
      startTime: string;
      freightNumber: string;
      productNo: string;
      status: string;
    } = {
      startTime: '',
      freightNumber: '',
      productNo: '',
      status: '全部'
    };
    object.startTime = new Date(this.SearchParams.date).getTime().toString();
    object.freightNumber = this.SearchParams.freightNo;
    object.productNo = this.SearchParams.productNo;
    switch (this.SearchParams.coolingStatus) {
      case '未开始': { object.status = CoolingStatus.NOT_START; break; }
      case '冷却中': { object.status = CoolingStatus.IN_COOLING; break; }
      case '即将结束': { object.status = CoolingStatus.NOT_END; break; }
      default: { object.status = ''; }
    }
    this.delongTable.searchParams = object;
    this.delongTable.pageNum = 1;
    this.delongTable.search();
  }
  startCooling(freight: CoolingPages, status: number) {
    this.Cooling('炉外正火冷却', freight, status);
  }

  Cooling(title: string, freight: CoolingPages, state: number) {
    this.modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '850px',
      nzContent: BeginCoolingComponent,
      nzComponentParams: {
        freight,
        modal: this,
        state
      },
      nzFooter: null
    });
  }
  checkStatus(status) {
    switch (status) {
      case 'NOT_START': { return this.CoolingLabel = '未开始'; break; }
      case 'NOT_END': { return this.CoolingLabel = '即将结束'; break; }
      case 'IN_COOLING': { return this.CoolingLabel = '冷却中'; break; }
    }
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
}
