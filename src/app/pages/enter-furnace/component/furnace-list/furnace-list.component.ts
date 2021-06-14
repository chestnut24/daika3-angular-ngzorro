import { Component, Input, OnInit } from '@angular/core';
import { DelongTableService } from '../../../../services/delong-table.service';
import { Plans } from '../../../../public/interface/enter-furnace';
import { EnterFurnaceService } from '../../../../services/enter-furnace.service';
import { TitleType } from '../../../../public/components/delong-table/delong-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-furnace-list',
  templateUrl: './furnace-list.component.html',
  styleUrls: ['./furnace-list.component.scss']
})
export class FurnaceListComponent implements OnInit {

  tablePadding = 17; // 保持表格宽度的数据

  constructor(
    private route: ActivatedRoute,
    public delongTable: DelongTableService<Plans>,
    private enterFurnaceService: EnterFurnaceService,
    private router: Router,
  ) { }
  titleList: Array<TitleType>;
  searchText = '';
  text;
  // pageNum = 1;
  // pageSize = 10;
  createdDate: string;
  startDate: string;
  putOrTake: string; // 用来判断是入炉还是出炉的标志 put是入炉 take是出炉
  tableRoll: string; // 表格中最后一列根据出炉显示 待入炉或者待出炉
  tableProgress: string; // 表格倒数第二列根据出炉显示 入炉进度或者出炉进度
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };

  ngOnInit() {
    const path = this.router.url.split('/')[1];
    if (path === 'enterFurnace') { // 通过breadcrumb来判断是入炉还是出炉
      this.putOrTake = 'put';
    } else {
      this.putOrTake = 'take';
    }
    this.delongTable.observeFunction = this.enterFurnaceService.inquirePlans.bind(this.enterFurnaceService);
    this.delongTable.searchParams = {
      type: this.putOrTake === 'put' ? 'PUT_FURNACE' : 'TAKE_FURNACE',
    };
    this.delongTable.search();
    if (this.putOrTake && (this.putOrTake === 'put')) {
      this.tableRoll = '待入炉轧辊';
      this.tableProgress = '入炉进度';
    } else {
      this.tableRoll = '待出炉轧辊';
      this.tableProgress = '出炉进度';
    }
    this.titleList = [
      { name: '计划创建时间', canSort: false, sortField: '', width: '147px' },
      { name: '计划生产时间', canSort: false, sortField: '', width: '100px' },
      { name: '工艺环节', canSort: false, sortField: '', width: '70px' },
      { name: '使用设备', canSort: false, sortField: '', width: '105px' },
      { name: '加工工艺', canSort: false, sortField: '', width: '120px' },
      { name: '加工轧辊', canSort: false, sortField: '', width: '300px' },
      { name: this.tableProgress, canSort: false, sortField: '', width: '100px', right: '220px' },
      { name: this.tableRoll, canSort: false, sortField: '', width: '300px', right: '0px' },
    ];
  }

  searchClick(): void { // 查询
    this.delongTable.searchParams = { // 使用 delongTable 中的封装方法 searchParams 是查询的参数 创建时间/开始时间/货号
      createdDt: (new Date(this.createdDate).getTime()) ? (new Date(this.createdDate).getTime()) : null,
      startTime: (new Date(this.startDate).getTime()) ? (new Date(this.startDate).getTime()) : null,
      freightNumber: this.searchText,
      type: this.putOrTake === 'put' ? 'PUT_FURNACE' : 'TAKE_FURNACE',
      // 当选中时间的时候传时间戳，未选中时间的时候传值为null
    };
    this.delongTable.pageNum = 1;
    this.delongTable.search(); // search() 查询方法
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
  }
  init(val) {
    console.log(val);
    let data = JSON.parse(val);
    this.delongTable.observeFunction = this.enterFurnaceService.inquirePlans.bind(this.enterFurnaceService);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.searchParams = {
      type: this.putOrTake === 'put' ? 'PUT_FURNACE' : 'TAKE_FURNACE',
    };
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

}
