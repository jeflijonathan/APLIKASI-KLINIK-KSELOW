import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasienPage } from './pasien-page';

describe('PasienPage', () => {
  let component: PasienPage;
  let fixture: ComponentFixture<PasienPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasienPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PasienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
