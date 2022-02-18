import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/modules/auth/services/usuario.service';

import { BaseService } from '../services/base.service';
import { urlConfigs } from '../utils/url-configs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  constructor(protected http: HttpClient, private usuarioService: UsuarioService) { 
    super(http, urlConfigs.url_account);
  }

  public getAuthenticate = (params?: URLSearchParams): Observable<any> => {
    const filters = params ? `?${params.toString()}` : '';
    return this.httpClient
      .get(`${this.baseUrl}${this.path}${filters}`)
      .pipe(tap((res: Array<any>) => {
        this.usuarioService.setUser = res.shift();
      }),catchError((e: HttpErrorResponse) => throwError(e)));
  }

}
