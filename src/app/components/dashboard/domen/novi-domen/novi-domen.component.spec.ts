import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviDomenComponent } from './novi-domen.component';

describe('NoviDomenComponent', () => {
  let component: NoviDomenComponent;
  let fixture: ComponentFixture<NoviDomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviDomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviDomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
