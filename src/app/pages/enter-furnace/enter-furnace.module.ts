import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterFurnaceComponent } from './enter-furnace.component';
import { FurnaceListComponent } from './component/furnace-list/furnace-list.component';
import {RouterModule} from '@angular/router';
import { FurnaceOperationComponent } from './component/furnace-list/component/furnace-operation/furnace-operation.component';
import {NzButtonModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../public/shared.module';



@NgModule({
    declarations: [EnterFurnaceComponent, FurnaceListComponent, FurnaceOperationComponent],
    imports: [
        CommonModule,
        RouterModule,
        NzButtonModule,
        FormsModule,
        SharedModule,
    ],
    exports: [
        FurnaceListComponent,
    ],
})
export class EnterFurnaceModule { }
