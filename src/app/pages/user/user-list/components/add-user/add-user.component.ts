import {Component, Input, OnInit} from '@angular/core';
import { FormGroup , FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl} from '@angular/forms';
import {Role, User} from '../../../../../public/interface/user';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() user: User;
  @Input() hidePassword: boolean;
  userForm: FormGroup;
  rolesList: Role[] = [];
    switchValue = true; // 是否显示密码
  constructor(
      private fb: FormBuilder,
      private userService: UserService
  ) { }

  ngOnInit() {
      let roleIdStr = '';
      if (this.user.role) {
          roleIdStr = this.user.role.id + '';
      }
      this.userForm = this.fb.group(
          {
              name: [null, [ Validators.required ]],
              staffNo: [null, [ Validators.required ]],
              password: [null, this.hidePassword ? [
                  Validators.minLength(6),
                  Validators.maxLength(16),
                  // Validators.pattern(/^[a-z0-9A-Z]+$/),
              ] : [
                  Validators.required,
                  Validators.minLength(6),
                  Validators.maxLength(16),
                  // Validators.pattern(/^[a-z0-9A-Z]+$/),
              ]],
              roles: [null, [ Validators.required ]],
              phone: [null, [ Validators.required ]],
              remark: ['']
          }
      );
      this.userForm.patchValue({
          name: this.user.name,
          staffNo: this.user.staffNo,
          roles: roleIdStr,
          password: this.switchValue ? this.user.password : '',
          phone: this.user.phone,
          remark: this.user.remark,
      });
      this.userService.getRoleList({
          pageNum: 0,
          pageSize: 9999,
          searchText: '',
      }).subscribe(data => {
          data.content.forEach(item => {
              item.id = item.id.toString();
          });
          this.rolesList = data.content;
      });

  }
    get password() { return this.userForm.get('password'); }


}
