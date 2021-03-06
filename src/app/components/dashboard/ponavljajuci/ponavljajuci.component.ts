import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Predracun } from 'src/app/model/Predracun';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';

@Component({
  selector: 'app-ponavljajuci',
  templateUrl: './ponavljajuci.component.html',
  styleUrls: ['./ponavljajuci.component.css']
})
export class PonavljajuciComponent implements OnInit {
  pracuni?: Array<Predracun> = [];
  kompanijaId?: string;
  dataSource?: any;

  displayedColumns: string[] = ['ime', 'datumI', 'datumV', 'iznos', 'status', 'detalji'];
  ukupniTrosak?: number = 0;
  nenaplaceno?: number = 0;
  ukupniPrihod?: number = 0


  pickDatumOd: any;
  pickDatumDo: any;
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) { }
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getPonavljajuciRacune(kompanijaId).subscribe(res => {
        this.pracuni = [];
        res.map((predracun: any) => {
          this.pracuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.pracuni;
          this.dataSource.sort = this.sort;
        })
        if (this.dataSource !== undefined) {
          this.dataSource.sortingDataAccessor = (item: any, property: any) => {
            switch (property) {
              case 'iznos': return item.ukupno;
              case 'datumI': {

                let newDate = new Date(item.pocetniDatum).valueOf();
                return newDate;
              }
              case 'datumV': {
                let newDate = new Date(item.zavrsniDatum).valueOf();
                return newDate;
              }
              default: return item[property];
            }
          };
        }

      })
    })

  }
  onDateChange(ev: any) {
    const start: number = ev.start;
    const end: number = ev.end;
    this.pickDatumOd = ev.start;
    this.pickDatumDo = ev.end;
    this.dataSource.data = this.pracuni?.filter((racun: any) =>
      racun.pocetniDatum >= start && racun.pocetniDatum <= end

    )

    if (this.dataSource.data.length === 0) {
      this.dataSource.data = this.pracuni;

    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

  }
}

