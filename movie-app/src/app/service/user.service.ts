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
  }

  async initToken() {
    this._token = await this.restoreToken();
  }

  public authenticate(
    username: string,
    password: string
  ): Observable<any> {
    return this._http
      .post(`Login`, {
        username,
        password,
      })
      .pipe(
        tap((token: any) => {
          this._token = token.access_token;
          this.saveToken(this._token);
        })
      );
  }

  logout() {
    this.clearToken();
    return this.redirectToAuth();
  }

  async getToken(): Promise<string> {
    return this._storage.get(this._tokenName);
  }

  getCachedToken() {
    return this._token;
  }

  async clearToken() {
    await this._storage.remove(this._tokenName);
  }

  redirectToAuth() {
    this._router.navigateByUrl('/login').then();
  }

  private async saveToken(token: string) {
    await this._storage.set(this._tokenName, token);
  }

  private async restoreToken() {
    this._token = await this._storage.get(this._tokenName);
    return this._token;
  }
}
