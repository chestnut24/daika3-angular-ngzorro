import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import {HOME_ROUTES} from './pages/main-routes';
import {HomeComponent} from './root/home/home.component';
import {LoginComponent} from './root/login/login.component';
import { AppRoutingCache } from './app-routing.cache';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: HOME_ROUTES
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: AppRoutingCache }]
})
export class AppRoutingModule { }
