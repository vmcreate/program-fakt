import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Predracun } from 'src/app/model/Predracun';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  dataSource?: any;
  racuni?: Array<Predracun>;
  kompanijaId?: string;
  displayedColumns: string[] = ['brojracuna', 'ime', 'datumI', 'datumV', 'iznos', 'status', 'placeno', 'detalji'];
  isLoading?: boolean;

  ukupniTrosak?: number = 0;
  nenaplaceno?: number = 0;
  ukupniPrihod?: number = 0
  ukupniTrosakRacuni?: Array<any> = [];
  neNaplceni?: Array<any> = [];
  naplaceniProizvod?: Array<any> = [];
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) {

  }
  @ViewChild(MatSort) sort?: MatSort;



  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.isLoading = true;
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      if (kompanijaId) {
        this.isLoading = false;
        this.racunService.getRacune(this.kompanijaId).subscribe(res => {
          this.racuni = [];
          this.neNaplceni = [];
          this.naplaceniProizvod = [];
          this.ukupniTrosakRacuni = [];
          this.ukupniTrosak = 0;
          this.nenaplaceno = 0;
          this.ukupniPrihod = 0

          res.map((predracun: any) => {
            this.racuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = this.racuni;
            this.dataSource.sort = this.sort;
            if (predracun.payload.doc.data().status === 'zavrseno') {
              this.ukupniTrosakRacuni?.push(...predracun.payload.doc.data().proizvodi);

            }
            if (predracun.payload.doc.data().placeno === false && predracun.payload.doc.data().status === 'zavrseno') {
              this.neNaplceni?.push({ ukupno: predracun.payload.doc.data().ukupno });

            }
            if (predracun.payload.doc.data().placeno === true && predracun.payload.doc.data().status === 'zavrseno') {
              this.naplaceniProizvod?.push({ ukupno: predracun.payload.doc.data().ukupno });

            }
          })
          this.ukupniTrosak = this.ukupniTrosakRacuni.reduce((a, b) => a + b.troskovi, 0);
          this.nenaplaceno = this.neNaplceni.reduce((a, b) => a + b.ukupno, 0);
          this.ukupniPrihod = this.naplaceniProizvod.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);
          this.dataSource.sortingDataAccessor = (item: any, property: any) => {
            switch (property) {
              case 'iznos': return item.ukupno;
              case 'datumI': {

                let newDate = new Date(item.datumIzdavanja).valueOf();
                return newDate;
              }
              case 'datumV': {
                let newDate = new Date(item.datumVazenja).valueOf();
                return newDate;
              }
              default: return item[property];
            }
          };
        })
      }
    })



  }


  placenoToggle(el: any) {
    const placeno = !el.placeno;
    this.racunService.updateRacunNacrt(this.kompanijaId, el.id, { placeno: placeno }, el.klijentUid)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  onDateChange(ev: any) {
    const start: number = ev.start;
    const end: number = ev.end;

    this.dataSource.data = this.racuni?.filter((racun: any) =>
      racun.datumIzdavanja >= start && racun.datumIzdavanja <= end

    )

    if (this.dataSource.data.length === 0) {
      this.dataSource.data = this.racuni;
      this.calcTableResorlver();

    } else {
      this.calcTableResorlver();

    }
  }
  calcTableResorlver() {
    this.ukupniTrosakRacuni = [];
    this.neNaplceni = [];
    this.naplaceniProizvod = [];
    this.dataSource.data.map((racun: any) => {
      if (racun.status === 'zavrseno') {

        this.ukupniTrosakRacuni?.push(...racun.proizvodi);
        console.log('UT', this.ukupniTrosakRacuni)
      }
      if (racun.placeno === false && racun.status === 'zavrseno') {
        this.neNaplceni?.push({ ukupno: racun.ukupno });
        console.log('NT', this.neNaplceni)

      }
      if (racun.placeno === true && racun.status === 'zavrseno') {
        this.naplaceniProizvod?.push({ ukupno: racun.ukupno });
        console.log('PP', this.naplaceniProizvod)

      }
      this.ukupniTrosak = this.ukupniTrosakRacuni?.reduce((a, b) => a + b.troskovi, 0);
      this.nenaplaceno = this.neNaplceni?.reduce((a, b) => a + b.ukupno, 0);
      this.ukupniPrihod = this.naplaceniProizvod?.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);
    })
  }
}
