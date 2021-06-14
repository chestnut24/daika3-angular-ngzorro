import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleListComponent} from './role-list.component';
import { AccessListComponent } from './access-list/access-list.component';
import { RoleModalComponent } from './role-modal/role-modal.component';
import {SharedModule} from '../../../public/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [RoleListComponent, AccessListComponent, RoleModalComponent],
  entryComponents: [RoleModalComponent]
})
export class RoleListModule { }
