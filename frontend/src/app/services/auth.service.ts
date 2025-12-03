import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResp {
  token: string;
  user: { id: number; username: string; nama?: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base = 'http://localhost:3000/api/user';
  private _user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // Do not access localStorage during server-side rendering
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
    const user = (typeof localStorage !== 'undefined') ? localStorage.getItem('user') : null;
    if (token && user) {
      this._user$.next(JSON.parse(user));
    }
  }

  get user$() {
    return this._user$.asObservable();
  }

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  register(data: { username: string; password: string; email: string; role?: string }) {
    const payload = { ...data, role: data.role || 'user' };
    return this.http.post(`${this.base}/register`, payload);
  }

  login(credentials: { username: string; password: string }): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${this.base}/login`, credentials).pipe(
      tap((res) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
        this._user$.next(res.user);
      })
    );
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this._user$.next(null);
  }

  getToken(): string | null {
    return (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
  }
}
