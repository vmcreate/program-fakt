import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { RacunService } from 'src/app/service/racun.service';

@Component({
  selector: 'app-statistika-klijenti',
  templateUrl: './statistika-klijenti.component.html',
  styleUrls: ['./statistika-klijenti.component.css']
})
export class StatistikaKlijentiComponent implements OnInit, OnDestroy {
  dataSource?: any;
  klijenti?: Array<any> = [];
  fetchKlijente?: Array<Klijent> = [];
  displayedColumns: string[] = ['broj', 'ime', 'pib', 'detalji'];
  subKompanija?: Subscription;
  subKlijent?: Subscription;
  kompanijaId: any;
  isLoading?: boolean;
  racuniCG?: Array<any> = [];
  dstatistika: Array<any> = [];
  color = '#3690f42b';
  constructor(private klijentiService: KlijentService, private kompanijaService: KompanijaService, private racuniService: RacunService) {

  }
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    let brojDoktori: any = {};
    this.kompanijaService.getKompaniju()
    this.isLoading = true;
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(res => {
      this.kompanijaId = res;
      this.isLoading = false;
      if (this.kompanijaId) {

        this.klijentiService.getKlijente(this.kompanijaId).subscribe(res => {
          this.klijenti = [];
          this.dataSource = [];
          res.map((klijent => { this.klijenti?.push({ ...klijent.payload.doc.data(), id: klijent.payload.doc.id }) }))
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.klijenti;
          this.dataSource.sort = this.sort;

        })
      }
    })

    this.racuniService.getRacuneCG().subscribe(res => {
      this.dstatistika = [];
      this.racuniCG = [];
      res.map((racun: any) => {
        const id = racun.payload.doc.data().kompanijaUid;
        const data = racun.payload.doc.data().proizvodi;
        if (id === this.kompanijaId) {
          this.racuniCG?.push(...data)
        }

      })

      this.racuniCG?.forEach(function (i) { brojDoktori[i.ime] = (brojDoktori[i.ime] || 0) + 1; });
      for (let [key, value] of Object.entries(brojDoktori)) {
        this.dstatistika?.push({ proizvod: key, broj: Number(value) / 2 })
      }
    })


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

  }
  ngOnDestroy() {
    this.subKlijent?.unsubscribe();
    this.subKlijent?.unsubscribe();

  }
}