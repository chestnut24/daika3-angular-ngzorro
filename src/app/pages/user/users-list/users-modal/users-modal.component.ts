import { Component, OnInit , Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {Customer, User} from '../../../../public/interface/user';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
    @Input() customers: Customer;
    @Input() onlyOne: boolean;
    usersTableModal;
    userArr: User[];
  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
      const userArr = [];
      this.usersTableModal = this.fb.group({
          name: [null, [Validators.required]],
          group: [null, [Validators.required]],
          users: [null, [Validators.required]],
          remark: [null]
      });
      if (this.customers.users) {
          this.customers.users.forEach(item => {
              userArr.push(item.id);
          });
      }
      this.usersTableModal.patchValue({
          name: this.customers.name,
          group: this.customers.group,
          users: userArr,
          remark: this.customers.remark,
      });
      this.userService.getUsersList({
          pageNum: 0,
          pageSize: 9999,
          searchText: '',
      }).subscribe(data => {
          this.userArr = data.content;
      });
  }

}
