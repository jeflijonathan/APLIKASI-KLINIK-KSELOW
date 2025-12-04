import { Injectable } from '@angular/core';
import { FetchCallback } from '../../common/type';
import { API } from '../service';
import { LoginRequestModel, LoginResponseModel } from './model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: API) {}

  async Login(data: LoginRequestModel, callback: FetchCallback<LoginResponseModel>) {
    const target = `/login`;
    const res = await this.api.POST<LoginResponseModel>(target, data);
    console.log('kontol', res);
    if (res?.status) {
      callback.onSuccess(res.data);
    }
    if (!res?.status) {
      callback.onError(res?.message || 'Unknown Error');
    }
    callback?.onFullfilled && callback.onFullfilled();
  }

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  async Logout(id: string, callback: FetchCallback<LoginResponseModel>) {
    const res = await this.api.GET<LoginResponseModel>(`/auth/logout/${id}`);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'unkonwn error');
    }

    callback.onFullfilled && callback.onFullfilled();
  }
}
