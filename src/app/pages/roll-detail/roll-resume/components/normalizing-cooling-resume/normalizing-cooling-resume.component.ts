import { Component, OnInit } from '@angular/core';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {DelongTableService} from '../../../../../services/delong-table.service';
import {EnterFurnace, NormalizingCooling} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-normalizing-cooling-resume',
  templateUrl: './normalizing-cooling-resume.component.html',
  styleUrls: ['./normalizing-cooling-resume.component.scss']
})
export class NormalizingCoolingResumeComponent implements OnInit {
  titleList: Array<TitleType> = [
    { name: '开始冷却时间', canSort: false, sortField: '', width: '100px'},
    { name: '结束冷却时间', canSort: false, sortField: '', width: '100px'},
    { name: '冷却时长', canSort: false, sortField: '', width: '100px' },
    { name: '目标温度', canSort: false, sortField: '' , width: '100px'},
    { name: '操作人', canSort: false, sortField: '' , width: '100px'},
  ];
  rollId: string;
  constructor(
      public delongTable: DelongTableService<NormalizingCooling>,
      public rollResume: RollResumeService ,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.delongTable.observeFunction = this.rollResume.getNormalizingCooling.bind(this.rollResume);
    this.delongTable.searchParams = {
      rollId: this.rollId
    };
    this.delongTable.search();
  }

}
