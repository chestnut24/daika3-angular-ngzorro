import {Component, Input, OnInit} from '@angular/core';
import {CoolingGun, CoolingPages, Product} from '../../../../../../public/interface/normalizing-cooling';
import {ConfigurationManagementService} from '../../../../../../services/configuration-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NormalizingCoolingService} from '../../../../../../services/normalizing-cooling.service';
import {NzMessageService} from 'ng-zorro-antd';
import {DelongTableService} from '../../../../../../services/delong-table.service';
import {ActualFlag, MonitorStatus} from '../../../../../../public/interface/quality-inspection-management';

@Component({
  selector: 'app-begin-cooling',
  templateUrl: './begin-cooling.component.html',
  styleUrls: ['./begin-cooling.component.scss']
})
export class BeginCoolingComponent implements OnInit {
  @Input() freight: CoolingPages;
  @Input() modal;
  @Input() state: number;
  NowKey = 999;
  startCooling = true; // 测温枪开启或关闭
  beginControl = true; // 是否开始监控
  stopControl = false; // 强制结束按钮和继续监控按钮 是否显示 默认为不显示
  warning = false;
  time = '';
  temp: FormGroup;
  itemList = [
    {title: '货号：', content: '货号'},
    {title: '材质：', content: '材质'},
    {title: '尺寸(mm)：', content: '尺寸(mm)'},
    {title: '生产编号：', content: '生产编号'},
    {title: '材质代码：', content: '材质代码'},
    {title: '净重（t）：', content: '净重（t）'},
  ];
  tempList = [
    {title: '目标温度（℃）：', content: '', name: 'targetTemp'},
    {title: '结束允许偏差（℃）：', content: '', name: 'endDeviation'},
    {title: '提醒结束温度（℃）：', content: '' , name: 'remindEndTemp'},
  ];
  selectTemp = '';
  timerGun;
  timerInternal;
  timerCount;
  gunList: CoolingGun[] = [];
  temperature: string;
  constructor(
      private configManagement: ConfigurationManagementService,
      private  fb: FormBuilder,
      private  normalizingCooling: NormalizingCoolingService,
      private messageService: NzMessageService,
      public delongTable: DelongTableService<CoolingPages>,
  ) { }

