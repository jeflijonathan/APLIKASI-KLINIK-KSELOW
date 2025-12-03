import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { UserModel } from '../../api/user/model';
import { UserStore } from './List/hook/user.store';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Update } from './Update/update';
import { Create } from './Create/create';

@Component({
  selector: 'app-user',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    Update,
    Create,
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserPage implements OnInit {
  Math = Math;
  isDialogOpen: boolean = false;
  isDialogUpdateOpen: boolean = false;
  updateId: string = '';

  data = (Math = Math);
  String = String;
  
  constructor(private cd: ChangeDetectorRef, public userStore: UserStore) {}

  ngOnInit() {
    this.userStore.fetchUsers();
  }

  get pagination() {
    return this.userStore.pagination();
  }

  get dataUsers() {
    return this.userStore.userList();
  }

  get state() {
    return this.userStore.getState();
  }

  openAddUserDialog() {
    this.isDialogOpen = true;
  }

  openUpdateUserDialog(id: string | undefined = 'kosong') {
    this.isDialogUpdateOpen = !this.isDialogUpdateOpen;
    this.updateId = id;
  }

  trackById(index: number, item: UserModel) {
    return item._id;
  }

  onSearch() {
    this.userStore.setPagination({ currentPage: 1 });
    this.userStore.fetchUsers();
  }

  onPageChange(page: number) {
    this.userStore.setPagination({ currentPage: page });
    this.userStore.fetchUsers();
  }

  onLimitChange(newLimit: number) {
    this.userStore.setPagination({
      limit: newLimit,
      currentPage: 1,
    });

    this.userStore.fetchUsers();
  }

  countByRole(role: string): number {
    return this.dataUsers.filter(user => user.role === role).length;
  }
}
