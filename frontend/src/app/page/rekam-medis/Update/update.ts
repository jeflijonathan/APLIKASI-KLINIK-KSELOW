import { Component, Input, OnInit, Output, signal, SimpleChanges, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Dialog } from '../../../common/components/dialog/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import RekamMedisService from '../../../api/rekammedis';
import { RekamMedisFormUpdateModel, RekamMedisUpdateModel } from '../../../api/rekammedis/model';
import { CommonModule } from '@angular/common';

export type RekamMedisUpdateStateType = {
  rekamMedis: RekamMedisUpdateModel;
  errorMessage: string;
};

@Component({
  selector: 'app-update-rekam-medis',
  imports: [Dialog, CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements  OnChanges {
  @Input() id: string = '';
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Output() closed = new EventEmitter<void>();

  private state = signal<RekamMedisUpdateStateType>({
    rekamMedis: {} as RekamMedisUpdateModel,
    errorMessage: '',
  });

  formRekamMedis: FormGroup;

  constructor(private fb: FormBuilder, private rekamMedisService: RekamMedisService) {
    this.formRekamMedis = this.fb.group({
      nama: ['', Validators.required],
      tanggal: ['', Validators.required],
      keluhan: ['', Validators.required],
      dokter: ['', Validators.required],
      beratBadan: ['', Validators.required],
      tekananDarah: ['', Validators.required],
      suhuBadan: ['', Validators.required],
      diagnosa: ['', Validators.required],
      resep: ['', Validators.required],
      catatan: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchRekamMedisById();
  }


  async fetchRekamMedisById() {
    this.rekamMedisService.getRekamMedisById(this.id, {
      onSuccess: (data: any) => {
        this.formRekamMedis.patchValue({
          nama: data.pasien?.nama,
          tanggal: data.tanggal.substring(0, 10),
          keluhan: data.keluhan,
          dokter: data.dokter,
          beratBadan: data.beratBadan,
          tekananDarah: data.tekananDarah,
          suhuBadan: data.suhuBadan,
          diagnosa: data.diagnosa,
          resep: data.resep,
          catatan: data.catatan,
          isActive: data.isActive,
        });

        this.state.update((prev) => ({
          ...prev,
          rekamMedis: data,
          errorMessage: '',
        }));
      },
      onError: (err: any) => {
        alert(err);
      },
    });
  }

  submitForm() {
    this.formRekamMedis.markAllAsTouched();
    const updateData = this.formRekamMedis.value as RekamMedisUpdateModel;

    if (this.formRekamMedis.invalid) {
      return;
    }

    this.rekamMedisService.updateRekamMedis(this.id, updateData, {
      onSuccess: () => {
        alert('Successfully Update Data');
      },
      onError: (err: any) => {
        alert(err);
      },
    });

    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}

