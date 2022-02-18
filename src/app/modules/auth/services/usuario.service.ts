import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from 'src/app/core/auth/token/Token.service';
import { BaseService } from 'src/app/core/services/base.service';
import { urlConfigs } from 'src/app/core/utils/url-configs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<any> {

  private userSubject = new BehaviorSubject<any>(null);

  constructor(protected http: HttpClient, private tokenService: TokenService) { 
    super(http, urlConfigs.url_account);
  }

  public set setUser(usuario: string) {
    this.tokenService.setToken(usuario);
  }

  public get getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

   public logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  public isLogged() {
    return this.tokenService.hasToken();
  }
}
