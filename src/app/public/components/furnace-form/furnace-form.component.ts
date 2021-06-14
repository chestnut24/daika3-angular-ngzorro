import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { EnterFurnaceService } from '../../../services/enter-furnace.service';
import { DetailInquiry } from '../../interface/enter-furnace';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-furnace-form',
  templateUrl: './furnace-form.component.html',
  styleUrls: ['./furnace-form.component.scss']
})
export class FurnaceFormComponent implements OnInit {
  @Input() tableData: DetailInquiry; // 从父组件获得的值对象，此对象是links下的detail中的具体对象
  @Input() readOnly = false; // 控制装炉显示是否只读，热处理时需要为true
  @Input() putOrTake = 'put'; // 控制炉子是出炉还是入炉 put是入炉 take是出炉
  @Output() initData = new EventEmitter(); // 调用父组件的重新获取值的函数
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enterFurnaceService: EnterFurnaceService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
  ) { }
  detailId: number; // 本详情的id
  readingText: string; // 电表读数
  checkReading: FormGroup;
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    // if (this.putOrTake === 'put' && this.tableData) {
    //   this.readingText = this.tableData.putMeterReading;
    // } else if (this.putOrTake === 'take' && this.tableData) {
    //   this.readingText = this.tableData.takeMeterReading;
    // }
  }
  ngOnInit() {
    this.detailId = this.route.snapshot.params.id;
    this.checkReading = this.fb.group(
      {
        furnaceReading: [null, [Validators.required, this.checkNum]]
      }
    );
    setTimeout(() => {
      if (this.putOrTake === 'put' && this.tableData) {
        this.readingText = this.tableData.putMeterReading;
      } else if (this.putOrTake === 'take' && this.tableData) {
        this.readingText = this.tableData.takeMeterReading;
      }
    }, 500);
  }
  saveReading(): void { // 保存电表读数
    if (this.putOrTake === 'put') { // 保存入炉电表读数
      this.enterFurnaceService.savePutMeter({
        id: this.detailId,
        putMeterReading: this.readingText
      }).subscribe(
        success => {
          this.messageService.create('success', '电表读数保存成功');
        }, error => {
          this.messageService.create('error', '电表读数保存失败');
        }
      );
    } else { // 保存出炉电表读数
      this.enterFurnaceService.saveTakeMeter({
        id: this.detailId,
        takeMeterReading: this.readingText
      }).subscribe(
        success => {
          this.messageService.create('success', '电表读数保存成功');
        }, error => {
          this.messageService.create('error', '电表读数保存失败');
        }
      );
    }
    this.initData.emit();
  }
  private checkNum(control: FormControl): { [key: string]: boolean } {
    if (!control.value) {  // 如果输入为空则返回空，相当于去空格
      return null;
    }
    if (!/^\d+(\.\d+)?$/.test(control.value)) {
      return { isNum: true };
    }
    return null;
  }
  myNumber(val: any): number {
    return Number(val);
  }

}
