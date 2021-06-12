import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomenInformacijeComponent } from './domen-informacije.component';

describe('DomenInformacijeComponent', () => {
  let component: DomenInformacijeComponent;
  let fixture: ComponentFixture<DomenInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomenInformacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomenInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
