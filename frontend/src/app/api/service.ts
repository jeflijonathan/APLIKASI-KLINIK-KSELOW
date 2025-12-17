import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { APIResponse } from '../common/type';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseURL = 'http://localhost:3000/api';

  private isLoggedIn = signal<boolean>(false);

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.restoreAuth();
  }

  private isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const now = Math.floor(Date.now() / 1000);
      return !!payload && typeof payload.exp === 'number' && payload.exp > now;
    } catch {
      return false;
    }
  }

  private restoreAuth() {
    const token = this.getToken();
    if (token && this.isTokenValid(token)) {
      this.isLoggedIn.set(true);
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    } else {
      this.isLoggedIn.set(false);
    }
  }

  private updateTokenHeader() {
    const token = this.getToken();
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  private handleResponseError(err: any) {
    if (err.status === 401) {
      console.warn('🔐 Token invalid/expired → Logging out');
      this.isLoggedIn.set(false);
      if (this.hasLocalStorage()) {
        localStorage.removeItem('token');
      }
    }
    return throwError(() => err.error || err);
  }

  private hasLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private getToken(): string | null {
    if (!this.hasLocalStorage()) return null;
    return window.localStorage.getItem('token');
  }

  private async toPromise<T>(request: any): Promise<T> {
    return await firstValueFrom(
      request.pipe(catchError((err) => this.handleResponseError(err)))
    ).then((response: any) => {
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

  isLogIn(): boolean {
    return this.isLoggedIn();
  }
}
