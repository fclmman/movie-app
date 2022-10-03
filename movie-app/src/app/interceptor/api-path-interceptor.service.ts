import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPathInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.modifyRequest(req));
  }

  private modifyRequest = (req: HttpRequest<any>): HttpRequest<any> => {
    const endpoint = environment.backend;
    req = req.clone({
      url: `${endpoint}/${req.url}`,
      // setHeaders: {
      //   'Content-type': `text/plain`
      // }
    });
    return req;
  };
}
