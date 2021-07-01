import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDomenTableComponent } from './pdf-domen-table.component';

describe('PdfDomenTableComponent', () => {
  let component: PdfDomenTableComponent;
  let fixture: ComponentFixture<PdfDomenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDomenTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDomenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
