import {
  Component,
  Input,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { Dialog } from '../../../common/components/dialog/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import UserService from '../../../api/user';
import { UserUpdateModel } from '../../../api/user/model';
import { CommonModule } from '@angular/common';
import { UserStore } from '../List/user.store';

export type UserUpdateStateType = {
  user: UserUpdateModel;
  errorMessage: string;
};

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [Dialog, CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css'],
})
export class Update implements OnInit, OnChanges {
  @Input() id: string = '';
  @Input() isDialogOpen = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Output() closed = new EventEmitter<void>();

  private state = signal<UserUpdateStateType>({
    user: {} as UserUpdateModel,
    errorMessage: '',
  });

  formUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public userStore: UserStore
  ) {
    this.formUser = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      isActive: [true, Validators.required],
      password: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchUserById();
  }

  ngOnInit() {}

  async fetchUserById() {
    if (!this.id || this.id === 'kosong') return;

    this.userService.getUserById(this.id, {
      onSuccess: (data: any) => {
        this.formUser.patchValue({
          username: data.username,
          email: data.email,
          role: data.role,
          isActive: data.isActive,
        });

        this.state.update((prev) => ({
          ...prev,
          user: data,
          errorMessage: '',
        }));
      },
      onError: (err: any) => {
        alert(err);
      },
    });
  }

  submitForm() {
    this.formUser.markAllAsTouched();
    let updateData = this.formUser.value as UserUpdateModel;

    if (this.formUser.invalid) {
      return;
    }

    if (!updateData.password) {
      delete updateData.password;
    }

    this.userService.updateUser(this.id, updateData, {
      onSuccess: () => {
        this.userStore.fetchUsers();
        alert('Successfully Update Data');
      },
      onError: (err: any) => {
        alert(err);
      },
    });

    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(false);
  }
}
