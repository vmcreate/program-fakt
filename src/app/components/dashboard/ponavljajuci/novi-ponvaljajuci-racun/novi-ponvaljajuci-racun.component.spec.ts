import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviPonvaljajuciRacunComponent } from './novi-ponvaljajuci-racun.component';

describe('NoviPonvaljajuciRacunComponent', () => {
  let component: NoviPonvaljajuciRacunComponent;
  let fixture: ComponentFixture<NoviPonvaljajuciRacunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviPonvaljajuciRacunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviPonvaljajuciRacunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
