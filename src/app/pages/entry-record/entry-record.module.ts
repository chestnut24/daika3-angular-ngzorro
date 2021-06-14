import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryRecordComponent } from './entry-record.component';
import {SharedModule} from '../../public/shared.module';
import { AddRecordComponent } from './component/add-record/add-record.component';



@NgModule({
  declarations: [EntryRecordComponent, AddRecordComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  entryComponents: [AddRecordComponent]
})
export class EntryRecordModule { }
