import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovPredracunComponent } from './nov-predracun.component';

describe('NovPredracunComponent', () => {
  let component: NovPredracunComponent;
  let fixture: ComponentFixture<NovPredracunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovPredracunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovPredracunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
