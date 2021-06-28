import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistikaKlijentaComponent } from './statistika-klijenta.component';

describe('StatistikaKlijentaComponent', () => {
  let component: StatistikaKlijentaComponent;
  let fixture: ComponentFixture<StatistikaKlijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistikaKlijentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistikaKlijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
