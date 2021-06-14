import { Component, OnInit } from '@angular/core';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {DelongTableService} from '../../../../../services/delong-table.service';
import {ChargingPlan, EnterFurnace} from '../../../../../public/interface/roll-resume';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CraftShowModalComponent} from '../craft-show-modal/craft-show-modal.component';

@Component({
  selector: 'app-charging-plan-resume',
  templateUrl: './charging-plan-resume.component.html',
  styleUrls: ['./charging-plan-resume.component.scss']
})
export class ChargingPlanResumeComponent implements OnInit {
  titleList: Array<TitleType> = [
    { name: '修改时间', canSort: false, sortField: '', width: '100px'},
    { name: '计划生产时间', canSort: false, sortField: '', width: '100px'},
    { name: '预计结束时间', canSort: false, sortField: '', width: '100px'},
    { name: '工艺环节', canSort: false, sortField: '', width: '100px' },
    { name: '使用设备', canSort: false, sortField: '' , width: '100px'},
    { name: '加工工艺', canSort: false, sortField: '' , width: '100px'},
    { name: '计划员', canSort: false, sortField: '' , width: '100px'},
    { name: '技术员', canSort: false, sortField: '', width: '100px' },
  ];
  rollId: string;
  constructor(
      public delongTable: DelongTableService<ChargingPlan>,
      public rollResume: RollResumeService ,
      private route: ActivatedRoute,
      private router: Router,
      private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.delongTable.observeFunction = this.rollResume.getChargingPlan.bind(this.rollResume);
    this.delongTable.searchParams = {
      rollId: this.rollId,
    };
    this.delongTable.search();
  }
  checkCraft(data) {
    this.createCraft('工艺预览', data);
  }
  createCraft(title: string , freight: ChargingPlan) {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '850px',
      nzComponentParams: {
        freight,
      },
      nzContent: CraftShowModalComponent,
    });
  }
}
