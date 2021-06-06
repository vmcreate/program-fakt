import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonavljajuciComponent } from './ponavljajuci.component';

describe('PonavljajuciComponent', () => {
  let component: PonavljajuciComponent;
  let fixture: ComponentFixture<PonavljajuciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonavljajuciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonavljajuciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
