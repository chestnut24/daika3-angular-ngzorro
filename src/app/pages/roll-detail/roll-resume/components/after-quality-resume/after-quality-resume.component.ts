import {Component, OnInit} from '@angular/core';
import {
  AfterNgDeal,
  AfterQuality, AfterSecondCheck,
  BeforeNgDeal,
  BeforeSecondCheck,
  CheckRecords
} from '../../../../../public/interface/roll-resume';
import {ResumeTableService} from '../../../../../services/resume-table.service';
import {RollResumeService} from '../../../../../services/roll-resume.service';
import {AfterCheck, Check, IsExempt} from '../../../../../public/interface/quality-inspection-management';
import {TitleType} from '../../../../../public/components/delong-table/delong-table.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-after-quality-resume',
  templateUrl: './after-quality-resume.component.html',
  styleUrls: ['./after-quality-resume.component.scss']
})
export class AfterQualityResumeComponent implements OnInit {
  afterQualityList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: ''},
    { name: '质检人', canSort: false, sortField: ''},
    { name: '化学检验', canSort: false, sortField: ''},
    { name: '探伤检验', canSort: false, sortField: ''},
    { name: '硬度检验', canSort: false, sortField: ''},
    { name: '金相检验', canSort: false, sortField: ''},
    { name: '尺寸检验', canSort: false, sortField: ''},
    { name: '热前质检结果', canSort: false, sortField: ''},
  ];
  unQualifyList: Array<TitleType> = [
    { name: '审批时间', canSort: false, sortField: ''},
    { name: '处理人', canSort: false, sortField: ''},
    { name: '质检结果处理', canSort: false, sortField: ''},
    { name: '备注', canSort: false, sortField: ''},
  ];
  secondQualityList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: ''},
    { name: '质检人', canSort: false, sortField: ''},
    { name: '化学检验', canSort: false, sortField: ''},
    { name: '探伤检验', canSort: false, sortField: ''},
    { name: '硬度检验', canSort: false, sortField: ''},
    { name: '金相检验', canSort: false, sortField: ''},
    { name: '尺寸检验', canSort: false, sortField: ''},
    { name: '热前质检结果', canSort: false, sortField: ''},
  ];
  UnqualifiedProducts: Array<AfterNgDeal> = [
    {
      remark: '',
      updatedDt: null,
      checkUser: null,
      result: null
    }
  ];
  SecondCheck: Array<AfterSecondCheck> = [
    {
      updatedDt: '', // 质检时间
      checkUser: null, // 质检人对象
      chemistryCheck: null, // 化学检验
      flawCheck: null, // 探伤检验
      hardnessCheck: null, // 硬度检验
      metalCheck: null, // 金相检验
      sizeCheck: null, // 尺寸检验
      result: null, // 热前质检结果
    }
  ];
  EntryRecord = { // 入厂记录
    hardnessCheck1: '', // 传端
    hardnessCheck2: '', // 1
    hardnessCheck3: '', // 2
    hardnessCheck4: '', // 3
    hardnessCheck5: '', // 4
    hardnessCheck6: '', // 5
    hardnessCheck7: '', // 非端
    unit1: 'HSD',
    unit2: 'HSD',
    isExempt: false,
    exemptReason: ''
  };
  disabled = {
    canInput1: true,
    canInput2: true,
    canInput3: true,
    canInput4: true,
  };
  hardnessUser: string;
  hardnessTime: number;
  IfChecking: false;
  title = '热后自检';
  showTime = true;
  rollId: string;
  Hardness0721 = {
    bodyHardness: null,
    neckHardness: null,
  };
  constructor(
      public  resumeTable: ResumeTableService<AfterQuality<CheckRecords>>,
      public rollResume: RollResumeService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.resumeTable.observeFunction = this.rollResume.getAfterQuality.bind(this.rollResume);
    // tslint:disable-next-line:no-unused-expression
    this.resumeTable.searchParams = {
      rollId: this.rollId,
    };
    this.resumeTable.search();
    this.resumeTable.afterSearch.subscribe(() => {
      console.log('test', this.resumeTable.tableData[0]);
      this.Hardness0721 = this.resumeTable.tableData[0].freight;
      for (let i = 0, k = 0 , j = 0; i < this.resumeTable.tableData[0].checkRecords.length; i++) {
        if (this.resumeTable.tableData[0].checkRecords[i].type === AfterCheck.AFTER_NG_DEAL ) {
          this.UnqualifiedProducts[k] = this.resumeTable.tableData[0].checkRecords[i].afterNgDeal;
          k++;
        }
        if (this.resumeTable.tableData[0].checkRecords[i].type === AfterCheck.AFTER_SECOND_CHECK ) {
          this.SecondCheck[j] = this.resumeTable.tableData[0].checkRecords[i].afterSecondCheck;
          j++;
          console.log('this.SecondCheck', this.SecondCheck);
        }
      }
      if (this.resumeTable.tableData[0].afterSelfCheck) {
        this.EntryRecord.hardnessCheck1 = this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck1;
        this.EntryRecord.hardnessCheck2 = this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck2;
        this.EntryRecord.hardnessCheck3 =  this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck3;
        this.EntryRecord.hardnessCheck4 =  this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck4;
        this.EntryRecord.hardnessCheck5 =  this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck5;
        this.EntryRecord.hardnessCheck6 =  this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck6;
        this.EntryRecord.hardnessCheck7 =  this.resumeTable.tableData[0].afterSelfCheck.hardnessCheck7;
        this.EntryRecord.unit1 = this.resumeTable.tableData[0].afterSelfCheck.unit1;
        this.EntryRecord.unit2 = this.resumeTable.tableData[0].afterSelfCheck.unit2;
        this.EntryRecord.isExempt = this.resumeTable.tableData[0].afterSelfCheck.isExempt === IsExempt.YES;
        this.EntryRecord.exemptReason = this.resumeTable.tableData[0].afterSelfCheck.exemptReason;
        this.hardnessUser = this.resumeTable.tableData[0].afterSelfCheck.hardnessUser.name;
        this.hardnessTime = this.resumeTable.tableData[0].afterSelfCheck.hardnessCheckTime;
      } else {
        this.EntryRecord.hardnessCheck1 = '';
        this.EntryRecord.hardnessCheck2 = '';
        this.EntryRecord.hardnessCheck3 = '' ;
        this.EntryRecord.hardnessCheck4 = '' ;
        this.EntryRecord.hardnessCheck5 = '';
        this.EntryRecord.hardnessCheck6 = '';
        this.EntryRecord.hardnessCheck7 = '';
        this.EntryRecord.unit1 = 'HSD';
        this.EntryRecord.unit2 = 'HSD';
        this.EntryRecord.isExempt = null;
        this.EntryRecord.exemptReason = '';
        this.hardnessUser = '';
        this.hardnessTime = null;
      }
    });
  }

}
