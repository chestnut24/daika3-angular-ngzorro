import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './pages/main.module';
import { IconsProviderModule } from './icons-provider.module';
import {NgZorroAntdModule, NZ_CONFIG, NZ_I18N, NzConfig, zh_CN} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {RootModule} from './root/root.module';
import {SERVICES} from './services';
import {AuthInterceptor} from './public/interceptor/auth.interceptor';
import {SharedModule} from './public/shared.module';
import {environment} from '../environments/environment';
import {DelonMockModule} from '@delon/mock';
import * as MOCK_DATA from '../../_mock';


// 只对开发环境有效
const MOCK_MODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCK_DATA })] : [];
registerLocaleData(zh);
const ngZorroConfig: NzConfig = {
  modal: {nzMaskClosable: false}
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RootModule,
    SharedModule,
    ...MOCK_MODULE
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    ...SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
