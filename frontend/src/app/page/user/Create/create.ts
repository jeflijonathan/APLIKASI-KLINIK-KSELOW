import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dialog } from '../../../common/components/dialog/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import UserService from '../../../api/user';
import { UserCreateModel } from '../../../api/user/model';
import { CommonModule } from '@angular/common';
import { UserStore } from '../List/hook/user.store';

@Component({
  selector: 'app-create-user',
  imports: [Dialog, CommonModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create implements OnInit {
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  formUser: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public userStore: UserStore
  ) {
    this.formUser = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['ADMIN', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  ngOnInit() {
    console.log('Create component initialized');
  }

  get isFormValid(): boolean {
    return this.formUser.valid;
  }

  submitForm() {
    console.log('Submit clicked');
    console.log('Form valid:', this.formUser.valid);
    console.log('Form errors:', this.formUser.errors);
    console.log('Form value:', this.formUser.value);

    // Mark all fields as touched untuk show validation
    Object.keys(this.formUser.controls).forEach(key => {
      this.formUser.get(key)?.markAsTouched();
    });

    if (!this.formUser.valid) {
      console.log('Form invalid, cannot submit');
      alert('Mohon isi semua field dengan benar');
      return;
    }

    this.isSubmitting = true;
    const createData = this.formUser.value as UserCreateModel;

    console.log('Submitting data:', createData);

    this.userService.createUser(createData, {
      onSuccess: (res) => {
        console.log('User created successfully:', res);
        // Delay 1 detik sebelum fetch untuk memastikan data tersimpan
        setTimeout(() => {
          this.userStore.fetchUsers();
        }, 1000);
        alert('User berhasil ditambahkan');
        this.formUser.reset({ isActive: true, role: 'ADMIN' });
        this.isDialogOpen = false;
        this.isDialogOpenChange.emit(false);
        this.isSubmitting = false;
      },
      onError: (err: any) => {
        console.error('Error creating user:', err);
        alert('Error: ' + err);
        this.isSubmitting = false;
      },
    });
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
