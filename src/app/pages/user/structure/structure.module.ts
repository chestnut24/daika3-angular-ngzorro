import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StructureComponent} from './structure.component';
import {SharedModule} from '../../../public/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [StructureComponent]
})
export class StructureModule { }
