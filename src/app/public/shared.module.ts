import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {PipesModule} from './pipes';
import { DelongTableComponent } from './components/delong-table/delong-table.component';
import { Page404Component } from './components/page404/page404.component';
import {BatchDeleteComponent} from './components/batch-delete/batch-delete.component';
import { SelfCheckingComponent } from './components/self-checking/self-checking.component';
import { FurnaceDiagramComponent } from './components/furnace-diagram/furnace-diagram.component';
import { FurnaceFormComponent } from './components/furnace-form/furnace-form.component';
import { DevelopingComponent } from './components/developing/developing.component';
import { RouteTransferComponent } from './components/route-transfer/route-transfer.component';
import {HeatPositionTemperatureComponent} from '../pages/heat-treatment/components/heat-position-temperature/heat-position-temperature.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';


@NgModule({
    // tslint:disable-next-line:max-line-length
  declarations: [DelongTableComponent, Page404Component, BatchDeleteComponent, SelfCheckingComponent,
      FurnaceDiagramComponent, FurnaceFormComponent, DevelopingComponent, RouteTransferComponent, HeatPositionTemperatureComponent, WelcomePageComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ],
    exports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PipesModule,
        DelongTableComponent,
        Page404Component,
        BatchDeleteComponent,
        SelfCheckingComponent,
        FurnaceDiagramComponent,
        FurnaceFormComponent,
        RouteTransferComponent,
        HeatPositionTemperatureComponent,
        WelcomePageComponent
    ],
})
export class SharedModule { }
