import {Injectable} from '@angular/core';
import {UserService} from '../service/user.service';
import {Observable, throwError} from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _userService: UserService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request)).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          this._userService.logout();
        }
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers ? req.headers : new HttpHeaders();
    const token = this._userService.getToken();
    if (
      token !== null &&
      token !== undefined &&
      req.url.indexOf('/Login/') < 0
    ) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    req = req.clone({
      headers
    });
    return req;
  }
}
