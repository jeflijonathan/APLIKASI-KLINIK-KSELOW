import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { APIResponse } from '../common/type';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseURL = `http://localhost:3000/api`;

  // ⬅️ STATUS LOGIN DINAMIS
  private isLoggedIn = signal<boolean>(false);

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

  // ⬅️ CEK LOGIN BERDASARKAN RESPONSE BUKAN REQUEST
  private handleResponseError(err: any) {
    if (err.status === 401) {
      console.warn('🔐 Token invalid/expired → Logging out');
      this.isLoggedIn.set(false);
      localStorage.removeItem('token');
    }
    return throwError(() => err.error || err);
  }

  // ⬅️ WAIT RESPONSE → BARU SET LOGIN STATUS
  private async toPromise<T>(request: any): Promise<T> {
    return await firstValueFrom(
      request.pipe(catchError((err) => this.handleResponseError(err)))
    ).then((response: any) => {
      // Jika response sukses → user dianggap login
      this.isLoggedIn.set(true);
      return response;
    });
  }

  async GET<T>(path: string, params?: any): Promise<APIResponse<T>> {
    this.updateTokenHeader();
    const req = this.http.get<APIResponse<T>>(`${this.baseURL}${path}`, {
      headers: this.headers,
      params,
    });
    return this.toPromise(req);
  }

  async POST<T>(path: string, body: any): Promise<APIResponse<T>> {
    this.updateTokenHeader();
    const req = this.http.post<APIResponse<T>>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });
    return this.toPromise(req);
  }

  async PUT<T>(path: string, body: any): Promise<APIResponse<T>> {
    this.updateTokenHeader();
    const req = this.http.put<APIResponse<T>>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });
    return this.toPromise(req);
  }

  async DELETE<T>(path: string): Promise<APIResponse<T>> {
    this.updateTokenHeader();
    const req = this.http.delete<APIResponse<T>>(`${this.baseURL}${path}`, {
      headers: this.headers,
    });
    return this.toPromise(req);
  }

  // ⬅️ FUNCTION isLogin
  isLogIn(): boolean {
    return this.isLoggedIn();
  }
}
