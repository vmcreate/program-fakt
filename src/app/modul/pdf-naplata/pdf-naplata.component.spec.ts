import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfNaplataComponent } from './pdf-naplata.component';

describe('PdfNaplataComponent', () => {
  let component: PdfNaplataComponent;
  let fixture: ComponentFixture<PdfNaplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfNaplataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfNaplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
