import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FilterType } from '../common/type';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base;
  header;

  constructor(private http: HttpClient) {
    this.base = 'http://localhost:3000';
    this.header = {
      'Content-Type': 'application/json',
    };
  }

  async GET(path: string, params: FilterType) {
    try {
      const headers = new HttpHeaders(this.header);
      return await firstValueFrom(this.http.get(this.base + path, { headers }));
    } catch (err) {
      console.error('GET error:', err);
      return null;
    }
  }

  async POST(path: string, body: any) {
    try {
      return await firstValueFrom(this.http.post(this.base + path, body));
    } catch (err) {
      console.error('POST error:', err);
      return null;
    }
  }

  async PUT(path: string, body: any) {
    try {
      return await firstValueFrom(this.http.put(this.base + path, body));
    } catch (err) {
      console.error('PUT error:', err);
      return null;
    }
  }

  async DELETE(path: string) {
    try {
      return await firstValueFrom(this.http.delete(this.base + path));
    } catch (err) {
      console.error('DELETE error:', err);
      return null;
    }
  }
}
