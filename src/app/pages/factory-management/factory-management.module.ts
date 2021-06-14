import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../public/shared.module';
import { FactoryManagementComponent } from './factory-management.component';
import { CompletedRecordsComponent } from './components/completed-records/completed-records.component';
import { RollsRecordsComponent } from './components/rolls-records/rolls-records.component';



@NgModule({
  declarations: [FactoryManagementComponent, CompletedRecordsComponent, RollsRecordsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FactoryManagementModule { }
