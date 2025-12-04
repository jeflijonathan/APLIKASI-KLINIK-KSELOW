import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .auth-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
      }
    `,
  ],
})
export class LayoutAuth {}
