import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {SharedModule} from '../../../public/shared.module';

@NgModule({
  imports: [
      SharedModule
  ],
  declarations: [UserListComponent, AddUsersComponent, AddUserComponent],
    entryComponents: [AddUsersComponent, AddUserComponent]
})
export class UserListModule { }
