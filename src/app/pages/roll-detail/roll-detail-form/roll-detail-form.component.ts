import { Component, OnInit } from '@angular/core';
import { RollResumeService } from '../../../services/roll-resume.service';
import { DelongTableService } from '../../../services/delong-table.service';
import { Plans } from '../../../public/interface/enter-furnace';
import { ResumeDetail } from '../../../public/interface/roll-resume';
import { TitleType } from '../../../public/components/delong-table/delong-table.component';

@Component({
  selector: 'app-roll-detail-form',
  templateUrl: './roll-detail-form.component.html',
  styleUrls: ['./roll-detail-form.component.scss']
})
export class RollDetailFormComponent implements OnInit {

  searchFreight: string; // 货号查询
  searchNo: string; // 生产号查询
  searchStatus: string; // 状态查询
  titleList: Array<TitleType> = [
    { name: '货号', canSort: false, sortField: '', width: '100px' },
    { name: '生产号', canSort: false, sortField: '', width: '60px' },
    { name: '毛坯棍', canSort: false, sortField: '', width: '60px' },
    { name: '尺寸(mm)', canSort: false, sortField: '', width: '120px' },
    { name: '净重(t)', canSort: false, sortField: '', width: '60px' },
    { name: '生产状态', canSort: false, sortField: '', width: '70px' },
    { name: '轧辊状态', canSort: false, sortField: '', width: '70px' },
    { name: '质检信息', canSort: false, sortField: '', width: '120px' },
    { name: '装炉计划', canSort: false, sortField: '', width: '120px' },
    { name: '入炉', canSort: false, sortField: '', width: '120px' },
    { name: '热处理数据', canSort: false, sortField: '', width: '120px' },
    { name: '出炉', canSort: false, sortField: '', width: '120px' },
    { name: '正火冷却', canSort: false, sortField: '', width: '120px' },
    { name: '转辊', canSort: false, sortField: '', width: '130px' },
    { name: '轧辊履历', canSort: false, sortField: '', width: '70px', right: '0px' },
  ];
  routerWata = {
    searchParams: {},
    pageNum: 1,
    pageSize: 10,
  };
  constructor(
    private rollResumeService: RollResumeService,
    public delongTable: DelongTableService<ResumeDetail>,
  ) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.rollResumeService.getResumeDetail.bind(this.rollResumeService);
    this.delongTable.search();
  }
  searchClick() {
    console.log('data', this.delongTable.tableData);
    this.delongTable.searchParams = {
      freightNumber: this.searchFreight,
      productNo: this.searchNo
    };
    this.delongTable.pageNum = 1;
    this.delongTable.search(); // search() 查询方法
  }
  getIframeHeight() {
    return window.innerHeight - 290 + 'px';
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
    this.delongTable.observeFunction = this.rollResumeService.getResumeDetail.bind(this.rollResumeService);
    this.delongTable.searchParams = data.searchParams;
    this.delongTable.pageNum = data.pageNum;
    this.delongTable.pageSize = data.pageSize;
    this.delongTable.search();
  }

}
