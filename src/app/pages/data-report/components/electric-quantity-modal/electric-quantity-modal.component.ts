import { Component, OnInit } from '@angular/core';
import {ConfigurationManagementService} from '../../../../services/configuration-management.service';
import {DataReportService} from '../../../../services/data-report.service';

@Component({
  selector: 'app-electric-quantity-modal',
  templateUrl: './electric-quantity-modal.component.html',
  styleUrls: ['./electric-quantity-modal.component.scss']
})
export class ElectricQuantityModalComponent implements OnInit {
  leftList = [];
  midList = [];
  rightList = [];
  constructor(private configurationManagement: ConfigurationManagementService, public dateReport: DataReportService) { }

  ngOnInit() {
    this.configurationManagement.getProductionTypeList().subscribe(data => {
      this.leftList = data.map(item => item.list)
      // @ts-ignore
      .flat();
    });
  }

  hasEmpty() {
    return this.rightList.length === 0;
  }
  leftClick(item) {
    this.leftList.forEach((data) => {
      data.isActive = false;
    });
    item.isActive = true;
    this.getDeviceList(item.id);
  }
  // 获取设备列表
  getDeviceList(id: number): void {
    this.configurationManagement.getProductFindList({
      pageNum: '0',
      pageSize: '99999',
      typeid: id.toString()
    }).subscribe(data => {
      this.midList = data.content;
    });
  }

  midClick(item) {
    this.midList.forEach((data) => {
      data.isActive = false;
    });
    item.isActive = true;
    const arr = this.rightList.filter(right => right.id === item.id);
    if (!(arr && arr.length)) {
      this.rightList.push(item);
    }
  }

  delete(right) {
    this.rightList = this.rightList.filter(item => item !== right);
  }

  addItems() {
    const option = this.rightList.map(item => {
      return {
        id: item.id,
        powerMultiple: item.powerMultiple
      };
    });
    return this.dateReport.savePowerMultiple(option);
  }
}
