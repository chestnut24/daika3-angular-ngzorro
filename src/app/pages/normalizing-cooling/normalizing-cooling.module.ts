import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NormalizingCoolingComponent} from './normalizing-cooling.component';
import {CoolingComponent} from './components/cooling/cooling.component';
import {CoolingHistoryRecordComponent} from './components/cooling-history-record/cooling-history-record.component';
import {BeginCoolingComponent} from './components/cooling/component/begin-cooling/begin-cooling.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../public/shared.module';
import { CheckCoolingComponent } from './components/cooling-history-record/component/check-cooling/check-cooling.component';




@NgModule({
  declarations: [
    NormalizingCoolingComponent,
    CoolingComponent,
    CoolingHistoryRecordComponent,
    BeginCoolingComponent,
    CheckCoolingComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [
    NormalizingCoolingComponent,
    CoolingComponent,
    CoolingHistoryRecordComponent,
    BeginCoolingComponent,
    CheckCoolingComponent]
})
export class NormalizingCoolingModule { }
