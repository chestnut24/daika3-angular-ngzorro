import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RollDetailComponent } from './roll-detail.component';
import { RollResumeComponent } from './roll-resume/roll-resume.component';
import {RouterModule} from '@angular/router';
import {NzTabsModule} from 'ng-zorro-antd';
import { EntryRecordResumeComponent } from './roll-resume/components/entry-record-resume/entry-record-resume.component';
import { BeforeQualityResumeComponent } from './roll-resume/components/before-quality-resume/before-quality-resume.component';
import { RecordResumeComponent } from './roll-resume/components/record-resume/record-resume.component';
import {SharedModule} from '../../public/shared.module';
import { ChargingPlanResumeComponent } from './roll-resume/components/charging-plan-resume/charging-plan-resume.component';
import { EnterFurnaceResumeComponent } from './roll-resume/components/enter-furnace-resume/enter-furnace-resume.component';
import { TakeFurnaceResumeComponent } from './roll-resume/components/take-furnace-resume/take-furnace-resume.component';
import { HeatTreatmentResumeComponent } from './roll-resume/components/heat-treatment-resume/heat-treatment-resume.component';
// tslint:disable-next-line:max-line-length
import { NormalizingCoolingResumeComponent } from './roll-resume/components/normalizing-cooling-resume/normalizing-cooling-resume.component';
import { AfterQualityResumeComponent } from './roll-resume/components/after-quality-resume/after-quality-resume.component';
import { ResumeTableComponent } from './roll-resume/components/resume-table/resume-table.component';
import { RollDetailFormComponent } from './roll-detail-form/roll-detail-form.component';
import { CraftShowModalComponent } from './roll-resume/components/craft-show-modal/craft-show-modal.component';
import { SeeHeatTreatmentDetailComponent } from './roll-resume/components/see-heat-treatment-detail/see-heat-treatment-detail.component';



@NgModule({
  declarations: [RollDetailComponent, RollResumeComponent, EntryRecordResumeComponent, BeforeQualityResumeComponent
      , RecordResumeComponent, ChargingPlanResumeComponent, EnterFurnaceResumeComponent, TakeFurnaceResumeComponent
      , HeatTreatmentResumeComponent, NormalizingCoolingResumeComponent, AfterQualityResumeComponent, ResumeTableComponent
      , RollDetailFormComponent, CraftShowModalComponent, SeeHeatTreatmentDetailComponent],
    imports: [
        CommonModule,
        RouterModule,
        NzTabsModule,
        SharedModule,
    ],
    entryComponents: [
        CraftShowModalComponent
    ]
})
export class RollDetailModule { }
