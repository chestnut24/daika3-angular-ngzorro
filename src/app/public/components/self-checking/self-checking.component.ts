import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntryRecordAdd } from '../../interface/entry-record';
import { IsExempt } from '../../interface/quality-inspection-management';

@Component({
  selector: 'app-self-checking',
  templateUrl: './self-checking.component.html',
  styleUrls: ['./self-checking.component.scss']
})
export class SelfCheckingComponent implements OnInit {
  @Input() EntryRecord: EntryRecordAdd; // 入厂记录
  @Input() disabled; // input无效项 分为canInput1: 免检原因是否可输入 ；canInput2： 硬度传端到非端可否输入； canInput3: 外观检验信息是否可输入 ； canInput4: 硬度免检可否被check
  @Input() checkUser: string; // 外观检验自检人
  @Input() currentTime: number; // 外观检验自检时间
  @Input() IfChecking = true; // 是否显示外观自检
  @Input() showTime = false; // 是否显示时间
  @Input() hardnessUser: string; // 硬度检验自检人
  @Input() hardnessTime: number; // 硬度检验自检时间
  @Input() title = '自检信息';
  @Input() Hardness0721 = {
    bodyHardness: null,
    neckHardness: null
  }; // 硬度要求
  checkList: FormGroup;
  Exmpt: FormGroup;


  // 单位HSD/HLD/HSC/HRC/HB（默认HSD）
  unitList = [
    { data: 'HSD' },
    { data: 'HLD' },
    { data: 'HSC' },
    { data: 'HRC' },
    { data: 'HB' },
  ];
  constructor(
    private fb: FormBuilder,

  ) { }
  ngOnInit() {
    if (this.EntryRecord.isExempt) {
      this.disabled.canInput1 = false;
      this.disabled.canInput2 = true;
    } else {
      this.disabled.canInput1 = true;
      this.disabled.canInput2 = false;
    }
    this.checkList = this.fb.group(
      {
        hardnessCheck1: ['', [this.isNumber]],
        hardnessCheck2: ['', [this.isNumber]],
        hardnessCheck3: ['', [this.isNumber]],
        hardnessCheck4: ['', [this.isNumber]],
        hardnessCheck5: ['', [this.isNumber]],
        hardnessCheck6: ['', [this.isNumber]],
        hardnessCheck7: ['', [this.isNumber]],
        unit1: ['HSD'],
        unit2: ['HSD'],
      });
    this.Exmpt = this.fb.group(
      {
        exemptReason: ['', [Validators.required]]
      });

  }
  hardExempt() {
    this.disabled.canInput1 = !this.EntryRecord.isExempt;
    this.disabled.canInput2 = this.EntryRecord.isExempt;
  }
  private isNumber(control: FormControl): { [key: string]: boolean } {
    if (isNaN(control.value) || control.value < 0) {
      return { sizeError: true };
    }
    return null;
  }
  private checkSpace(control: FormControl): { [key: string]: boolean } {
    if (!control.value) {  // 如果输入为空则返回空，相当于去空格
      return null;
    }
    if (/^[\s]*$/.test(control.value)) {
      return { isSpace: true };
    }
    return null;
  }
  changeProductPeople(data) {
    console.log(data);
    // if (data !== this.EntryRecord.unit1) {
    //   this.EntryRecord.unit1 = data;
    // }
  }
  changeProductPeopleA(data) {
    if (data !== this.EntryRecord.unit11) {
      this.EntryRecord.unit11 = data;
    }
  }


}
