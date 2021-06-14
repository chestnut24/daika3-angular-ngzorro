import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../public/shared.module';
import { ChargingPlanModuleComponent } from './charging-plan-module.component';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { ChargingScheduleComponent } from './components/charging-schedule/charging-schedule.component';
import { AddNewPlanComponent } from './components/add-new-plan/add-new-plan.component';
import { AddHeatTreatmentRollComponent } from './components/add-heat-treatment-roll/add-heat-treatment-roll.component';
import { SelectCraftComponent } from './components/select-craft/select-craft.component';
import { PlanInfoMsgComponent } from './components/plan-info-msg/plan-info-msg.component';
import { AddDeviceChooseComponent } from './components/add-device-choose/add-device-choose.component';
import { AddPlanCraftComponent } from './components/add-plan-craft/add-plan-craft.component';
import { EditPlanComponent } from './components/edit-plan/edit-plan.component';



@NgModule({
  declarations: [
    ChargingPlanModuleComponent,
    PlanListComponent,
    ChargingScheduleComponent,
    AddNewPlanComponent,
    AddHeatTreatmentRollComponent,
    SelectCraftComponent,
    PlanInfoMsgComponent,
    AddDeviceChooseComponent,
    AddPlanCraftComponent,
    EditPlanComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    AddHeatTreatmentRollComponent,
    SelectCraftComponent,
    AddDeviceChooseComponent
  ]
})
export class ChargingPlanModuleModule { }
