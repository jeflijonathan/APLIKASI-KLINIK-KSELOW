import { Injectable, signal } from '@angular/core';
import  RekamMedisService  from '../../../../api/rekammedis';
import { filterMapper } from '../utils/rekammedis-filter-mapper';
import { PaginationType } from '../../../../common/type';
import { RekamMedisModel } from '../../../../api/rekammedis/model';

export interface StateType {
  rekammedisList: RekamMedisModel[];
  search: string;
  filters: {
    sort: string;
    order_by: string;
    status: string;
  };
  pagination: PaginationType;
  isLoading: boolean;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class RekammedisStore {
  private state = signal<StateType>({
    rekammedisList: [],
    search: '',
    filters: {
      sort: 'createdAt',
      order_by: 'desc',
      status: '',
    },
    pagination: {
      currentPage: 1,
      limit: 10,
      totalData: 0,
      totalPages: 0,
    },
    isLoading: false,
    errorMessage: '',
  });

  constructor(private rekamMedisService: RekamMedisService) {}

  getState = () => this.state();
  rekammedisList = () => this.state().rekammedisList;
  pagination = () => this.state().pagination;

  updateSearch(value: string) {
    this.state.update((s) => ({
      ...s,
      search: value,
    }));
  }

  setFilters(filters: Partial<StateType['filters']>) {
    this.state.update((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  }

  setPagination(pagination: Partial<StateType['pagination']>) {
    this.state.update((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        ...pagination,
      },
    }));
  }

  async fetchRekamMedis(extraParams: any = {}) {
    this.state.update((s) => ({ ...s, isLoading: true, errorMessage: '' }));

    const currentState = this.state();
    const requestParams = filterMapper({
      ...currentState.filters,
      ...currentState.pagination,
      search: currentState.search,
      ...extraParams,
    });

    await this.rekamMedisService.getRekamMedis(
      {
        onSuccess: (res) => {
          this.state.update((s) => ({
            ...s,
            rekammedisList: res.data,
            pagination: {
              ...s.pagination,
              currentPage: res.pagination.currentPage,
              limit: res.pagination.limit,
              totalData: res.pagination.totalData ?? 0,
              totalPages: res.pagination.totalPages ?? 1,
            },

            isLoading: false,
          }));
        },
        onError: (err) => {
          this.state.update((s) => ({
            ...s,
            isLoading: false,
            errorMessage: err || 'Gagal memuat data',
          }));
        },
      },
      requestParams
    );
  }
}
