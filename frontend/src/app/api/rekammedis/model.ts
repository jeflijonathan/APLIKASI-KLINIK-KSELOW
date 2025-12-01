import { FormControl } from "@angular/forms";

export type RekamMedisModel = {
  _id: number;
  pasien: {
    _id: number;
    nama: string;
  };
  tanggal: Date;
  keluhan: string;
  dokter: string;
  beratBadan: number;
  tekananDarah: string;
  suhuBadan: number;
  diagnosa: string;
  resep: string[];
  catatan: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RekamMedisCreateModel = {
    nama: string;
    tanggal: Date;
    keluhan: string;
    dokter: string;
    beratBadan: number;
    tekananDarah: string;
    suhuBadan: number;
    diagnosa: string;
    resep: string[];
    catatan: string;
}

export type RekamMedisFormCreateModel = {
    nama: FormControl<string | null>;
    tanggal: FormControl<Date | null>;
    keluhan: FormControl<string | null>;
    dokter: FormControl<string | null>;
    beratBadan: FormControl<number | null>;
    tekananDarah: FormControl<string | null>;
    suhuBadan: FormControl<number | null>;
    diagnosa: FormControl<string | null>;
    resep: FormControl<string[] | null>;
    catatan: FormControl<string | null>;
}

export type RekamMedisUpdateModel = {
    nama: string;
    tanggal: Date;
    keluhan: string;
    dokter: string;
    beratBadan: number;
    tekananDarah: string;
    suhuBadan: number;
    diagnosa: string;
    resep: string[];
    catatan: string;
    isActive: boolean;
}

export type RekamMedisFormUpdateModel = {
    nama: FormControl<string | null>;
    tanggal: FormControl<Date | null>;
    keluhan: FormControl<string | null>;
    dokter: FormControl<string | null>;
    beratBadan: FormControl<number | null>;
    tekananDarah: FormControl<string | null>;
    suhuBadan: FormControl<number | null>;
    diagnosa: FormControl<string | null>;
    resep: FormControl<string[] | null>;
    catatan: FormControl<string | null>;
    isActive: FormControl<boolean | null>;
}