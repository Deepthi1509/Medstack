import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareProductsComponent } from './healthcare-products.component';

describe('HealthcareProductsComponent', () => {
  let component: HealthcareProductsComponent;
  let fixture: ComponentFixture<HealthcareProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcareProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
