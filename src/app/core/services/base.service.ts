import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class BaseService<T> {
  protected baseUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient, @Inject(String) protected path) {}

  public getById = (id: string): Observable<any> => {
    return this.httpClient
      .get(`${this.baseUrl}${this.path}/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public get = (): Observable<any> => {
    return this.httpClient
      .get(`${this.baseUrl}${this.path}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public getByFilter = (params?: URLSearchParams): Observable<any> => {
    const filters = params ? `?${params.toString()}` : '';
    return this.httpClient
      .get(`${this.baseUrl}${this.path}${filters}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public post = (body: T): Observable<any> => {
    return this.httpClient
      .post(
        `${this.baseUrl}${this.path}`,
        body
      )
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public put = (id: string, body: T): Observable<any> => {
    return this.httpClient
      .put(`${this.baseUrl}${this.path}/${id}`, body)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public delete = (id: number): Observable<any> => {
    return this.httpClient
      .delete(`${this.baseUrl}${this.path}/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

}