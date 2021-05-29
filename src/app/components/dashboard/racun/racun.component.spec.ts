import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacunComponent } from './racun.component';

describe('RacunComponent', () => {
  let component: RacunComponent;
  let fixture: ComponentFixture<RacunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
