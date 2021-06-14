import { Component, OnInit } from '@angular/core';
import {ResumeTableService} from '../../../services/resume-table.service';
import {Freight, RollRecord} from '../../../public/interface/roll-resume';
import {RollResumeService} from '../../../services/roll-resume.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-roll-resume',
  templateUrl: './roll-resume.component.html',
  styleUrls: ['./roll-resume.component.scss']
})
export class RollResumeComponent implements OnInit {
  tabList = [
    {
      name: '入厂记录',
      route: 'entry'
    },
    {
      name: '热前质检记录',
      route: 'beforeQuality'
    },
    {
      name: '装炉计划',
      route: 'chargingPlan'
    },
    {
      name: '入炉记录',
      route: 'enterFurnace'
    },
    {
      name: '热处理过程记录',
      route: 'heatTreatment'
    },
    {
      name: '出炉记录',
      route: 'takeFurnace'
    },
    {
      name: '正火冷却过程记录',
      route: 'normalizingCooling'
    },
    {
      name: '热后质检记录',
      route: 'afterQuality'
    },
    {
      name: '转辊记录',
      route: 'record'
    },
  ];
  public roll: Freight;
  public rollId: string;
  constructor(
      public delongTable: ResumeTableService<RollRecord>,
      public rollResume: RollResumeService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4]; // 获取id
    console.log('rollId', this.rollId, this.router);
    this.rollResume.getFreight(this.rollId).subscribe( (data ) => {
      console.log('data1', data);
      this.roll = data.content[0];
      //   this.roll.material = this.resumeTable.tableData[0].freight.material;
      //   this.roll.netWeight = this.resumeTable.tableData[0].freight.netWeight;
      //   this.roll.client = this.resumeTable.tableData[0].freight.client;
      //   this.roll.productNo = this.resumeTable.tableData[0].productNo;
      //   this.roll.materialCode = this.resumeTable.tableData[0].freight.materialCode;
      //   this.roll.size = this.resumeTable.tableData[0].freight.size;
      //   this.roll.productionUnit = this.resumeTable.tableData[0].freight.productionUnit;
    });
  }

}
