import { Injectable } from '@angular/core';
import { FetchCallback } from '../../common/type';
import { LoginRequestModel, LoginResponseModel } from './model';
import { API } from '../service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: API) {}

  async Login(data: LoginRequestModel, callback: FetchCallback<LoginResponseModel>) {
    const target = `/login`;
    const res = await this.api.POST<LoginResponseModel>(target, data);

    if (res?.status) {
      callback.onSuccess(res.data);
    }
    if (!res?.status) {
      callback.onError(res?.message || 'Unknown Error');
    }
    callback?.onFullfilled?.();
  }

  async Logout(id: string, callback: FetchCallback<LoginResponseModel>) {
    const res = await this.api.GET<LoginResponseModel>(`/auth/logout/${id}`);

    if (res?.status) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('id_user');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
      }
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'unkonwn error');
    }

    callback.onFullfilled && callback.onFullfilled();
  }
}
