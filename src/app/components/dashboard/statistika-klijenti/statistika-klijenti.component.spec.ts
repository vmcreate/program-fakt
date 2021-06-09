import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistikaKlijentiComponent } from './statistika-klijenti.component';

describe('StatistikaKlijentiComponent', () => {
  let component: StatistikaKlijentiComponent;
  let fixture: ComponentFixture<StatistikaKlijentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistikaKlijentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistikaKlijentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
