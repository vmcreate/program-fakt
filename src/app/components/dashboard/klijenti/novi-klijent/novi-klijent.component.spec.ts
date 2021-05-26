import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviKlijentComponent } from './novi-klijent.component';

describe('NoviKlijentComponent', () => {
  let component: NoviKlijentComponent;
  let fixture: ComponentFixture<NoviKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviKlijentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
