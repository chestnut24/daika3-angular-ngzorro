import { Component, OnInit } from '@angular/core';
import {DelongTableService} from '../../../../../services/delong-table.service';
import {RollRecord} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {ResumeTableService} from '../../../../../services/resume-table.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-record-resume',
  templateUrl: './record-resume.component.html',
  styleUrls: ['./record-resume.component.scss']
})
export class RecordResumeComponent implements OnInit {
  titleList: Array<TitleType> = [
    { name: '转辊时间', canSort: false, sortField: ''},
    { name: '转辊作业人', canSort: false, sortField: ''},
  ];
  rollId: string;
  constructor(
      public resumeTable: ResumeTableService<RollRecord>,
      public rollResume: RollResumeService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }
  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.resumeTable.observeFunction = this.rollResume.getRollRecord.bind(this.rollResume);
    // tslint:disable-next-line:no-unused-expression
    this.resumeTable.searchParams = {
      rollId: this.rollId,
    };
    this.resumeTable.search();
  }
}
