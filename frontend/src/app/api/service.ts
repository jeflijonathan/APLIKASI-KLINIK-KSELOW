import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { APIResponse } from '../common/type';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseURL = 'http://localhost:3000/api';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private async toPromise<T>(request: any): Promise<T> {
    return await firstValueFrom(
      request.pipe(
        catchError((err) => {
          return throwError(() => err.error || err);
        })
      )
    );
  }

  async GET<T>(path: string, params?: any): Promise<APIResponse<T>> {
    const req = this.http.get<APIResponse<T>>(`${this.baseURL}${path}`, {
      headers: this.headers,
      params,
    });

    return this.toPromise<APIResponse<T>>(req);
  }

  async POST<T>(path: string, body: any): Promise<APIResponse<T>> {
    const req = this.http.post<T>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });

    return this.toPromise<APIResponse<T>>(req);
  }

  async PUT<T>(path: string, body: any): Promise<APIResponse<T>> {
    const req = this.http.put<T>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });

    return this.toPromise<APIResponse<T>>(req);
  }

  async DELETE<T>(path: string): Promise<APIResponse<T>> {
    const req = this.http.delete<T>(`${this.baseURL}${path}`, {
      headers: this.headers,
    });

    return this.toPromise<APIResponse<T>>(req);
  }
}
