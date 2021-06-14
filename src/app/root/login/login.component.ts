import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { sessionStorageKey } from '../../public/types';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuService } from 'src/app/services/menu.service';
import { AppRoutingCache } from 'src/app/app-routing.cache';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loginFail = false;
  errorMessage = '';
  isLoading = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private list: MenuService,
    private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [false]
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.loginFail = false;
    });
  }

  loginButtonClick() {
    this.loginForm.get('username').markAsDirty();
    this.loginForm.get('username').updateValueAndValidity();
    this.loginForm.get('password').markAsDirty();
    this.loginForm.get('password').updateValueAndValidity();
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.auth.login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      ).subscribe(
        success => {
          this.isLoading = false;
          let lastPage = decodeURI(sessionStorage.getItem(sessionStorageKey.LAST_PAGE));
          let lastPageArr;
          const routeParams = {};

          // 登录刷新的一个key
          // 登录的时候指定为true,刷新过一次之后指定为false
          localStorage.setItem('reload', '可刷新');
          AppRoutingCache.handlers = {};
          // 03版
          this.router.navigate(['/welcome']);
          // 02版
          // this.list.getFirstPage().subscribe(data => {
          //   console.log(data);
          //   this.router.navigate([data]);
          // });
          // 01版
          // if (lastPage) {
          //   lastPageArr = lastPage.split(';');
          //   lastPage = lastPageArr[0];
          //   if (lastPage === '/') {
          //     lastPage = '/users';
          //   }
          // } else {
          //   lastPage = '/users';
          // }
          // if (lastPageArr) {
          //   lastPageArr.filter((item, index) => index > 0).map(data => {
          //     routeParams[data.split('=')[0]] = data.split('=')[1];
          //   });
          // }

          // sessionStorage.setItem(sessionStorageKey.LAST_PAGE, `${lastPage}`);
        },
        e => {
          this.isLoading = false;
          this.loginFail = true;
          if (e instanceof HttpErrorResponse) {
            if (typeof e.error === 'object') {
              this.errorMessage = e.error.message;
            } else {
              this.errorMessage = e.error;
            }
          } else {
            this.errorMessage = e;
          }
        }
      );
    }
  }

}
