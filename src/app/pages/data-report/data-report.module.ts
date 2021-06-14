import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../public/shared.module';
import { DataReportComponent } from './data-report.component';
import { OutputDataComponent } from './components/output-data/output-data.component';
import { InProductionDataComponent } from './components/in-production-data/in-production-data.component';
import { CostAccountingDataComponent } from './components/cost-accounting-data/cost-accounting-data.component';
import { ElectricQuantityModalComponent } from './components/electric-quantity-modal/electric-quantity-modal.component';



@NgModule({
  declarations: [DataReportComponent, OutputDataComponent, InProductionDataComponent, CostAccountingDataComponent, ElectricQuantityModalComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [ElectricQuantityModalComponent]
})
export class DataReportModule { }
