import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';
import { Dialog } from '../../../common/components/dialog/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasienService } from '../../../api/pasien';
import { PasienFormUpdateModel, PasienUpdateModel } from '../../../api/pasien/model';
import { CommonModule } from '@angular/common';
import { PasienStore } from '../List/hook/pasien.store';

export type PasienUpdateStateType = {
  pasien: PasienUpdateModel;
  errorMessage: string;
};

@Component({
  selector: 'app-update-pasien',
  imports: [Dialog, CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnChanges {
  @Input() id: string = '';
  @Input() isDialogOpen = false;

  @Output() isDialogOpenChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  private state = signal<PasienUpdateStateType>({
    pasien: {} as PasienUpdateModel,
    errorMessage: '',
  });

  formPasien: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pasienService: PasienService,
    public pasienStore: PasienStore
  ) {
    this.formPasien = this.fb.group({
      nama: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      jenis_kelamin: ['', Validators.required],
      asuransi: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] || changes['isDialogOpen']) {
      if (this.id && this.isDialogOpen) {
        this.fetchPasienById();
      }
    }
  }

  async fetchPasienById() {
    if (!this.id) return;

    this.pasienService.getPasienById(this.id, {
      onSuccess: (data) => {
        this.formPasien.patchValue({
          nama: data.nama,
          tanggal_lahir: data.tanggal_lahir?.substring(0, 10) || '',
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
    if (this.formPasien.invalid) {
      alert('input tidak valid');
      return;
    }

    const formValue = this.formPasien.value as PasienUpdateModel;

    this.pasienService.updatePasien(this.id, formValue, {
      onSuccess: () => {
        alert('Successfully Update Data');
        this.pasienStore.fetchPasien();
        this.isDialogOpen = false;
        this.isDialogOpenChange.emit(false);
        this.closed.emit();
      },
      onError: (err) => {
        alert('Error updating data: ' + err);
      },
    });
  }
}
