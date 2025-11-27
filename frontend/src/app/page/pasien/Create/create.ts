// src/app/page/pasien/Create/create.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators, // Penting: Import Validators
} from '@angular/forms';
import { Dialog } from '../../../common/components/dialog/dialog';

@Component({
  selector: 'app-create',
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

  formPasien: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formPasien = this.fb.group({
      nama: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      jenis_kelamin: ['', Validators.required],
      asuransi: ['', Validators.required],
    });
  }

  submitForm() {
    this.formPasien.markAllAsTouched();

    if (this.formPasien.invalid) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }

    this.submitted.emit(this.formPasien.value);

    this.formPasien.reset();
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
