import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaDetaljiComponent } from './ponuda-detalji.component';

describe('PonudaDetaljiComponent', () => {
  let component: PonudaDetaljiComponent;
  let fixture: ComponentFixture<PonudaDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
