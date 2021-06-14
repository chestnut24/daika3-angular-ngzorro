import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { ModifyContent, ModifyList } from '../../../../public/interface/configuration-management';
import { UserService } from '../../../../services/user.service';



@Component({
  selector: 'app-modification-log',
  templateUrl: './modification-log.component.html',
  styleUrls: ['./modification-log.component.scss']
})
export class ModificationLogComponent implements OnInit {
  tablePadding = 17; // 保持表格宽度的数据
  listSelection: {
    selectData: any[];
    itemNumber: string;
    productNumber: string;
    belongModule: string;
  } = {
      selectData: [],
      itemNumber: '',
      productNumber: '',
      belongModule: '全部',
    };
  dateFormat = 'yyyy/MM/dd';
  updateUser: string;
  menuList: { item: string }[] = [
    { item: '全部' },
    { item: '入厂登记' },
    { item: '热前自检' },
    { item: '热前质检' },
    { item: '热后自检' },
    { item: '热后质检' },
    { item: '货号管理' },
    { item: '正火冷却' }
  ];
  titleList: Array<TitleType> = [
    { name: '变更时间', canSort: false, sortField: '', width: '147px' },
    { name: '轧辊货号', canSort: false, sortField: '', width: '100px' },
    { name: '生产号', canSort: false, sortField: '', width: '60px' },
    { name: '所属模块', canSort: false, sortField: '', width: '80px' },
    { name: '日志详情', canSort: false, sortField: '', width: '200px' },
    { name: '变更人', canSort: false, sortField: '', width: '60px', right: '0px' },
  ];
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };

  constructor(
    public delongTable: DelongTableService<ModifyContent<ModifyList>>,
    public configurationManagement: ConfigurationManagementService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.nowTimeGet();
    this.delongTable.observeFunction = this.configurationManagement.modifyLogGetplanB.bind(this.configurationManagement);
    this.modifySearch();
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
    this.delongTable.observeFunction = this.configurationManagement.modifyLogGetplanB.bind(this.configurationManagement);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }
  modifySearch(): void {
    const formdata = this.listSelection.selectData;
    const option: {
      startTime: string;
      endTime: string;
      freightNumber: string;
      productNo: string;
      moduleName: string;
      tableName: string;
    } = {
      startTime: '',
      endTime: '',
      freightNumber: '',
      productNo: '',
      moduleName: '',
      tableName: ''
    };
    option.startTime = (new Date(formdata[0]).getTime()) ? (new Date(formdata[0]).getTime()).toString() : null,
      option.endTime = (new Date(formdata[1]).getTime()) ? (new Date(formdata[1]).getTime()).toString() : null,
      option.freightNumber = this.listSelection.itemNumber;
    option.productNo = this.listSelection.productNumber;
    option.moduleName = this.listSelection.belongModule === '全部' ? '' : this.listSelection.belongModule;
    option.tableName = this.listSelection.belongModule === '全部' ? '' : this.listSelection.belongModule;
    this.delongTable.searchParams = option;
    this.delongTable.pageNum = 1;
    this.delongTable.search();
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
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
    this.listSelection.selectData = [new Date(Last_month), new Date(formatnowdate)]
  }
}
