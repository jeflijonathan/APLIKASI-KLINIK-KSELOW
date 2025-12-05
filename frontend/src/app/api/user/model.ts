import { FormControl } from '@angular/forms';

export type UserModel = {
  _id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'DOKTER' | 'PERAWAT' | 'KASIR';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserCreateModel = {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'DOKTER' | 'PERAWAT' | 'KASIR';
};

export type UserUpdateModel = {
  username: string;
  email: string;
  role: 'ADMIN' | 'DOKTER' | 'PERAWAT' | 'KASIR';
  isActive: boolean;
  password?: string;
};

export type UserFormUpdateModel = {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  role: FormControl<string | null>;
  isActive: FormControl<boolean | null>;
  password: FormControl<string | null>;
};
