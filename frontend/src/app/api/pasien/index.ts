import { Injectable } from '@angular/core';
import { PasienCreateModel, PasienFormUpdateModel, PasienModel, PasienUpdateModel } from './model';
import { DataWithPagination, FetchCallback, FetchParams, APIResponse } from '../../common/type';
import { API } from './../service';

@Injectable({
  providedIn: 'root',
})
export class PasienService {
  private basePath = '/pasien';

  constructor(private api: API) {}

  async getPasienData(
    callback: FetchCallback<DataWithPagination<PasienModel[]>>,
    params?: FetchParams
  ) {
    const res = await this.api.GET<PasienModel[]>(this.basePath, params?.params);

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

  async getPasienOptions(callback: FetchCallback<DataWithPagination<PasienModel[]>>) {
    const target = `/options${this.basePath}`;
    const res = await this.api.GET<PasienModel[]>(target);

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

  async getPasienById(id: string, callback: FetchCallback<PasienUpdateModel>) {
    const target = `${this.basePath}/${id}`;
    const res = await this.api.GET<PasienUpdateModel>(target);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async createPasien(callback: FetchCallback<PasienCreateModel>, data: PasienCreateModel) {
    const target = `${this.basePath}`;
    const res = await this.api.POST<PasienCreateModel>(target, data);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async updatePasien(
    id: string,
    data: PasienUpdateModel,
    callback: FetchCallback<PasienUpdateModel>
  ) {
    const target = `${this.basePath}/${id}`;
    const res = await this.api.PUT<PasienUpdateModel>(target, data);

    if (res?.status) {
      callback.onSuccess(res.data);
    } else {
      callback.onError(res?.message || 'Unknown Error');
    }

    callback?.onFullfilled && callback.onFullfilled();
  }

  async deletePasien(id: string, callback: FetchCallback<void>) {
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
