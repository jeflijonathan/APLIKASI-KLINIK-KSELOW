import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RekamMedisModel } from '../../api/rekammedis/model';
import { RekammedisStore } from './List/hook/rekammedis.store';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Create } from './Create/create';
import { Update } from './Update/update';
import { Delete } from './Delete/Delete';

@Component({
  selector: 'app-rekam-medis',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe, Create, Update, Delete],
  templateUrl: './rekam-medis.html',
  styleUrls: ['./rekam-medis.css'],
})
export class RekamMedisPage implements OnInit {
  Math = Math;
  isDialogOpen = false;
  isDialogUpdateOpen = false;
  updateId: string = '';
  data = (Math = Math);
  String = String;
  constructor(private cd: ChangeDetectorRef, public rekammedisStore: RekammedisStore) {}

  ngOnInit() {
    this.rekammedisStore.fetchRekamMedis();
  }

  get pagination() {
    return this.rekammedisStore.pagination();
  }

  get dataRekamMedis() {
    return this.rekammedisStore.rekammedisList();
  }

  get state() {
    return this.rekammedisStore.getState();
  }

  openAddRekamMedisDialog() {
    this.isDialogOpen = true;
  }

  openUpdateRekamMedisDialog(id: string | undefined = 'kosong') {
    this.isDialogUpdateOpen = !this.isDialogUpdateOpen;
    this.updateId = id;
  }

  trackById(index: number, item: RekamMedisModel) {
    return item._id;
  }

  onSearch() {
    this.rekammedisStore.setPagination({ currentPage: 1 });
    this.rekammedisStore.fetchRekamMedis();
  }

  onPageChange(page: number) {
    this.rekammedisStore.setPagination({ currentPage: page });
    this.rekammedisStore.fetchRekamMedis();
  }

  onLimitChange(newLimit: number) {
    this.rekammedisStore.setPagination({
      limit: newLimit,
      currentPage: 1,
    });

    this.rekammedisStore.fetchRekamMedis();
  }
}
