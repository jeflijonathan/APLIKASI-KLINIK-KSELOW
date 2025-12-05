import { Injectable } from '@angular/core';
import { UserCreateModel, UserFormUpdateModel, UserModel, UserUpdateModel } from './model';
import { DataWithPagination, FetchCallback, FetchParams, APIResponse } from '../../common/type';
import { API } from '../service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private basePath = '/users';

  constructor(private api: API) {}

  async getUserData(
    callback: FetchCallback<DataWithPagination<UserModel[]>>,
    params?: FetchParams
  ) {
    const res = await this.api.GET<UserModel[]>(this.basePath, params?.params);

    if (res?.status) {
      callback.onSuccess({
        data: res.data,
        pagination: res.pagination!,
      });
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }
    callback?.onFullfilled && callback.onFullfilled();
  }

  async createUser(body: UserCreateModel, callback: FetchCallback<UserModel>) {
    const target = `/register`;
    const res = await this.api.POST<UserModel>(target, body);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async getUserById(id: string, callback: FetchCallback<UserUpdateModel>) {
    const target = `${this.basePath}/${id}`;
    const res = await this.api.GET<UserUpdateModel>(target);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async updateUser(id: string, body: UserUpdateModel, callback: FetchCallback<UserUpdateModel>) {
    const target = `${this.basePath}/${id}`;
    const res = await this.api.PUT<UserUpdateModel>(target, body);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async deleteUser(id: string, callback: FetchCallback<void>) {
    const target = `${this.basePath}/${id}`;
    const res = await this.api.DELETE<void>(target);

    if (res?.status) {
      callback.onSuccess(undefined);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }
}

export default UserService;
