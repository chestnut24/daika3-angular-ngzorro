import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './users-list.component';
import { UsersModalComponent } from './users-modal/users-modal.component';
import {SharedModule} from '../../../public/shared.module';

@NgModule({
    imports: [
        CommonModule, SharedModule
    ],
    declarations: [UsersListComponent, UsersModalComponent],
    entryComponents: [UsersModalComponent]
})
export class UsersListModule { }
