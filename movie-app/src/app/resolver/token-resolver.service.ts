import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenResolverService implements Resolve<any> {

  constructor(private _user: UserService, private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve) => {
      this._user.getToken().then((token) => {
        if (token) {
          resolve(this._router.navigateByUrl('/movies'));
        }
        return resolve(true);
      });
    });
  };
}
