import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersListModule} from './users-list/users-list.module';
import {StructureModule} from './structure/structure.module';
import {UserListModule} from './user-list/user-list.module';
import {RoleListModule} from './role-list/role-list.module';
import {SharedModule} from '../../public/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    UsersListModule,
    StructureModule,
    UserListModule,
    RoleListModule
  ]
})
export class UserModule { }
