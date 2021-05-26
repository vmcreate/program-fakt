import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaKompanijaFormaComponent } from './nova-kompanija-forma.component';

describe('NovaKompanijaFormaComponent', () => {
  let component: NovaKompanijaFormaComponent;
  let fixture: ComponentFixture<NovaKompanijaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaKompanijaFormaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaKompanijaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
