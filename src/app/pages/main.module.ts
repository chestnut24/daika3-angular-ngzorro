import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { ConfigurationManagementModule } from './configuration-management/configuration-management.module';
import { SharedModule } from '../public/shared.module';
import { EntryRecordModule } from './entry-record/entry-record.module';
import { EnterFurnaceModule } from './enter-furnace/enter-furnace.module';
// 装炉计划
import { QualityInspectionManagementModule } from './quality-inspection-management/quality-inspection-management.module';
import { ChargingPlanModuleModule } from './charging-plan-module/charging-plan-module.module';
// 出厂管理
import { FactoryManagementModule } from './factory-management/factory-management.module';
import {NormalizingCoolingModule} from './normalizing-cooling/normalizing-cooling.module';
import {TakeFurnaceModule} from './take-furnace/take-furnace.module';
import { NormalizingCoolingComponent } from './normalizing-cooling/normalizing-cooling.component';
import {HeatTreatmentModule} from './heat-treatment/heat-treatment.module';
import {DataReportModule} from './data-report/data-report.module';
import {RollDetailModule} from './roll-detail/roll-detail.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    ConfigurationManagementModule,
    SharedModule,
    EntryRecordModule,
    ChargingPlanModuleModule,
    FactoryManagementModule,
    QualityInspectionManagementModule,
    EnterFurnaceModule,
    HeatTreatmentModule,
    NormalizingCoolingModule,
    TakeFurnaceModule,
    DataReportModule,
    RollDetailModule,
  ]
})
export class MainModule { }
