import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviProizvodComponent } from './novi-proizvod.component';

describe('NoviProizvodComponent', () => {
  let component: NoviProizvodComponent;
  let fixture: ComponentFixture<NoviProizvodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviProizvodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviProizvodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
