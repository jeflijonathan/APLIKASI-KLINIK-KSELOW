// src/app/page/pasien/pasien-page.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Tambahkan DatePipe untuk *ngFor

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Create } from './Create/create';

interface PasienType {
  _id?: string;
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  asuransi: string;
  createdAt?: string;
}

@Component({
  selector: 'app-pasien-page',
  standalone: true,
  // 1. Hapus Dialog dari imports, karena tidak digunakan di template ini
  imports: [Create, FormsModule, ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './pasien-page.html',
  styleUrl: './pasien-page.css',
  // Catatan: MatDialog, NgZone, TemplateRef, ViewChild tidak digunakan di kode yang tersedia.
  // Anda bisa menghapusnya dari imports dan class jika tidak digunakan di bagian lain.
})
export class PasienPage implements OnInit {
  // =========================
  //         STATES
  // =========================
  isDialogOpen = false;
  isLoading = false;
  errorMessage = '';

  Math = Math;

  dataPasien: PasienType[] = [];

  searchQuery = '';
  filterJenisKelamin = '';
  filterAsuransi = '';
  currentPage = 1;
  pageSize = 10;
  totalData = 0;

  // formPasien Dihapus dari sini karena sudah dikelola di Create
  // formPasien!: FormGroup;

  // Hapus MatDialog dan FormBuilder dari constructor jika tidak digunakan
  constructor(private cd: ChangeDetectorRef) {
    // Hapus inisialisasi this.formPasien di sini
  }

  ngOnInit() {
    this.fetchDataPasien();
  }

  // openWithTemplate() dan ViewChild dihapus jika tidak digunakan

  openAddPasienDialog() {
    this.isDialogOpen = true;
  }

  // 2. Perbaikan handleSubmit: Ganti nama dan terima data pasien sebagai argumen
  async handleCreateSubmit(formData: PasienType) {
    // <--- Terima data pasien

    // Perhatian: Tidak perlu ada this.formPasien.invalid check lagi
    // karena komponen Create menjamin data yang dikirimkan sudah valid.

    try {
      const res = await fetch('http://localhost:3000/api/pasien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Gunakan formData dari komponen Create
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data pasien berhasil disimpan!');
        // Tidak perlu this.formPasien.reset() lagi
        this.isDialogOpen = false;
        this.fetchDataPasien();
      } else {
        alert('Error: ' + (data.message || 'Gagal menyimpan data'));
      }
    } catch (error) {
      alert('Kesalahan mengirim data: ' + error);
    }
  }

  // ... (fetchDataPasien, onSearch, onFilterChange, onPageChange)
  async fetchDataPasien() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      let url = `http://localhost:3000/api/pasien?page=${this.currentPage}&limit=${this.pageSize}`;

      if (this.searchQuery.trim()) url += `&search=${this.searchQuery.trim()}`;
      if (this.filterJenisKelamin) url += `&jenis_kelamin=${this.filterJenisKelamin}`;
      if (this.filterAsuransi) url += `&asuransi=${this.filterAsuransi}`;

      console.log('REQUEST:', url);

      const res = await fetch(url);
      const data = await res.json();

      this.dataPasien = data.data || [];
      this.totalData = data.total || 0;

      // 👉 SOLUSI WAJIB
      this.cd.detectChanges();
    } catch (error) {
      this.errorMessage = 'Terjadi kesalahan: ' + error;
    } finally {
      this.isLoading = false;
      this.cd.detectChanges(); // 👉 PENTING BANGET
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.fetchDataPasien();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.fetchDataPasien();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchDataPasien();
  }
}
