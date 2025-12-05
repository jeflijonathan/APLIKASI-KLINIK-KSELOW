import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
      <h2>API Connection Test</h2>
      
      <div style="margin: 20px 0;">
        <button (click)="testUsers()" style="margin-right: 10px; padding: 10px 20px; cursor: pointer;">
          Test /api/users
        </button>
        <button (click)="testPasien()" style="margin-right: 10px; padding: 10px 20px; cursor: pointer;">
          Test /api/pasien
        </button>
      </div>

      <div *ngIf="testResult" style="margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background: #f5f5f5;">
        <h3>Result:</h3>
        <pre>{{ testResult | json }}</pre>
      </div>

      <div *ngIf="testError" style="margin-top: 20px; padding: 15px; border: 1px solid red; border-radius: 5px; background: #ffebee; color: red;">
        <h3>Error:</h3>
        <pre>{{ testError }}</pre>
      </div>
    </div>
  `
})
export class ApiTestComponent implements OnInit {
  testResult: any = null;
  testError: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('API Test Component Loaded');
  }

  testUsers() {
    this.testError = '';
    this.testResult = null;
    
    console.log('Testing /api/users...');
    this.http.get('http://localhost:3000/api/users').subscribe(
      (response: any) => {
        console.log('Success:', response);
        this.testResult = response;
      },
      (error: any) => {
        const errorMsg = error.error?.message || error.message || JSON.stringify(error);
        console.error('Error:', errorMsg);
        this.testError = errorMsg;
      }
    );
  }

  testPasien() {
    this.testError = '';
    this.testResult = null;
    
    console.log('Testing /api/pasien...');
    this.http.get('http://localhost:3000/api/pasien').subscribe(
      (response: any) => {
        console.log('Success:', response);
        this.testResult = response;
      },
      (error: any) => {
        const errorMsg = error.error?.message || error.message || JSON.stringify(error);
        console.error('Error:', errorMsg);
        this.testError = errorMsg;
      }
    );
  }
}
