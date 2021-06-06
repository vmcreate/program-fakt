import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonavljajuciDetaljiComponent } from './ponavljajuci-detalji.component';

describe('PonavljajuciDetaljiComponent', () => {
  let component: PonavljajuciDetaljiComponent;
  let fixture: ComponentFixture<PonavljajuciDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonavljajuciDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonavljajuciDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
