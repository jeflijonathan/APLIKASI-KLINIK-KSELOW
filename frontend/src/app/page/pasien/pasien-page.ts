// src/app/page/pasien/pasien-page.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  imports: [Create, FormsModule, ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './pasien-page.html',
  styleUrl: './pasien-page.css',
})
export class PasienPage implements OnInit {
  isDialogOpen = false;
  isLoading = false;
  errorMessage = '';
  Math = Math;
  dataPasien: PasienType[] = [];
  searchQuery = '';
  filterJenisKelamin = '';
  filterAsuransi = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalData: number = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchDataPasien();
  }

  openAddPasienDialog() {
    this.isDialogOpen = true;
  }

  async handleCreateSubmit(formData: PasienType) {
    try {
      const res = await fetch('http://localhost:3000/api/pasien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data pasien berhasil disimpan!');
        this.isDialogOpen = false;
        this.fetchDataPasien();
      } else {
        alert('Error: ' + (data.message || 'Gagal menyimpan data'));
      }
    } catch (error) {
      alert('Kesalahan mengirim data: ' + error);
    }
  }

  async fetchDataPasien() {
    console.log('Fetching data pasien...');
    this.isLoading = true;
    this.errorMessage = '';

    try {
      let url = `http://localhost:3000/api/pasien?page=${this.currentPage}&limit=${this.pageSize}`;

      if (this.searchQuery.trim()) url += `&search=${this.searchQuery.trim()}`;
      if (this.filterJenisKelamin) url += `&jenis_kelamin=${this.filterJenisKelamin}`;
      if (this.filterAsuransi) url += `&asuransi=${this.filterAsuransi}`;

      console.log('Request URL:', url);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response data:', data);

      this.dataPasien = data.data ?? [];
      this.totalData = Number(data.total ?? 0);

      this.cd.detectChanges();
    } catch (error) {
      this.errorMessage = 'Terjadi kesalahan: ' + error;
      console.error('fetchDataPasien error:', error);
    } finally {
      this.isLoading = false;
      this.cd.detectChanges();
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
