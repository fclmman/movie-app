import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _token: string;
  private readonly _tokenName = 'token';

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.restoreToken().then((token) => {
      this._token = token;
    });
  }

  public authenticate(
    username: string,
    password: string
  ): Observable<any> {
    return this._http
      .post(`Login`, {
        username,
        password
      })
      .pipe(
        tap((token: any) => {
          this._token = token.token;
          this.saveToken(this._token);
        })
      );
  }

  logout() {
    this.clearToken();
    return this.redirectToAuth();
  }

  getToken(): string {
    console.log(this._token);
    return this._token;
  }

  clearToken() {
    this._token = null;
    this._storage.remove(this._tokenName);
  }

  redirectToAuth(redirectTo?: string) {
    this._router.navigateByUrl('/login').then();
  }

  private saveToken(token: string) {
    this._storage.set(this._tokenName, token);
  }

  private restoreToken() {
    return this._storage.get(this._tokenName);
  }
}
