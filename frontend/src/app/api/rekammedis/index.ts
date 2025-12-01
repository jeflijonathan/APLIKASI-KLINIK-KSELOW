import { DataWithPagination, FetchCallback, FetchParams } from "../../common/type";
import { API } from "../service";
import { RekamMedisCreateModel, RekamMedisModel } from "./model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
class RekamMedisService {
    basePath = "/rekammedis";

    constructor(private api: API) {}

    async getRekamMedis(
        callback: FetchCallback<DataWithPagination<RekamMedisModel[]>>,
        params?: FetchParams
    ){
        const res = await this.api.GET<RekamMedisModel[]>(this.basePath, params?.params);
        if (res?.status) {
            callback.onSuccess({
                data: res.data,
                pagination: res.pagination!,
            });
        } else {
            callback.onError(res?.message || "Unknown Error");
        }      
         callback?.onFullfilled && callback.onFullfilled();
    }

    async getRekamMedisById(id: string, callback: FetchCallback<RekamMedisModel>) {
        const target =  (`${this.basePath}/${id}`);
        const res = await this.api.GET<RekamMedisModel>(target);

        if (res?.status) {
            callback.onSuccess(res.data);
        } else {
            callback.onError(res?.message || "Unknown Error");
        }
        callback?.onFullfilled && callback.onFullfilled();
    }

    async createRekamMedis(callback: FetchCallback<RekamMedisModel>, data: RekamMedisCreateModel){
        const target = (`${this.basePath}`);
        const  res = await this.api.POST<RekamMedisModel>(target, data);

        if (res?.status) {
            callback.onSuccess(res.data);
        } else {
            callback.onError(res?.message || "Unknown Error");
        }
        callback?.onFullfilled && callback.onFullfilled();
    }

    async updateRekamMedis(
        id: string,
        data: RekamMedisCreateModel,
        callback: FetchCallback<RekamMedisModel>
    ){
        const target = (`${this.basePath}/${id}`);
        const res = await this.api.PUT<RekamMedisModel>(target, data);

        if (res?.status) {
            callback.onSuccess(res.data);
        } else {
            callback.onError(res?.message || "Unknown Error");
        }
        callback?.onFullfilled && callback.onFullfilled();
    }

    async deleteRekamMedis(id: string, callback: FetchCallback<null>){
        const target = (`${this.basePath}/${id}`);
        const res = await this.api.DELETE<null>(target);

        if (res?.status) {
            callback.onSuccess(null);
        } else {
            callback.onError(res?.message || "Unknown Error");
        }
        callback?.onFullfilled && callback.onFullfilled();
    } 
}

export default RekamMedisService;