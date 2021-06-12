import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/model/Proizvod';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.css']
})
export class ProizvodiComponent implements OnInit, OnDestroy {
  proizvodi?: Array<any> = [];
  fetchProizvode?: Array<Proizvod> = [];
  displayedColumns: string[] = ['ime', 'cena', 'troskovi', 'napomena', 'detalji'];
  subKompanija?: Subscription;
  subKlijent?: Subscription;

  constructor(private klijentiService: KlijentService,
    private kompanijaService: KompanijaService, private proizvodiService: ProizvodService) {

  }
  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(res => {
      this.proizvodi = [];
      this.proizvodiService.getProizvode(res).subscribe(res => {
        res.map((proizvod => { this.proizvodi?.push({ ...proizvod.payload.doc.data(), id: proizvod.payload.doc.id }) }))
        this.fetchProizvode = this.proizvodi;
      })
    })

  }
  ngOnDestroy() {
    this.subKlijent?.unsubscribe();
    this.subKlijent?.unsubscribe();

  }
}

