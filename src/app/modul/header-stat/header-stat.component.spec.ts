import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStatComponent } from './header-stat.component';

describe('HeaderStatComponent', () => {
  let component: HeaderStatComponent;
  let fixture: ComponentFixture<HeaderStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
