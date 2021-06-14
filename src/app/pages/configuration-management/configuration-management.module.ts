import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraftManagementComponent } from './components/craft-management/craft-management.component';
import { AddCraftComponent } from './components/add-craft/add-craft.component';
import { SharedModule } from '../../public/shared.module';
import { ConfigurationManagementComponent } from './configuration-management.component';
import { DeviceProductManagementComponent } from './components/device-product-management/device-product-management.component';
import { DeviceProductFormComponent } from './components/device-product-management/device-product-form/device-product-form.component';
import { DeviceMonitorManagementComponent } from './components/device-monitor-management/device-monitor-management.component';
import { DeviceMonitorFormComponent } from './components/device-monitor-management/device-monitor-form/device-monitor-form.component';
import { ModificationLogComponent } from './components/modification-log/modification-log.component';
import { NzShowComponentComponent } from './components/modification-log/component/nz-show-component/nz-show-component.component';
import { CraftApprovalsComponent } from './components/craft-approvals/craft-approvals.component';
import { ApprovalsCraftInfoComponent } from './components/approvals-craft-info/approvals-craft-info.component';
import { NumberManagementComponent } from './components/number-management/number-management.component';
import { AddFreightComponent } from './components/number-management/component/add-freight/add-freight.component';



@NgModule({
  declarations: [CraftManagementComponent, AddCraftComponent, ConfigurationManagementComponent,
    ModificationLogComponent, NzShowComponentComponent, CraftApprovalsComponent, ApprovalsCraftInfoComponent,
    DeviceProductManagementComponent, DeviceProductFormComponent, DeviceMonitorManagementComponent, DeviceMonitorFormComponent,
    ModificationLogComponent, NzShowComponentComponent, NumberManagementComponent, AddFreightComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    CraftApprovalsComponent,
    ApprovalsCraftInfoComponent,
    DeviceProductFormComponent,
    DeviceMonitorFormComponent,
    AddFreightComponent]
})
export class ConfigurationManagementModule { }
