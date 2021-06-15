import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/model/Klijent';
import { Proizvod } from 'src/app/model/Proizvod';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';

@Component({
  selector: 'app-informacije',
  templateUrl: './informacije.component.html',
  styleUrls: ['./informacije.component.css']
})
export class InformacijeComponent implements OnInit, OnDestroy {
  dataSource?: any;
  racuni?: Array<any> = [];
  predracuni?: Array<any> = [];
  displayedColumns: string[] = ['tip', 'ime', 'iznos', 'datumI', 'datumV', 'status', 'placeno'];
  subKompanija?: Subscription;
  subKlijent?: Subscription;
  subRacun?: Subscription;
  subPredracun?: Subscription;
  kompanijaId: any;
  isLoading?: boolean;
  routeSub: any;
  proizvodi?: Array<Proizvod> = [];
  proizvodiUnique?: Array<any> = [];
  color = '#3690f42b';
  ukupniTrosak?: number = 0;
  nenaplaceno?: number = 0;
  ukupniPrihod?: number = 0
  ukupniTrosakRacuni?: Array<any> = [];
  neNaplceni?: Array<any> = [];
  naplaceniProizvod?: Array<any> = [];
  constructor(private klijentService: KlijentService, private kompanijaService: KompanijaService, private route: ActivatedRoute) { }
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.kompanijaService.getKompaniju()
    this.isLoading = true;
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(res => {
      this.kompanijaId = res;
      this.route.params.subscribe(params => {
        this.routeSub = params['id']
      });
    })
    setTimeout(() => {
      this.klijentService.getKlijentRP(this.routeSub).then(data => {
        const { racun, predracun } = data;
        this.isLoading = false;
        this.subRacun = racun.subscribe(racuni => {
          this.racuni = [];
          this.ukupniTrosak = 0;
          this.nenaplaceno = 0;
          this.ukupniPrihod = 0
          racuni.map(racun => {
            if (this.kompanijaId === racun.payload.doc.data().kompanijaUid) {
              this.racuni?.push({ ...racun.payload.doc.data(), id: racun.payload.doc.data(), tip: 'Racun' })
              this.proizvodi?.push(...racun.payload.doc.data().proizvodi)
              if (racun.payload.doc.data().status === 'zavrseno') {
                this.ukupniTrosakRacuni?.push(...racun.payload.doc.data().proizvodi);

              }
              if (racun.payload.doc.data().placeno === false && racun.payload.doc.data().status === 'zavrseno') {
                this.neNaplceni?.push({ ukupno: racun.payload.doc.data().ukupno });

              }
              if (racun.payload.doc.data().placeno === true && racun.payload.doc.data().status === 'zavrseno') {

                this.naplaceniProizvod?.push({ ukupno: racun.payload.doc.data().ukupno });

              }
              this.ukupniTrosak = this.ukupniTrosakRacuni?.reduce((a, b) => a + b.troskovi, 0);
              this.nenaplaceno = this.neNaplceni?.reduce((a, b) => a + b.ukupno, 0);
              this.ukupniPrihod = this.naplaceniProizvod?.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);
            }

          })
          this.subPredracun = predracun.subscribe(predracuni => {

            let unique: any = [];
            this.predracuni = [];
            predracuni.map(predracun => {

              if (this.kompanijaId === predracun.payload.doc.data().kompanijaUid) {

                this.predracuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.data(), tip: 'Predracun' })
                this.proizvodi?.push(...predracun.payload.doc.data().proizvodi)
              }
            });
            unique = this.proizvodi?.map(proizvod => {
              return proizvod.ime
            })

            this.proizvodiUnique = [...new Set(unique)];
            this.isLoading = false;
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = this.racuni?.concat(this.predracuni);


          })

        })
      })
    }, 1500);



  }
  ngOnDestroy() {
    this.subKompanija?.unsubscribe();
    this.subKlijent?.unsubscribe();
    this.subPredracun?.unsubscribe();
    this.subRacun?.unsubscribe();
  }
}
