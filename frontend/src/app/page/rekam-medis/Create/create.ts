import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '../../../common/components/dialog/dialog';
import RekamMedisService from '../../../api/rekammedis';
import { RekammedisStore } from '../List/hook/rekammedis.store';
import { PasienStore } from '../List/hook/pasien.store';
import { RekamMedisCreateModel } from '../../../api/rekammedis/model';

@Component({
  selector: 'app-create-rekam-medis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Dialog],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create implements OnInit {
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Output() closed = new EventEmitter<void>();

  formRekamMedis: FormGroup;

  constructor(
    private fb: FormBuilder,
    public rekammedisService: RekamMedisService,
    public rekammedisStore: RekammedisStore,
    public pasienStore: PasienStore
  ) {
    this.formRekamMedis = this.fb.group({
      pasien: ['', Validators.required],
      tanggal: ['', Validators.required],
      keluhan: ['', Validators.required],
      dokter: ['', Validators.required],
      beratBadan: ['', Validators.required],
      tekananDarah: ['', Validators.required],
      suhuBadan: ['', Validators.required],
      diagnosa: ['', Validators.required],
      resep: ['', Validators.required],
      catatan: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.pasienStore.fetchPasienOptions();
  }
  get getState() {
    return this.pasienStore.getState();
  }
  submitForm() {
    this.formRekamMedis.markAllAsTouched();

    if (this.formRekamMedis.invalid) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }

    const createData = this.formRekamMedis.value as RekamMedisCreateModel;

    createData.beratBadan = Number(createData.beratBadan);
    createData.suhuBadan = Number(createData.suhuBadan);

    this.rekammedisService.createRekamMedis(
      {
        onSuccess: () => {
          this.rekammedisStore.fetchRekamMedis();
          this.isDialogOpen = false;
          alert('Data rekam medis berhasil disimpan!');
        },
        onError: (err) => {
          alert('Error: ' + (err || 'Gagal menyimpan data'));
        },
      },
      createData
    );

    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
