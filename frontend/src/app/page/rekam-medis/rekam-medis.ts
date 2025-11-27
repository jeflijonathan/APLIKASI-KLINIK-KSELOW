// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormsModule,
// } from '@angular/forms';
// import { Dialog } from '../../common/components/dialog/dialog';

// interface RekamMedisType {
//   id: string;
//   pasienName: string;
//   pasienId: string;
//   tanggal: string;
//   waktu: string;
//   dokter: string;
//   keluhan: string;
//   diagnosa: string;
//   tindakan: string;
//   resep: string;
//   catatan: string;
//   tensi: string;
//   suhu: string;
//   nadi: string;
//   berat: string;
// }

// @Component({
//   selector: 'app-rekam-medis',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FormsModule, Dialog],
//   templateUrl: './rekam-medis.html',
//   styleUrls: ['./rekam-medis.css'],
// })
// export class RekamMedis {
//   // Dialog state
//   isInputDialogOpen = false;
//   isDetailDialogOpen = false;

//   // Form
//   formRekamMedis!: FormGroup;

//   // Selected data
//   selectedRecord: RekamMedisType | null = null;

//   // Dummy data
//   dataRekamMedis: RekamMedisType[] = [
//     {
//       id: 'RM001',
//       pasienName: 'Ahmad Zulkarnain',
//       pasienId: 'P001',
//       tanggal: '2025-11-23',
//       waktu: '10:30',
//       dokter: 'Dr. Andi Wijaya, Sp.PD',
//       keluhan: 'Demam tinggi, sakit kepala',
//       diagnosa: 'Influenza',
//       tindakan: 'Istirahat total',
//       resep: 'Paracetamol 500mg 3x1, Vitamin C',
//       catatan: 'Perbanyak minum',
//       tensi: '120/80',
//       suhu: '38.5',
//       nadi: '90',
//       berat: '70',
//     },
//     {
//       id: 'RM002',
//       pasienName: 'Siti Nurhaliza',
//       pasienId: 'P002',
//       tanggal: '2025-11-22',
//       waktu: '09:15',
//       dokter: 'Dr. Maya Sari, Sp.A',
//       keluhan: 'Kontrol diabetes',
//       diagnosa: 'Diabetes Tipe 2',
//       tindakan: 'Diet gula',
//       resep: 'Metformin 500mg 2x1, Glimepiride 4mg 1x1',
//       catatan: 'Gula darah stabil',
//       tensi: '130/85',
//       suhu: '36.5',
//       nadi: '80',
//       berat: '65',
//     },
//   ];

//   constructor(private fb: FormBuilder) {
//     this.formRekamMedis = this.fb.group({
//       pasienName: ['', Validators.required],
//       pasienId: [''],
//       dokter: ['', Validators.required],
//       tanggal: ['', Validators.required],
//       waktu: [''],
//       tensi: [''],
//       suhu: [''],
//       nadi: [''],
//       berat: [''],
//       keluhan: ['', Validators.required],
//       diagnosa: ['', Validators.required],
//       tindakan: [''],
//       resep: [''],
//       catatan: [''],
//     });
//   }

//   // Dialog handlers
//   openInputDialog(): void {
//     this.formRekamMedis.reset();
//     this.isInputDialogOpen = true;
//   }

//   closeInputDialog(): void {
//     this.isInputDialogOpen = false;
//   }

//   onInputDialogSubmit(): void {
//     if (this.formRekamMedis.invalid) {
//       alert('Harap lengkapi data wajib!');
//       return;
//     }

//     const newRecord: RekamMedisType = {
//       id: `RM${this.dataRekamMedis.length + 1}`,
//       pasienName: this.formRekamMedis.value.pasienName,
//       pasienId: this.formRekamMedis.value.pasienId || `P${this.dataRekamMedis.length + 1}`,
//       tanggal: this.formRekamMedis.value.tanggal,
//       waktu: this.formRekamMedis.value.waktu,
//       dokter: this.formRekamMedis.value.dokter,
//       keluhan: this.formRekamMedis.value.keluhan,
//       diagnosa: this.formRekamMedis.value.diagnosa,
//       tindakan: this.formRekamMedis.value.tindakan,
//       resep: this.formRekamMedis.value.resep || '',
//       catatan: this.formRekamMedis.value.catatan,
//       tensi: this.formRekamMedis.value.tensi,
//       suhu: this.formRekamMedis.value.suhu,
//       nadi: this.formRekamMedis.value.nadi,
//       berat: this.formRekamMedis.value.berat,
//     };

//     this.dataRekamMedis.unshift(newRecord);
//     console.log('Rekam Medis ditambahkan:', newRecord);
//     alert('Data Rekam Medis berhasil disimpan!');
//     this.isInputDialogOpen = false;
//   }

//   openDetail(item: RekamMedisType): void {
//     this.selectedRecord = item;
//     this.isDetailDialogOpen = true;
//   }

//   closeDetailDialog(): void {
//     this.isDetailDialogOpen = false;
//     this.selectedRecord = null;
//   }
// }
