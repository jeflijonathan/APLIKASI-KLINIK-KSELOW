import { Injectable, signal } from '@angular/core';
import { PasienService } from '../../../../api/pasien';

export interface StateType {
  pasienList: any[];
  isLoading: boolean;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class PasienStore {
  private state = signal<StateType>({
    pasienList: [],
    isLoading: false,
    errorMessage: '',
  });

  constructor(private pasienService: PasienService) {}

  getState = () => this.state();
  pasienList = () => this.state().pasienList;

  async fetchPasienOptions() {
    this.state.update((prev) => ({ ...prev, isLoading: true, errorMessage: '' }));
    await this.pasienService.getPasienOptions({
      onSuccess: (res) => {
        this.state.update((prev) => ({
          ...prev,
          pasienList: res.data,
          isLoading: false,
        }));
      },
      onError: (err) => {
        this.state.update((prev) => ({
          ...prev,
          isLoading: false,
          errorMessage: err || 'Gagal memuat data',
        }));
      },
    });
  }
}
