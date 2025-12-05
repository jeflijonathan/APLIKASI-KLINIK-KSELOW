import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasienService } from '../../../api/pasien';
import { DataWithPagination, FetchCallback } from '../../../common/type';
import { PasienModel } from '../../../api/pasien/model';

@Component({
  selector: 'app-pasien-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {
  daftarPasien: PasienModel[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private pasienService: PasienService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Loading pasien data...');
    
    this.pasienService.getPasienData({
      onSuccess: (res: DataWithPagination<PasienModel[]>) => {
        console.log('Data loaded:', res.data);
        this.daftarPasien = res.data || [];
        this.isLoading = false;
      },
      onError: (error: any) => {
        this.errorMessage = `Error: ${error}`;
        this.isLoading = false;
        console.error('Gagal memuat data pasien:', error);
      },
      onFullfilled: () => {
        console.log('Data loading finished');
      }
    });
  }
}
