import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKlijentaComponent } from './profil-klijenta.component';

describe('ProfilKlijentaComponent', () => {
  let component: ProfilKlijentaComponent;
  let fixture: ComponentFixture<ProfilKlijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilKlijentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKlijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
