import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-nova-kompanija-forma',
  templateUrl: './nova-kompanija-forma.component.html',
  styleUrls: ['./nova-kompanija-forma.component.css']
})
export class NovaKompanijaFormaComponent {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService) { }

  onNoClick(): void {

    this.dialogRef.close();
  }

  dodaj(f: NgForm) {
    const { email, password, ime, prezime, kompanija } = f.value;

    this.auth.createCompany(email, password, ime, prezime, kompanija).then(() => {
      this.dialogRef.close();
    })

  }
}
