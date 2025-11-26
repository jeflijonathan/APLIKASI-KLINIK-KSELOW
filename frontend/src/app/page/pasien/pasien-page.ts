import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../common/components/dialog/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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
  imports: [Dialog, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pasien-page.html',
  styleUrl: './pasien-page.css',
})
export class PasienPage implements OnInit {
  isDialogOpen = false;
  isLoading = false;
  errorMessage = '';

  // Expose Math object to template
  Math = Math;

  // Data table
  dataPasien: PasienType[] = [];

  // Filter & Search
  searchQuery = '';
  filterJenisKelamin = '';
  filterAsuransi = '';
  currentPage = 1;
  pageSize = 10;
  totalData = 0;

  dialogCreateConfig = {
    title: 'Daftarkan Pasien',
    class: '',
  };

  formPasien: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.formPasien = this.fb.group({
      nama: [''],
      tanggal_lahir: [''],
      jenis_kelamin: [''],
      asuransi: [''],
    });
  }

  @ViewChild('proj') proj!: TemplateRef<any>;

  openWithTemplate() {
    this.dialog.open(Dialog, {
      data: { title: 'Tambah Pasien', template: this.proj },
    });
  }

  async handleSubmit() {
    if (this.formPasien.invalid) {
      alert('Harap isi semua field yang wajib!');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/pasien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formPasien.value),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data pasien berhasil disimpan!');
        this.formPasien.reset();
        this.isDialogOpen = false;
        this.fetchDataPasien(); // Refresh data
      } else {
        alert('Error: ' + (data.message || data.details?.[0] || 'Gagal menyimpan data'));
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data: ' + error);
    }
  }
  async fetchDataPasien() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const params = new URLSearchParams();
      params.append('page', this.currentPage.toString());
      params.append('limit', this.pageSize.toString());

      if (this.searchQuery.trim()) {
        params.append('search', this.searchQuery);
      }
      if (this.filterJenisKelamin) {
        params.append('jenis_kelamin', this.filterJenisKelamin);
      }
      if (this.filterAsuransi) {
        params.append('asuransi', this.filterAsuransi);
      }

      const res = await fetch(`http://localhost:3000/api/pasien?${params.toString()}`);

      if (!res.ok) {
        throw new Error('Gagal mengambil data pasien');
      }

      const data = await res.json();
      this.dataPasien = data.data || [];
      this.totalData = data.total || 0;
      console.log('Data Pasien:', this.dataPasien);
    } catch (error) {
      this.errorMessage = 'Terjadi kesalahan: ' + error;
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
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

  resetFilters() {
    this.searchQuery = '';
    this.filterJenisKelamin = '';
    this.filterAsuransi = '';
    this.currentPage = 1;
    this.fetchDataPasien();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchDataPasien();
  }
  openAddPasienDialog() {
    this.isDialogOpen = true;
  }

  onDialogClosed(evt: any) {
    console.log(evt);
  }

  ngOnInit() {
    this.fetchDataPasien();
  }
}
