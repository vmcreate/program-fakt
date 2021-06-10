import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacijeComponent } from './informacije.component';

describe('InformacijeComponent', () => {
  let component: InformacijeComponent;
  let fixture: ComponentFixture<InformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
