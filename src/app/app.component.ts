import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { KompanijaService } from './service/kompanija.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'program-fakt';
  isAuth: boolean = false;
  constructor(private auth: AuthService, private router: Router, private dbk: KompanijaService) {

  }
  ngOnInit(): void {
    this.auth.checkStatus().subscribe(auth => {
      if (auth) {
        this.isAuth = true;
        this.dbk.getKompaniju();
        this.dbk.isAdminKompanija(auth.uid);
      }
      else {
        this.router.navigate(['enter']);
      }
    })

  }
}
