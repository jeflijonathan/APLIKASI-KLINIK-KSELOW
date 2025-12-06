import { Injectable } from '@angular/core';
import { FetchCallback } from '../../common/type';
import { LoginRequestModel, LoginResponseModel } from './model';
import { API } from '../service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: API) {}

  async Login(data: LoginRequestModel, callback: FetchCallback<LoginResponseModel>) {
    const target = `/login`;

    // sanitize input
    const identifier = (data.identifier || '').toString().trim();
    const password = (data.password || '').toString();

    // helper to perform request and return response
    const doLogin = async (payload: any) => {
      console.log('[DEBUG] Attempt login with payload:', payload);
      try {
        const r = await this.api.POST<LoginResponseModel>(target, payload);
        console.log('[DEBUG] Login response:', r);
        return r;
      } catch (err) {
        console.error('[DEBUG] Login request error:', err);
        return { status: false, statusCode: 500, message: 'Request Error' } as any;
      }
    };

    // try primary payload
    let res = await doLogin({ identifier, password });

    // if user not found, try username and email keys as fallbacks
    if (res && res.status === false && /user not found/i.test(res.message || '')) {
      res = await doLogin({ username: identifier, password });
    }
    if (res && res.status === false && /user not found/i.test(res.message || '')) {
      res = await doLogin({ email: identifier, password });
    }

    console.log('kontol', res);
    if (res?.status) {
      const d = res.data;

      if (typeof localStorage !== 'undefined' && d) {
        if (d.token) localStorage.setItem('token', d.token);
        const user = {
          id: d.id || null,
          username: d.username || null,
          email: d.email || null,
          role: d.role || null,
        };
        localStorage.setItem('user', JSON.stringify(user));

        if (user.username) localStorage.setItem('username', user.username);
        if (user.email) localStorage.setItem('email', user.email);
        if (user.id) localStorage.setItem('id_user', user.id);
        if (user.role) localStorage.setItem('role', user.role);
      }
      callback.onSuccess(res.data);
    }
    if (!res?.status) {
      callback.onError(res?.message || 'Unknown Error');
    }
    callback?.onFullfilled && callback.onFullfilled();
  }

  async Logout(id: string, callback: FetchCallback<LoginResponseModel>) {
    const res = await this.api.GET<LoginResponseModel>(`/auth/logout/${id}`);

    if (res?.status) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('id_user');
        localStorage.removeItem('role');
      }
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'unkonwn error');
    }

    callback.onFullfilled && callback.onFullfilled();
  }
}
