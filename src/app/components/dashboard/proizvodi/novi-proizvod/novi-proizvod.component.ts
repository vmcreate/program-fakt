import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/model/Proizvod';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-novi-proizvod',
  templateUrl: './novi-proizvod.component.html',
  styleUrls: ['./novi-proizvod.component.css']
})
export class NoviProizvodComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  kompanija: string | undefined;
  constructor(private proizvodService: ProizvodService, private kompanijaService: KompanijaService, private router: Router) {
    this.subscription = this.kompanijaService.getIzabranuKompaniju().subscribe(res => this.kompanija = res)

  }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
  }
  dodajProizvod(f: NgForm) {
    const data: Proizvod = f.value;
    console.log(this.kompanija)
    this.proizvodService.dodajProizvod(this.kompanija, data).then(() => {
      this.router.navigate(['/dashboard/', 'proizvodi']);
      f.resetForm();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
