import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHealthComponent } from './product-health.component';

describe('ProductHealthComponent', () => {
  let component: ProductHealthComponent;
  let fixture: ComponentFixture<ProductHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
