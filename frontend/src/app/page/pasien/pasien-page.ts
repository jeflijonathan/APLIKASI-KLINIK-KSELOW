import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { PasienModel } from '../../api/pasien/model';
import { PasienStore } from './List/hook/pasien.store';
import { CommonModule, DatePipe } from '@angular/common';
import { Create } from './Create/create';
import { Update } from './Update/update';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasien-page',
  standalone: true,
  imports: [FormsModule, DatePipe, ReactiveFormsModule, CommonModule, Create, Update],
  templateUrl: './pasien-page.html',
  styleUrls: ['./pasien-page.css'],
})
export class PasienPage implements OnInit {
  isDialogOpen = false;
  isDialogUpdateOpen = false;
  updateId: string = '';

  Math = Math;
  constructor(private cd: ChangeDetectorRef, public pasienStore: PasienStore) {}

  ngOnInit() {
    this.pasienStore.fetchPasien();
  }

  get pagination() {
    return this.pasienStore.pagination();
  }

  get dataPasien() {
    return this.pasienStore.pasienList();
  }

  get state() {
    return this.pasienStore.getState();
  }

  openAddPasienDialog() {
    this.isDialogOpen = true;
  }

  openUpdatePasienDialog(id: string | undefined = 'kosong') {
    this.isDialogUpdateOpen = !this.isDialogUpdateOpen;
    this.updateId = id;
  }

  onPasienSaved() {
    this.isDialogOpen = false;
    this.pasienStore.fetchPasien();
  }

  trackById(index: number, item: PasienModel) {
    return item._id;
  }

  onSearch() {
    this.pasienStore.setPagination({ currentPage: 1 });
    this.pasienStore.fetchPasien();
  }

  onPageChange(page: number) {
    this.pasienStore.setPagination({ currentPage: page });
    this.pasienStore.fetchPasien();
  }

  onLimitChange(newLimit: number) {
    this.pasienStore.setPagination({
      limit: newLimit,
      currentPage: 1,
    });

    this.pasienStore.fetchPasien();
  }
}
