import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dialog } from '../../../common/components/dialog/dialog';

@Component({
  selector: 'app-create-rekam-medis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Dialog],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Output() submitted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  formRekamMedis: FormGroup;

  constructor(private fb: FormBuilder) {
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
    });
  }

  submitForm() {
    this.formRekamMedis.markAllAsTouched();

    if (this.formRekamMedis.invalid) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }

    this.submitted.emit(this.formRekamMedis.value);

    this.formRekamMedis.reset();
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
