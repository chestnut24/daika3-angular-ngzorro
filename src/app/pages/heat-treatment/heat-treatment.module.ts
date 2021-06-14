import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatTreatmentComponent } from './heat-treatment.component';
import { HeatTreatmentDetailComponent } from './components/heat-treatment-detail/heat-treatment-detail.component';
import {SharedModule} from '../../public/shared.module';
import { HeatTreatmentDeviceComponent } from './components/heat-treatment-device/heat-treatment-device.component';
import { HtDetailModalComponent } from './components/ht-detail-modal/ht-detail-modal.component';
import { StandardProcessCurveModalComponent } from './components/standard-process-curve-modal/standard-process-curve-modal.component';
import { AlarmRecordModalComponent } from './components/alarm-record-modal/alarm-record-modal.component';
import { HeatTreatmentHistoryComponent } from './components/heat-treatment-history/heat-treatment-history.component';



@NgModule({
  declarations: [HeatTreatmentComponent, HeatTreatmentDetailComponent, HeatTreatmentDeviceComponent, HtDetailModalComponent, StandardProcessCurveModalComponent, AlarmRecordModalComponent, HeatTreatmentHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  entryComponents: [HtDetailModalComponent, StandardProcessCurveModalComponent, AlarmRecordModalComponent]
})
export class HeatTreatmentModule { }
