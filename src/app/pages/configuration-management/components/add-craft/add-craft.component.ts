import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApprovalStatus,
  Craft,
  Curves,
  MaterialRange,
  SpeedupType,
  TemperatureType
} from '../../../../public/interface/configuration-management';
import * as echarts from 'echarts';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CraftApprovalsComponent } from '../craft-approvals/craft-approvals.component';
import { ApprovalsCraftInfoComponent } from '../approvals-craft-info/approvals-craft-info.component';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { PreliminaryOrFinalPipe } from '../../../../public/pipes';

@Component({
  selector: 'app-add-craft',
  templateUrl: './add-craft.component.html',
  styleUrls: ['./add-craft.component.scss']
})
export class AddCraftComponent implements OnInit, AfterViewInit, OnDestroy {
  craftForm: FormGroup;
  craftCanvasContainer;
  isSee = false;
  materialRange;
  materialRangeList: Array<string>;
  testCanvasData: Curves[] = [
    {
      deviation: '30',
      duration: null,
      remark: '备注223232',
      speedupType: SpeedupType.FULL_SPEED,
      temperature: 200,
      temperatureType: TemperatureType.ROLL_TEMPERATURE
    },
    {
      deviation: '55',
      duration: 180,
      remark: '备注223232',
      speedupType: SpeedupType.NORMAL,
      temperature: 400,
      temperatureType: TemperatureType.ROLL_TEMPERATURE
    },
    {
      deviation: '55',
      duration: null,
      remark: '备注223232',
      speedupType: SpeedupType.FULL_SPEED,
      temperature: 600,
      temperatureType: TemperatureType.ROLL_TEMPERATURE
    },
    {
      deviation: '55',
      duration: 300,
      remark: '备注223232',
      speedupType: SpeedupType.CONSTANT,
      temperature: 600,
      temperatureType: TemperatureType.ROLL_TEMPERATURE
    },
    {
      deviation: '55',
      duration: 20,
      remark: '备注223232',
      speedupType: SpeedupType.FURNACE_COOLING,
      temperature: 200,
      temperatureType: TemperatureType.ROLL_TEMPERATURE
    },
  ];
  specificationRange = {
    range1: null,
    range2: null,
    range3: null,
    range4: null,
  };
  hardnessRange = {
    range1: null,
    range2: null
  };
  approvalStatus;
  craftId;
  get getCurves() {
    return this.craftForm.get('curves') as FormArray;
  }
  get getBorderColor() {
    return (this.hardnessRange.range1 && this.hardnessRange.range2 && Number(this.hardnessRange.range2) < Number(this.hardnessRange.range1)) ? 'red' : '#e8e8e8'
  }
  resizeListener = () => {
    if (this.craftCanvasContainer) {
      this.craftCanvasContainer.resize();
    }
  }
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private message: NzMessageService,
    private modalService: NzModalService,
    private configurationManagement: ConfigurationManagementService) { }

  ngOnInit() {
    this.craftId = this.route.snapshot.paramMap.get('craftId');
    this.isSee = this.router.url.split('/')[2] === 'seeCraft' || this.router.url.split('/')[3] === 'seeCraft';
    this.craftForm = this.fb.group({
      id: [this.craftId ? this.craftId : null],
      name: [null, [Validators.required]],
      craftNo: [null, [Validators.required]],
      materialRange: [null,],
      specificationRange: [null,],
      hardnessRange: [null,],
      applicableDevice: [null,],
      machineHour: [null,],
      tooling: [null,],
      needCooling: [null, [Validators.required]],
      remark: [null,],
      curveImgPath: [null],
      curves: this.fb.array([])
    });
    if (this.craftId) {
      // 发个请求，请求到当前id的工艺信息再给craftForm赋值
      this.getCraftFormId();

    }
    this.testCanvasData = JSON.parse(JSON.stringify(this.craftForm.value.curves));
    this.craftForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      this.testCanvasData = JSON.parse(JSON.stringify(this.craftForm.value.curves));
      this.initECharts();
    });

    this.configurationManagement.getCraftMaterials().subscribe(data => {
      this.materialRangeList = Array.from(new Set(data.content.map(item => item.material + '-' + item.materialCode)));
    });
  }
  ngAfterViewInit() {
    this.craftCanvasContainer = echarts.init(document.getElementById('craftCanvas'));
    this.initECharts();
    window.addEventListener('resize', this.resizeListener);
  }

  cancellationTime = {
    cancellationTime: null,
    cancellationName: null
  };
  getCraftFormId() {
    this.configurationManagement.getCraftFormId(this.craftId).subscribe(data => {
      this.approvalStatus = data.approvalStatus;
      this.cancellationTime = {
        cancellationTime: data.cancellationTime,
        cancellationName: data.cancellationName
      };
      this.craftForm.patchValue({
        name: data.name,
        craftNo: data.craftNo,
        materialRange: data.materialRange ? data.materialRange.split(',') : data.materialRange,
        specificationRange: data.specificationRange,
        hardnessRange: data.hardnessRange,
        applicableDevice: data.applicableDevice,
        machineHour: data.machineHour,
        tooling: data.tooling,
        needCooling: data.needCooling,
        remark: data.remark,
      });
      this.getCurves.clear();
      data.curves.forEach(item => {
        this.getCurves.push(this.fb.group({
          speedupType: [item.speedupType],
          duration: [item.duration],
          temperature: [item.temperature],
          temperatureType: [item.temperatureType],
          deviation: [item.deviation],
          remark: [item.remark],
        }));
      });
      const [range1, range2, range3, range4] = data.specificationRange ?
        data.specificationRange.split(',') : [null, null, null, null];
      this.specificationRange = {
        range1,
        range2,
        range3,
        range4,
      };
      this.hardnessRange = {
        range1: data.hardnessRange ? data.hardnessRange.split(',')[0] : null,
        range2: data.hardnessRange ? data.hardnessRange.split(',')[1] : null,
      };
      this.materialRange = data.materialRange ? data.materialRange.split(',') : null;
    });
  }

  deleteCurve(index: number): void {
    this.getCurves.removeAt(index);
  }

  addCurve(): void {
    this.getCurves.push(this.fb.group({
      speedupType: [null,],
      duration: [null,],
      temperature: [null,],
      temperatureType: [null,],
      deviation: [null,],
      remark: [null,],
    }));
  }

  speedupTypeChange(e: SpeedupType, curve: AbstractControl): void {
    curve.patchValue({
      duration: null,
      temperature: null,
      temperatureType: null,
      deviation: null,
      remark: null,
    });
  }

  initECharts(): void {
    this.testCanvasData.unshift({
      deviation: null,
      duration: null,
      remark: null,
      speedupType: null,
      temperature: 0,
      temperatureType: null,
      interval: true
    });
    this.testCanvasData.map((item) => {
      item.interval = true;
      item.duration = Number(item.duration);
      item.temperature = Number(item.temperature);
      if (item.speedupType === SpeedupType.FULL_SPEED) {
        item.duration = 30;
        item.width = 1;
      } else if (item.speedupType === SpeedupType.FURNACE_COOLING) {
        // item.duration = Math.floor(Number(item.temperature) / Number(item.duration));
        // item.width = item.duration / 30 > 5 ? 5  : Math.ceil(item.duration / 30);
        item.width = 5;
      } else {
        item.width = item.duration / 30 > 5 ? 5 : Math.ceil(item.duration / 30);
      }
    });
    for (let len = 1; len < this.testCanvasData.length; len++) {
      const item = this.testCanvasData[len];
      if (item.width && item.width > 1) {
        const prevPoint = this.testCanvasData[len - 1];
        const nowPoint = this.testCanvasData[len];
        const everyTemperature = Math.floor((nowPoint.temperature - prevPoint.temperature) / item.width);
        for (let i = 1; i < item.width; i++, len++) {
          this.testCanvasData.splice(len, 0, {
            deviation: null,
            duration: null,
            remark: null,
            speedupType: item.speedupType,
            temperature: prevPoint.temperature + everyTemperature * i,
            temperatureType: item.temperatureType,
            interval: false
          });
        }
      }
    }
    const option = {
      tooltip: {
        formatter: (params) => {
          const data = this.testCanvasData[params.dataIndex];
          return `${data.temperature}℃ \n\n ${this.temperatureType2text(data.temperatureType)}`;
        },
        // trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.testCanvasData.map(item => item.interval),
        axisLabel: {
          formatter: (value, i) => {
            return this.speedupType2yAxis(this.testCanvasData[i]);
          },
          interval: (index: number, value: string) => {
            return this.testCanvasData[index].interval;
          },
          align: 'right'
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: this.testCanvasData.map(item => item.temperature),
        type: 'line',
        symbolSize: (value, params) => {
          return this.testCanvasData[params.dataIndex].interval ? 8 : 0;
        },
        lineStyle: {
          color: '#1890FF'
        },
        itemStyle: {
          color: '#1890FF',
        },
        label: {
          show: true,
          formatter: (v) => {
            return `${this.testCanvasData[v.dataIndex].temperature}℃\n${this.temperatureType2text(this.testCanvasData[v.dataIndex].temperatureType)}`;
          },
          fontSize: '16',
          color: ''
        }
      }],
    };
    this.craftCanvasContainer.setOption(option);
  }

  speedupType2yAxis(item: Curves): string | number {
    switch (item.speedupType) {
      case SpeedupType.FULL_SPEED: return '全速';
      case SpeedupType.NORMAL: return `常规${item.duration}min`;
      case SpeedupType.CONSTANT: return `恒温${item.duration}min`;
      case SpeedupType.FURNACE_COOLING: return `炉冷${item.duration}℃/h`;
      default: return item.duration;
    }
  }

  temperatureType2text(temperatureType: TemperatureType): string {
    switch (temperatureType) {
      case TemperatureType.FURNACE_TEMPERATURE: return '炉温';
      case TemperatureType.ROLL_TEMPERATURE: return '辊温';
      default: return '无';
    }
  }

  craftApprovals(): void {
    const modal = this.modalService.create({
      nzTitle: '审批记录',
      nzWidth: '700px',
      nzComponentParams: { craft: Object.assign({}, this.craftForm.value, { approvalStatus: this.approvalStatus }) },
      nzContent: CraftApprovalsComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
      ]
    });
  }

  approvalsCraftInfo(): void {
    let showload = false;
    const modal = this.modalService.create({
      nzTitle: '审批工艺信息',
      nzWidth: '700px',
      nzComponentParams: { craft: Object.assign({}, this.craftForm.value, { approvalStatus: this.approvalStatus }) },
      nzContent: ApprovalsCraftInfoComponent,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '驳回',
          shape: 'danger',
          loading: () => showload,
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            this.configurationManagement.saveCraftApproval({
              craftId: this.craftId,
              comments: cci.text,
              stage: new PreliminaryOrFinalPipe().transform(this.approvalStatus),
              result: ApprovalStatus.NOT_APPROVAL
              // result: new PreliminaryOrFinalPipe().transform(this.approvalStatus) === '初审'
              //     ? ApprovalStatus.FIRST_REJECTED : ApprovalStatus.SECOND_REJECTED
            }).subscribe(data => {
              this.message.success('保存成功');
              this.getCraftFormId();
              showload = false;
              modal.destroy();
            }, error => {
              this.message.error(`保存失败 ${error.error.message}`);
              showload = false;
            });
          }
        },
        {
          label: '通过',
          type: 'primary',
          loading: () => showload,
          onClick: (contentComponentInstance) => {
            showload = true;
            const cci = contentComponentInstance;
            this.configurationManagement.saveCraftApproval({
              craftId: this.craftId,
              comments: cci.text,
              stage: new PreliminaryOrFinalPipe().transform(this.approvalStatus),
              result: ApprovalStatus.APPROVAL
              // result:  new PreliminaryOrFinalPipe().transform(this.approvalStatus) === '初审'
              //     ? ApprovalStatus.FIRST_APPROVED : ApprovalStatus.SECOND_APPROVED
            }).subscribe(data => {
              this.message.success('保存成功');
              this.getCraftFormId();
              showload = false;
              modal.destroy();
            }, error => {
              this.message.error(`保存失败 ${error.error.message}`);
              showload = false;
            });
          }
        }
      ]
    });
  }

  saveCraft(): void {
    this.craftForm.patchValue({
      specificationRange: this.specificationRange ? Object.values(this.specificationRange).join(',') : this.specificationRange,
      hardnessRange: this.hardnessRange ? Object.values(this.hardnessRange).join(',') : this.hardnessRange,
      materialRange: this.materialRange ? Object.values(this.materialRange).join(',') : this.materialRange,
      curveImgPath: document.getElementsByTagName('canvas')[0].toDataURL('image/png')
    });
    this.configurationManagement.addCraft(this.craftForm.value).subscribe(data => {
      this.message.success('保存成功');
      this.getCraftFormId();
    }, error => {
      this.message.error(`保存失败 ${error.error.message}`);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  hasRedBorder(index): string {
    if (index > 0) {
      const curves = this.craftForm.value.curves;
      if (curves && curves.length) {
        const bool = (curves[index].speedupType === SpeedupType.FURNACE_COOLING && Number(curves[index].temperature) > Number(curves[index - 1].temperature))
          || ((curves[index].speedupType === SpeedupType.FULL_SPEED || curves[index].speedupType === SpeedupType.NORMAL) && Number(curves[index].temperature) < Number(curves[index - 1].temperature))
          || (curves[index].speedupType === SpeedupType.CONSTANT && curves[index].temperature != curves[index - 1].temperature);
        if (bool) {
          return 'red';
        }
      }
    }
    return '#e8e8e8';
  }
}
