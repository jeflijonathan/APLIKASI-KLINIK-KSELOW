import { Injectable, signal } from '@angular/core';
import UserService from '../../../../api/user';
import { PaginationType } from '../../../../common/type';
import { UserModel } from '../../../../api/user/model';

export interface StateType {
  userList: UserModel[];
  search: string;
  pagination: PaginationType;
  isLoading: boolean;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private state = signal<StateType>({
    userList: [],
    search: '',
    pagination: {
      currentPage: 1,
      limit: 10,
      totalData: 0,
      totalPages: 0,
    },
    isLoading: false,
    errorMessage: '',
  });

  constructor(private userService: UserService) {}

  getState = () => this.state();
  userList = () => this.state().userList;
  pagination = () => this.state().pagination;

  updateSearch(value: string) {
    this.state.update((s) => ({
      ...s,
      search: value,
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

  async fetchUsers(extraParams: any = {}) {
    this.state.update((s) => ({ ...s, isLoading: true, errorMessage: '' }));

    const currentState = this.state();
    const params = {
      page: currentState.pagination.currentPage,
      limit: currentState.pagination.limit,
      search: currentState.search,
      ...extraParams,
    };

    await this.userService.getUserData(
      {
        onSuccess: (res) => {
          this.state.update((prev) => ({
            ...prev,
            userList: res.data,
            pagination: {
              ...prev.pagination,
              currentPage: res.pagination.currentPage,
              limit: res.pagination.limit,
              totalData: res.pagination.totalData ?? 0,
              totalPages: res.pagination.totalPages ?? 1,
            },
            isLoading: false,
          }));
        },
        onError: (error) => {
          this.state.update((s) => ({
            ...s,
            isLoading: false,
            errorMessage: error,
          }));
        },
        onFullfilled: () => {},
      },
      { params }
    );
  }
}
