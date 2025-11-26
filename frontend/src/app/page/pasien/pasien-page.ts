import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
  // =========================
  //         STATES
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

  dialogCreateConfig = {
    title: 'Daftarkan Pasien',
    class: '',
  };

  formPasien!: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.formPasien = this.fb.group({
      nama: [''],
      tanggal_lahir: [''],
      jenis_kelamin: [''],
      asuransi: [''],
    });
  }

  ngOnInit() {
    this.fetchDataPasien();
  }

  @ViewChild('proj') proj!: TemplateRef<any>;

  openWithTemplate() {
    this.dialog.open(Dialog, {
      data: { title: 'Tambah Pasien', template: this.proj },
    });
  }

  openAddPasienDialog() {
    this.isDialogOpen = true;
  }

  async handleSubmit() {
    if (this.formPasien.invalid) {
      alert('Harap isi semua field!');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/pasien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.formPasien.value),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data pasien berhasil disimpan!');
        this.formPasien.reset();
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
