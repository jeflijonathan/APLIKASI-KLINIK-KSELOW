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
import { PasienService } from '../../../api/pasien';
import { PasienFormUpdateModel, PasienUpdateModel } from '../../../api/pasien/model';
import { CommonModule } from '@angular/common';

export type PasienUpdateStateType = {
  pasien: PasienUpdateModel;
  errorMessage: string;
};

@Component({
  selector: 'app-update',
  imports: [Dialog, CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnInit, OnChanges {
  @Input() id: string = '';
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Output() closed = new EventEmitter<void>();

  private state = signal<PasienUpdateStateType>({
    pasien: {} as PasienUpdateModel,
    errorMessage: '',
  });

  formPasien: FormGroup<PasienFormUpdateModel>;

  constructor(private fb: FormBuilder, private pasienService: PasienService) {
    this.formPasien = this.fb.group({
      nama: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      jenis_kelamin: ['', Validators.required],
      asuransi: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchPasienById();
  }

  ngOnInit(): void {
    this.fetchPasienById();
  }

  async fetchPasienById() {
    this.pasienService.getPasienById(this.id, {
      onSuccess: (data) => {
        this.formPasien.patchValue({
          nama: data.nama,
          tanggal_lahir: data.tanggal_lahir,
          jenis_kelamin: data.jenis_kelamin,
          asuransi: data.asuransi,
          isActive: data.isActive,
        });

        this.state.update((prev) => ({
          ...prev,
          pasien: data,
          errorMessage: '',
        }));
      },
      onError: (err) => {
        alert(err);
      },
    });
  }

  submitForm() {
    this.formPasien.markAllAsTouched();
    const updateData = this.formPasien.value as PasienUpdateModel;

    if (this.formPasien.invalid) {
      return;
    }

    this.pasienService.updatePasien(this.id, updateData, {
      onSuccess: () => {
        alert('Successfully Update Data');
      },
      onError: (err) => {
        alert(err);
      },
    });

    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
