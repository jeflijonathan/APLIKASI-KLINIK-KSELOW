import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RekamMedisModel } from '../../api/rekammedis/model';
import { RekammedisStore } from './List/hook/rekammedis.store';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Create } from './Create/create';
import { Update } from './Update/update';

@Component({
  selector: 'app-rekam-medis',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe, Create, Update],
  templateUrl: './rekam-medis.html',
  styleUrls: ['./rekam-medis.css'],
})
export class RekamMedisPage implements OnInit {
  isDialogOpen = false;
  isDialogUpdateOpen = false;
  updateId: string = '';

  Math = Math;
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

  async handleCreateSubmit(formData: any) {
    try {
      // Normalize payload: ensure numbers and arrays are sent correctly
      const payload: any = { ...formData };

      // tanggal: convert to ISO string if Date-like
      if (payload.tanggal) {
        try {
          const d = new Date(payload.tanggal);
          if (!isNaN(d.getTime())) payload.tanggal = d.toISOString();
        } catch (e) {}
      }

      // beratBadan and suhuBadan should be numbers
      if (payload.beratBadan !== undefined && payload.beratBadan !== null)
        payload.beratBadan = Number(payload.beratBadan);
      if (payload.suhuBadan !== undefined && payload.suhuBadan !== null)
        payload.suhuBadan = Number(payload.suhuBadan);

      // resep: accept comma-separated string -> array
      if (typeof payload.resep === 'string') {
        payload.resep = payload.resep
          .split(',')
          .map((r: string) => r.trim())
          .filter((r: string) => r.length > 0);
      }

      const res = await fetch('http://localhost:3000/api/rekammedis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data rekam medis berhasil disimpan!');
        this.isDialogOpen = false;
        this.rekammedisStore.fetchRekamMedis();
      } else {
        alert('Error: ' + (data.message || 'Gagal menyimpan data'));
      }
    } catch (error) {
      alert('Kesalahan mengirim data: ' + error);
    }
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