  ngOnInit() {
    this.getTemp();
    this.timerGun = setInterval(() => {
          this.getTemp();
    }, 20000);
    switch (this.freight.actualFlag) {
        case ActualFlag.MAX: {this.selectTemp = 'MAX'; break; }
        // case ActualFlag.MIN: {this.selectTemp = 'MIN'; break; }
        default: this.selectTemp = 'MAX';
    }
    this.itemList[0].content = this.freight.roll.freight.freightNumber;
    this.itemList[1].content = this.freight.roll.freight.material;
    this.itemList[2].content = this.freight.roll.freight.size;
    this.itemList[3].content = this.freight.roll.productNo;
    this.itemList[4].content = this.freight.roll.freight.materialCode;
    this.itemList[5].content = this.freight.roll.freight.netWeight;
      // tslint:disable-next-line:no-conditional-assignment
    if (this.state === 0 ) {
        this.normalizingCooling.getGun().subscribe((data) => {
            this.gunList = data;
        });
    } else {
        this.normalizingCooling.getWorkingGun(this.freight.id).subscribe( (data) => {
            console.log('data', data);
            this.beginControl = false;
            this.stopControl = false;
            this.gunList = data;
            this.timerInternal = setInterval(( ) => {
                        this.time = this.intervalTime(this.freight.startTime, new  Date());
                    }, 1000);
        });

    }

    this.temp = this.fb.group(
          {
              targetTemp: [this.freight.targetTemp, [ Validators.required ]],
              endDeviation: [this.freight.endDeviation, [ Validators.required ]],
              remindEndTemp: [this.freight.remindEndTemp, [ Validators.required ]],
          });

  }
    // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
        clearInterval(this.timerGun);
        clearInterval(this.timerInternal);
        clearInterval(this.timerCount);
  }
  SaveInformation(name , key) { // 保存数据
    if (key === 0) {
        this.normalizingCooling.saveCooling ({
            targetTemp: this.temp.value[name],
            id: Number(this.freight.id),
            rollId: this.freight.rollId
        }).subscribe(success => {
            this.messageService.create('success', `保存成功`);
            this.delongTable.settingInit();
        }, error => {
            this.messageService.create('error', `保存失败 ${error.error.message}`);
        });
    } else if (key === 1) {
        this.normalizingCooling.saveCooling ({
            endDeviation: this.temp.value[name],
            id: Number(this.freight.id),
            rollId: this.freight.rollId
        }).subscribe(success => {
            this.messageService.create('success', `保存成功`);
            this.delongTable.settingInit();
        }, error => {
            this.messageService.create('error', `保存失败 ${error.error.message}`);
        });
    } else {
        this.normalizingCooling.saveCooling ({
            remindEndTemp: this.temp.value[name],
            id: Number(this.freight.id),
            rollId: this.freight.rollId
        }).subscribe(success => {
            this.messageService.create('success', `保存成功`);
            this.delongTable.settingInit();
        }, error => {
            this.messageService.create('error', `保存失败 ${error.error.message}`);
        });
    }
  }
  getTemp(): void {
      if (this.freight.monitor == null) {
          this.temperature = '——℃';
      } else {
          this.temperature = this.freight.monitor.temp;
      }
      console.log('this.temperature', this.temperature);
  }
  start(key): void { // 开启测温枪
      this.NowKey = key;
      this.startCooling = !this.startCooling;
      console.log('id', this.gunList[this.NowKey].id);
  }
  begin(): void { // 开始监控
      this.normalizingCooling.saveCooling({
          id: Number(this.freight.id),
          actualFlag: this.selectTemp,
          deviceId: this.gunList[this.NowKey].id,
          saveType: MonitorStatus.START
      }).subscribe(success => {
          this.messageService.create('success', `开始监控`);
          this.delongTable.settingInit();
          this.beginControl = ! this.beginControl;
          this.normalizingCooling.begin = false;
          const currentTime = new Date();
          this.timerCount = setInterval(( ) => {
              this.time = this.intervalTime(currentTime, new Date() );
          }, 1000);
          this.delongTable.settingInit();
          this.delongTable.search();
          this.modal.modal.destroy();
      }, error => {
          if (this.selectTemp === '') {
              this.messageService.create('error', `请填写完整信息`);
          } else {
              this.messageService.create('error', `数据错误 ${error.error.message}`);
          }
      });
  }
  stop(): void { // 停止监控
      const minTemp = Number(this.freight.targetTemp) - Number(this.freight.endDeviation);
      if (Number(this.temperature) > minTemp) {
          this.normalizingCooling.saveCooling({
              id: Number(this.freight.id),
              actualFlag: this.selectTemp,
              deviceId: this.gunList[0].id,
              saveType: MonitorStatus.STOP
          }).subscribe( success => {
              this.beginControl = ! this.beginControl;
              this.time = '';
              this.temperature = '——℃';
              clearInterval(this.timerInternal);
              clearInterval(this.timerCount);
              this.delongTable.settingInit();
          }, error => {
              this.messageService.create('error', `数据错误 ${error.error.message}`);
          });
      } else {
          this.stopControl = true ;
          this.warning = true;
      }
  }
  forceStop(): void { // 强制结束
      this.normalizingCooling.saveCooling({
          id: Number(this.freight.id),
          actualFlag: this.selectTemp,
          deviceId: this.gunList[0].id,
          saveType: MonitorStatus.COERCE_STOP
      }).subscribe( success => {
          this.beginControl = true ;
          this.stopControl = false;
          this.warning = false;
          this.time = null;
          this.temperature = '——℃';
          clearInterval(this.timerInternal);
          clearInterval(this.timerCount);
          this.delongTable.settingInit();
      }, error => {
          this.messageService.create('error', `数据错误 ${error.error.message}`);
      });
  }
  continue(): void { // 继续监控
      this.normalizingCooling.saveCooling({
          id: Number(this.freight.id),
          actualFlag: this.selectTemp,
          deviceId: this.gunList[this.NowKey]? this.gunList[this.NowKey].id : this.gunList[0].id,
          saveType: MonitorStatus.CONTINUE
      }).subscribe( success => {
          this.stopControl = false;
          this.warning = false;
      }, error => {
          this.messageService.create('error', `数据错误 ${error.error.message}`);
      });
  }
    // 获取时间差
  intervalTime(startTime, endTime) {
        const date1 = new Date(startTime).getTime();  // 开始时间
        const date2 = new Date(endTime).getTime(); // 结束时间
        const date3 = date2 - date1;  // 时间差的毫秒数
        // 计算出相差天数
        const days = Math.floor(date3 / (24 * 3600 * 1000));
        // 计算出小时数
        const leave1 = date3 % (24 * 3600 * 1000);    // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000));
        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000);        // 计算小时数后剩余的毫秒数
        const  minutes = Math.floor(leave2 / (60 * 1000));
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000);      // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000);
        return  days + '天 ' + hours + '小时 ' + minutes +  '分钟' + seconds + '秒';
  }
}
