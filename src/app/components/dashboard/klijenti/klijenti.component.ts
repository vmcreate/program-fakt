import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-klijenti',
  templateUrl: './klijenti.component.html',
  styleUrls: ['./klijenti.component.css']
})
export class KlijentiComponent implements OnInit, OnDestroy {
  klijenti?: Array<any> = [];
  fetchKlijente?: Array<Klijent> = [];
  displayedColumns: string[] = ['broj', 'ime', 'pib', 'detalji'];
  subKompanija?: Subscription;
  subKlijent?: Subscription;

  constructor(private klijentiService: KlijentService, private kompanijaService: KompanijaService) {

  }
  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(res => {
      this.klijenti = [];
      this.klijentiService.getKlijente(res).subscribe(res => {
        res.map((klijent => { this.klijenti?.push({ ...klijent.payload.doc.data(), id: klijent.payload.doc.id }) }))
        this.fetchKlijente = this.klijenti;
      })
    })

  }
  ngOnDestroy() {
    this.subKlijent?.unsubscribe();
    this.subKlijent?.unsubscribe();

  }
}

