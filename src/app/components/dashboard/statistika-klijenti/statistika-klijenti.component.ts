import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

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

  constructor(private klijentiService: KlijentService, private kompanijaService: KompanijaService) {

  }
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {

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