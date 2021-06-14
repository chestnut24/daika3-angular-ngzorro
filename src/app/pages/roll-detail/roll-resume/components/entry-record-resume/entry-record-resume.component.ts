import { Component, OnInit } from '@angular/core';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {DelongTableService} from '../../../../../services/delong-table.service';
import {EnterFurnace, EntryRecord} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-entry-record-resume',
  templateUrl: './entry-record-resume.component.html',
  styleUrls: ['./entry-record-resume.component.scss']
})
export class EntryRecordResumeComponent implements OnInit {
  titleList: Array<TitleType> = [
    { name: '修改时间', canSort: false, sortField: '', width: '100px'},
    { name: '货号', canSort: false, sortField: '', width: '100px'},
    { name: '生产号', canSort: false, sortField: '', width: '100px' },
    { name: '毛坯棍', canSort: false, sortField: '' , width: '100px'},
    { name: '交送人', canSort: false, sortField: '' , width: '100px'},
    { name: '登记人', canSort: false, sortField: '' , width: '100px'},
    { name: '备注', canSort: false, sortField: '' , width: '100px'},
  ];
  rollId: string;
  constructor(
      public delongTable: DelongTableService<EntryRecord>,
      public rollResume: RollResumeService ,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.delongTable.observeFunction = this.rollResume.getEntryRecord.bind(this.rollResume);
    this.delongTable.searchParams = {
      rollId: this.rollId
    };
    this.delongTable.search();
  }
}
