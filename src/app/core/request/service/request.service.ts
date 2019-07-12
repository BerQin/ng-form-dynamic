import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { API_URL_TOKEN } from '../request.token';

@Injectable()
export class RequestService implements HttpInterceptor {

  constructor(
    @Inject(API_URL_TOKEN) private apiUrl: string,
    // private configService: ConfigService,
    // public authService: AuthService,
    // private alert: AlertService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = '';
    if (req.url.indexOf('.json') > -1) {
      return next.handle(req);
    } else {
      if (req.url.match('http://') === null) {
        const localHostName = this.apiUrl; // this.configService.getSettings('apiUrl') ||
        url = localHostName + req.url;
      } else {
        url = req.url;
      }
    }
    const cpReq = req.clone({
      url: url,
      body: req.body,
      withCredentials: true
    });
    return next.handle(cpReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
          // this.alert.alert(`${req.url}接口请求失败`, 'error', err.error && err.error.error || null);
        }
        if (err.status === 404) {
          // this.authService.goUndefined();
        }
        return next.handle(cpReq);
      }),
      tap(event => { // 如果超时退出则重新登录
        if (event instanceof HttpResponse) {
          // 未登录
          if (event.body.code && event.body.code === '1100011' ) {
            // this.authService.qihooLogin();
          }
        }
      })
    );
  }
}
