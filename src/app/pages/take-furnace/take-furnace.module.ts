import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakeFurnaceComponent } from './take-furnace.component';
import {EnterFurnaceModule} from '../enter-furnace/enter-furnace.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [TakeFurnaceComponent],
    imports: [
        CommonModule,
        EnterFurnaceModule,
        RouterModule,
    ],
})
export class TakeFurnaceModule { }
