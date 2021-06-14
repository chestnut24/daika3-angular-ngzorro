import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { token } from '../../public/types';
import { AuthService } from '../../services/auth.service';
import { API } from '../api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let auth: Observable<string>;
      let url: string;
      auth = this.injector.get(AuthService).getAccessToken();
      url = req.url;
      if ([API.LOGIN, API.REFRESH_TOKEN].includes(url)) {
          return next.handle(req);
        } else {
          return auth.pipe(switchMap(_token => {
                const authHeader = token.HEADER_PREFIX + _token;
                const authReq = req.clone({ headers: req.headers.set(token.JWT_TOKEN_HEADER_PARAM, authHeader) });
                return next.handle(authReq);
            }));
        }
    }
}
