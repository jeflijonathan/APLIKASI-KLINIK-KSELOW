import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '../../../common/components/dialog/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Dialog],
  templateUrl: './create.html',
})
export class Create {
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();
  @Output() submitted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  formPasien: FormGroup = this.fb.group({
    nama: ['', Validators.required],
    tanggal_lahir: ['', Validators.required],
    jenis_kelamin: ['', Validators.required],
    asuransi: ['', Validators.required],
  });

  constructor() {}

  async submitForm() {
    this.formPasien.markAllAsTouched();

    if (this.formPasien.invalid) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }
    const formData = this.formPasien.value;

    try {
      const res = await fetch('http://localhost:3000/api/pasien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Data pasien berhasil disimpan!');

        this.formPasien.reset();
        this.isDialogOpen = false;
        this.isDialogOpenChange.emit(false);
        this.submitted.emit();
      } else {
        alert('Error: ' + (data.message || 'Gagal menyimpan data'));
      }
    } catch (error) {
      alert('Kesalahan mengirim data: ' + error);
    }
  }
}
