import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RekamMedisPage } from './rekam-medis';

describe('RekamMedisPage', () => {
  let component: RekamMedisPage;
  let fixture: ComponentFixture<RekamMedisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RekamMedisPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RekamMedisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
