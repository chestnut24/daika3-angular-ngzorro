import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../public/shared.module';
import { UpPassWordComponent } from './up-pass-word/up-pass-word.component';



@NgModule({
  declarations: [HomeComponent, LoginComponent, UpPassWordComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RootModule { }
