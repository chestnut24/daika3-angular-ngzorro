import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityInspectionManagementComponent } from './quality-inspection-management.component';
import { BeforeSelfTestComponent } from './components/before-self-test/before-self-test.component';
import { BeforeQualityComponent } from './components/before-quality/before-quality.component';
import { BeforeUnqualifiedComponent } from './components/before-unqualified/before-unqualified.component';
import { AfterSelfTestComponent } from './components/after-self-test/after-self-test.component';
import { AfterQualityComponent } from './components/after-quality/after-quality.component';
import { AfterUnqualifiedComponent } from './components/after-unqualified/after-unqualified.component';
import {SharedModule} from '../../public/shared.module';
import { QimSearchParamsComponent } from './components/qim-search-params/qim-search-params.component';
import { QualityResultModalComponent } from './components/quality-result-modal/quality-result-modal.component';
import { QualityInspectionApprovalComponent } from './components/quality-inspection-approval/quality-inspection-approval.component';
import { SelfTestModalComponent } from './components/self-test-modal/self-test-modal.component';



@NgModule({
  declarations: [QualityInspectionManagementComponent, BeforeSelfTestComponent, BeforeQualityComponent, BeforeUnqualifiedComponent, AfterSelfTestComponent, AfterQualityComponent, AfterUnqualifiedComponent, QimSearchParamsComponent, QualityResultModalComponent, QualityInspectionApprovalComponent, SelfTestModalComponent, QualityInspectionManagementComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [QualityResultModalComponent, QualityInspectionApprovalComponent, SelfTestModalComponent]
})
export class QualityInspectionManagementModule { }
