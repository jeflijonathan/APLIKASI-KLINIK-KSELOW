export type PasienModel = {
  _id: string;
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-Laki' | 'Perempuan';
  asuransi: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PasienCreateModel = {
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-Laki' | 'Perempuan';
  asuransi: string;
};

export type PasienUpdateModel = {
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-Laki' | 'Perempuan';
  asuransi: string;
  isActive: boolean;
};
