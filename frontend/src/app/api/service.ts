import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, throwError, tap } from 'rxjs';
import { APIResponse } from '../common/type';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseURL = `http://localhost:3000/api`;

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private updateTokenHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  private inspector(method: string, path: string, options: any) {
    console.log(`🔍[INSPECTOR] ${method} ${this.baseURL}${path}`);
    console.log('➡ OPTIONS:', options);
    console.log('🔑 TOKEN:', localStorage.getItem('token') || 'NO TOKEN');
  }

  private async toPromise<T>(request: any): Promise<T> {
    return await firstValueFrom(
      request.pipe(
        tap((res: any) => console.log('✅ RESPONSE:', res)),
        catchError((err) => {
          console.error('❌ ERROR:', err);
          return throwError(() => err.error || err);
        })
      )
    );
  }

  async GET<T>(path: string, params?: any): Promise<APIResponse<T>> {
    // this.updateTokenHeader();
    const token = localStorage.getItem('token') ?? '';
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: this.headers,
      params,
    };

    this.inspector('GET', path, options);

    const req = this.http.get<APIResponse<T>>(`${this.baseURL}${path}`, options);
    return this.toPromise(req);
  }

  async POST<T>(path: string, body: any): Promise<APIResponse<T>> {
    this.updateTokenHeader();

    const options = {
      headers: this.headers,
    };

    this.inspector('POST', path, { ...options, body });

    const req = this.http.post<T>(`${this.baseURL}${path}`, body, options);
    return this.toPromise(req);
  }

  async PUT<T>(path: string, body: any): Promise<APIResponse<T>> {
    this.updateTokenHeader();

    const options = {
      headers: this.headers,
    };

    this.inspector('PUT', path, { ...options, body });

    const req = this.http.put<T>(`${this.baseURL}${path}`, body, options);
    return this.toPromise(req);
  }

  async DELETE<T>(path: string): Promise<APIResponse<T>> {
    this.updateTokenHeader();

    const options = {
      headers: this.headers,
    };

    this.inspector('DELETE', path, options);

    const req = this.http.delete<T>(`${this.baseURL}${path}`, options);
    return this.toPromise(req);
  }
}
