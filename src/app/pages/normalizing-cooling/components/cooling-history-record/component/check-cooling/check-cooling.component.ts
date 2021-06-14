import {Component, Input, OnInit} from '@angular/core';
import {CoolingDetails} from '../../../../../../public/interface/normalizing-cooling';
import {ConfigurationManagementService} from '../../../../../../services/configuration-management.service';

@Component({
  selector: 'app-check-cooling',
  templateUrl: './check-cooling.component.html',
  styleUrls: ['./check-cooling.component.scss']
})
export class CheckCoolingComponent implements OnInit {
    @Input() freight: CoolingDetails;
     selectTemp: string;
    time = '';
    name = '';
    temperature = '';
    NowKey = 999;
    itemList = [
        {title: '货号：', content: '货号'},
        {title: '材质：', content: '材质'},
        {title: '尺寸(mm)：', content: '尺寸(mm)'},
        {title: '生产编号：', content: '生产编号'},
        {title: '材质代码：', content: '材质代码'},
        {title: '净重（t）：', content: '净重（t）'},
    ];
    tempList = [
        {title: '目标温度（℃）：', content: ''},
        {title: '结束允许偏差（℃）：', content: ''},
        {title: '提醒结束温度（℃）：', content: '' }
    ];

    constructor(
        private configManagement: ConfigurationManagementService
    ) { }

    ngOnInit() {
        this.time = this.intervalTime(this.freight.startTime , this.freight.endTime);
        this.name = this.freight.endDeviveName;
        this.temperature = this.freight.actualEndTemp;
        this.tempList[0].content = this.freight.targetTemp;
        this.tempList[1].content = this.freight.endDeviation;
        this.tempList[2].content = this.freight.remindEndTemp;
        // this.selectTemp = this.freight.actualFlag === 'MAX' ? 'MAX' : 'MIN';
        this.selectTemp = 'MAX';
        this.itemList[0].content = this.freight.roll.freight.freightNumber;
        this.itemList[1].content = this.freight.roll.freight.material;
        this.itemList[2].content = this.freight.roll.freight.size;
        this.itemList[3].content = this.freight.roll.productNo;
        this.itemList[4].content = this.freight.roll.freight.materialCode;
        this.itemList[5].content = this.freight.roll.freight.netWeight;
    }
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
