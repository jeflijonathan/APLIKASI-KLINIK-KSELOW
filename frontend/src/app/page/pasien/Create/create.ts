import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '../../../common/components/dialog/dialog';
import { API } from '../../../api/service';

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
  @Output() submitted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  formPasien: FormGroup;

  constructor(private fb: FormBuilder, private api: API) {
    this.formPasien = this.fb.group({
      nama: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      jenis_kelamin: ['', Validators.required],
      asuransi: ['', Validators.required],
    });
  }

  async submitForm() {
    this.formPasien.markAllAsTouched();

    if (this.formPasien.invalid) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }
    const formData = this.formPasien.value;

    try {
      const data = await this.api.POST('/pasien', formData);

      if (data) {
        alert('Data pasien berhasil disimpan!');
        
        this.formPasien.reset();
        this.isDialogOpen = false;
        this.isDialogOpenChange.emit(false);
        this.submitted.emit(); 
      }
    } catch (error) {
      alert('Kesalahan mengirim data: ' + error);
    }
  }
}