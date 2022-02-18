import { Injectable } from '@angular/core';

const key = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public hasToken(): boolean {
      return !!this.getToken();
    }

  public setToken(token: any) {
    window.localStorage.setItem(key, token);
  }

  public getToken() {
    return window.localStorage.getItem(key);
  }

  public removeToken() {
    window.localStorage.removeItem(key);
  }

}