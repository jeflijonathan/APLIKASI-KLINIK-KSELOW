import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RekamMedis } from './rekam-medis';
// Tambahkan import ini agar testing tidak error
import { ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '../../common/components/dialog/dialog';

describe('RekamMedisComponent', () => {
  let component: RekamMedis;
  let fixture: ComponentFixture<RekamMedis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Tambahkan modul di sini
      imports: [RekamMedis, ReactiveFormsModule, Dialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RekamMedis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
