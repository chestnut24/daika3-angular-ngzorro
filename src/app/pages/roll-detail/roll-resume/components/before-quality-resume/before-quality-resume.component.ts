import { Component, OnInit } from '@angular/core';
import { ResumeTableService } from '../../../../../services/resume-table.service';
import {
  AfterQuality, BeforeNgDeal,
  BeforeQuality, BeforeSecondCheck,
  CheckRecords,
  CheckRecordsBefore, CheckUser,
} from '../../../../../public/interface/roll-resume';
import { RollResumeService } from '../../../../../services/roll-resume.service';
import { Check, IsExempt } from '../../../../../public/interface/quality-inspection-management';
import { TitleType } from '../../../../../public/components/delong-table/delong-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-before-quality-resume',
  templateUrl: './before-quality-resume.component.html',
  styleUrls: ['./before-quality-resume.component.scss']
})
export class BeforeQualityResumeComponent implements OnInit {
  beforeQualityList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: '' },
    { name: '质检人', canSort: false, sortField: '' },
    { name: '化学检验', canSort: false, sortField: '' },
    { name: '探伤检验', canSort: false, sortField: '' },
    { name: '硬度检验', canSort: false, sortField: '' },
    { name: '金相检验', canSort: false, sortField: '' },
    { name: '尺寸检验', canSort: false, sortField: '' },
    { name: '热前质检结果', canSort: false, sortField: '' },
  ];
  unQualifyList: Array<TitleType> = [
    { name: '审批时间', canSort: false, sortField: '' },
    { name: '处理人', canSort: false, sortField: '' },
    { name: '质检结果处理', canSort: false, sortField: '' },
    { name: '备注', canSort: false, sortField: '' },
  ];
  secondQualityList: Array<TitleType> = [
    { name: '质检时间', canSort: false, sortField: '' },
    { name: '质检人', canSort: false, sortField: '' },
    { name: '化学检验', canSort: false, sortField: '' },
    { name: '探伤检验', canSort: false, sortField: '' },
    { name: '硬度检验', canSort: false, sortField: '' },
    { name: '金相检验', canSort: false, sortField: '' },
    { name: '尺寸检验', canSort: false, sortField: '' },
    { name: '热前质检结果', canSort: false, sortField: '' },
  ];
  UnqualifiedProducts: Array<BeforeNgDeal> = [
    {
      remark: '',
      updatedDt: null,
      checkUser: null,
      result: null
    }
  ];
  SecondCheck: Array<BeforeSecondCheck> = [
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
    exteriorCheck: '', // 外观检验
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
  IfChecking = true;
  title = '热前自检';
  showTable = true;
  checkUser: string;
  currentTime: number;
  rollId: string;
  Hardness0721 = {
    bodyHardness: null,
    neckHardness: null,
  };
  constructor(
    public resumeTable: ResumeTableService<BeforeQuality<CheckRecordsBefore>>,
    public rollResume: RollResumeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.rollId = this.router.url.split('/')[4];
    this.resumeTable.observeFunction = this.rollResume.getBeforeQuality.bind(this.rollResume);
    // tslint:disable-next-line:no-unused-expression
    this.resumeTable.searchParams = {
      rollId: this.rollId,
    };
    this.resumeTable.search();
    this.resumeTable.afterSearch.subscribe(() => {
      console.log('test2', this.resumeTable.tableData);
      this.Hardness0721 = this.resumeTable.tableData[0].freight;
      console.log('16', this.resumeTable.tableData[0].beforeSelfCheck);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0, k = 0, j = 0; i < this.resumeTable.tableData[0].checkRecords.length; i++) {
        if (this.resumeTable.tableData[0].checkRecords[i].type === Check.BEFORE_NG_DEAL) {
          this.UnqualifiedProducts[k] = this.resumeTable.tableData[0].checkRecords[i].beforeNgDeal;
          k++;
        }
        if (this.resumeTable.tableData[0].checkRecords[i].type === Check.BEFORE_SECOND_CHECK) {
          this.SecondCheck[j] = this.resumeTable.tableData[0].checkRecords[i].beforeSecondCheck;
          j++;
          console.log('this.SecondCheck', this.SecondCheck);
        }
      }
      if (this.resumeTable.tableData[0].beforeSelfCheck) {
        this.EntryRecord.exteriorCheck = this.resumeTable.tableData[0].beforeSelfCheck.exteriorCheck;
        this.EntryRecord.hardnessCheck1 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck1;
        this.EntryRecord.hardnessCheck2 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck2;
        this.EntryRecord.hardnessCheck3 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck3;
        this.EntryRecord.hardnessCheck4 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck4;
        this.EntryRecord.hardnessCheck5 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck5;
        this.EntryRecord.hardnessCheck6 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck6;
        this.EntryRecord.hardnessCheck7 = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheck7;
        this.EntryRecord.unit1 = this.resumeTable.tableData[0].beforeSelfCheck.unit1;
        this.EntryRecord.unit2 = this.resumeTable.tableData[0].beforeSelfCheck.unit2;
        this.EntryRecord.isExempt = this.resumeTable.tableData[0].beforeSelfCheck.isExempt === IsExempt.YES;
        this.EntryRecord.exemptReason = this.resumeTable.tableData[0].beforeSelfCheck.exemptReason;
        // tslint:disable-next-line:max-line-length
        this.hardnessUser = this.resumeTable.tableData[0].beforeSelfCheck.hardnessUser ? this.resumeTable.tableData[0].beforeSelfCheck.hardnessUser.name : '';
        this.hardnessTime = this.resumeTable.tableData[0].beforeSelfCheck.hardnessCheckTime;
        // tslint:disable-next-line:max-line-length
        this.checkUser = this.resumeTable.tableData[0].beforeSelfCheck.exteriorUser ? this.resumeTable.tableData[0].beforeSelfCheck.exteriorUser.name : '';
        this.currentTime = this.resumeTable.tableData[0].beforeSelfCheck.exteriorCheckTime;
      } else {
        this.EntryRecord.exteriorCheck = '';
        this.EntryRecord.hardnessCheck1 = '';
        this.EntryRecord.hardnessCheck2 = '';
        this.EntryRecord.hardnessCheck3 = '';
        this.EntryRecord.hardnessCheck4 = '';
        this.EntryRecord.hardnessCheck5 = '';
        this.EntryRecord.hardnessCheck6 = '';
        this.EntryRecord.hardnessCheck7 = '';
        this.EntryRecord.unit1 = 'HSD';
        this.EntryRecord.unit2 = 'HSD';
        this.EntryRecord.isExempt = null;
        this.EntryRecord.exemptReason = '';
        this.hardnessUser = '';
        this.hardnessTime = null;
        this.checkUser = '';
        this.currentTime = null;
      }

    });
  }

}
