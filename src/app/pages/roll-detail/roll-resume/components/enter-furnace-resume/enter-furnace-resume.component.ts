import { Component, OnInit } from '@angular/core';
import {DelongTableService} from '../../../../../services/delong-table.service';
import {EntryRecord} from '../../../../../public/interface/entry-record';
import {EnterFurnace} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-enter-furnace-resume',
  templateUrl: './enter-furnace-resume.component.html',
  styleUrls: ['./enter-furnace-resume.component.scss']
})
export class EnterFurnaceResumeComponent implements OnInit {
  titleList: Array<TitleType> = [
    { name: '计划生产时间', canSort: false, sortField: '', width: '100px'},
    { name: '预计结束时间', canSort: false, sortField: '', width: '100px'},
    { name: '工艺环节', canSort: false, sortField: '', width: '100px' },
    { name: '使用设备', canSort: false, sortField: '' , width: '100px'},
    { name: '加工工艺', canSort: false, sortField: '' , width: '100px'},
    { name: '入炉作业人', canSort: false, sortField: '' , width: '100px'},
    { name: '入炉记录', canSort: false, sortField: '', width: '100px' },
  ];
  rollId: string;
  constructor(
      public delongTable: DelongTableService<EnterFurnace>,
      public rollResume: RollResumeService ,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.delongTable.observeFunction = this.rollResume.getEnterFurnace.bind(this.rollResume);
    this.delongTable.searchParams = {
      rollId: this.rollId
    };
    this.delongTable.search();
  }

}
