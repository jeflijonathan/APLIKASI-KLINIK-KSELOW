import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '../../../common/components/dialog/dialog';
import RekamMedisService from '../../../api/rekammedis';
import { RekammedisStore } from '../List/hook/rekammedis.store';
import { PasienStore } from '../List/hook/pasien.store';

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

    const payload: any = { ...this.formRekamMedis.value };

    if (payload.tanggal) {
      try {
        const d = new Date(payload.tanggal);
        if (!isNaN(d.getTime())) payload.tanggal = d.toISOString();
      } catch (e) {}
    }

    payload.beratBadan = Number(payload.beratBadan);
    payload.suhuBadan = Number(payload.suhuBadan);

    if (typeof payload.resep === 'string') {
      payload.resep = payload.resep
        .split(',')
        .map((r: string) => r.trim())
        .filter((r: string) => r.length > 0);
    }

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
      payload
    );

    // this.formRekamMedis.reset();
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
