import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacunDetaljiComponent } from './racun-detalji.component';

describe('RacunDetaljiComponent', () => {
  let component: RacunDetaljiComponent;
  let fixture: ComponentFixture<RacunDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacunDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacunDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
