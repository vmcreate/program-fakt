import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Predracun } from 'src/app/model/Predracun';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';


@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit, OnDestroy {
  racuni?: Array<any> = [];
  kompanijaId?: string;
  subRacuni?: Subscription;
  subKompanija?: Subscription;
  // date range
  ukupniTrosak?: number = 0;
  nenaplaceno?: number = 0;
  ukupniPrihod?: number = 0
  ukupniTrosakRacuni?: Array<any> = [];
  neNaplceni?: Array<any> = [];
  naplaceniProizvod?: Array<any> = [];

  pickDatumOd: any;
  pickDatumDo: any;
  pickedRacuni?: Array<any> = [];
  // chart
  databar: any;
  datadoughnut: any;
  dataline: any;
  datapolar: any;
  datapie: any;
  dataradar: any;
  datacombo: any;
  chartOptions: any;
  labelChart: Array<any> = [];
  prihodChart: Array<any> = [];
  trosakChart: Array<any> = [];
  nenaplacenoChart: Array<any> = [];
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService) { }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.subRacuni = this.racunService.getRacune(kompanijaId).subscribe(res => {
        this.racuni = [];
        this.neNaplceni = [];
        this.naplaceniProizvod = [];
        this.ukupniTrosakRacuni = [];
        this.ukupniTrosak = 0;
        this.nenaplaceno = 0;
        this.ukupniPrihod = 0;

        res.map((predracun: any) => {
          this.racuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
          this.labelChart.push(new Date(predracun.payload.doc.data().datumIzdavanja).toLocaleDateString())
          if (predracun.payload.doc.data().status === 'zavrseno') {
            this.ukupniTrosakRacuni?.push(...predracun.payload.doc.data().proizvodi);

          }
          if (predracun.payload.doc.data().placeno === false && predracun.payload.doc.data().status === 'zavrseno') {
            this.neNaplceni?.push({ ukupno: predracun.payload.doc.data().ukupno });
            this.nenaplacenoChart.push(predracun.payload.doc.data().ukupno)
          }
          if (predracun.payload.doc.data().placeno === true && predracun.payload.doc.data().status === 'zavrseno') {
            this.naplaceniProizvod?.push({ ukupno: predracun.payload.doc.data().ukupno });
            this.prihodChart.push(predracun.payload.doc.data().ukupno)
          }
          this.ukupniTrosakRacuni?.map(item => {
            this.trosakChart.push(item.troskovi)
          })

        })
        //treba sve da gurenem u isti array pa iz njega da izvadim label i data
        console.log(this.racuni)
        this.dataline = {

          labels: [...this.labelChart],
          datasets: [
            {
              label: 'Trosak',
              borderColor: '#42A5F5',
              fill: false,
              data: [...this.trosakChart]
            },
            {
              label: 'Nenanplaceno',
              borderColor: '#FFA726',
              fill: false,
              data: [...this.nenaplacenoChart]
            }
            ,
            {
              label: 'Prihod',
              borderColor: '#006775',
              fill: false,
              data: [...this.prihodChart]
            }
          ]
        };
        this.ukupniTrosak = this.ukupniTrosakRacuni.reduce((a, b) => a + b.troskovi, 0);
        this.nenaplaceno = this.neNaplceni.reduce((a, b) => a + b.ukupno, 0);
        this.ukupniPrihod = this.naplaceniProizvod.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);


      })

    })


  }
  onDateChange(ev: any) {
    const start: number = ev.start;
    const end: number = ev.end;
    this.pickDatumOd = ev.start;
    this.pickDatumDo = ev.end;
    this.pickedRacuni = this.racuni?.filter((racun: any) =>
      racun.datumIzdavanja >= start && racun.datumIzdavanja <= end

    )
    console.log(this.pickedRacuni)
    if (this.pickedRacuni?.length === 0) {
      this.pickedRacuni = this.racuni
      this.calcTableResorlver();


    } else {
      this.calcTableResorlver();

    }
  }
  calcTableResorlver() {
    this.ukupniTrosakRacuni = [];
    this.neNaplceni = [];
    this.naplaceniProizvod = [];
    this.pickedRacuni?.map((racun: any) => {
      if (racun.status === 'zavrseno') {

        this.ukupniTrosakRacuni?.push(...racun.proizvodi);

      }
      if (racun.placeno === false && racun.status === 'zavrseno') {
        this.neNaplceni?.push({ ukupno: racun.ukupno });
        this.nenaplacenoChart.push(racun.ukupno)

      }
      if (racun.placeno === true && racun.status === 'zavrseno') {
        this.naplaceniProizvod?.push({ ukupno: racun.ukupno });
        this.prihodChart.push(racun.ukupno)

      }
      this.ukupniTrosakRacuni?.map(item => {
        this.trosakChart.push(item.troskovi)
      })

      this.ukupniTrosak = this.ukupniTrosakRacuni?.reduce((a, b) => a + b.troskovi, 0);
      this.nenaplaceno = this.neNaplceni?.reduce((a, b) => a + b.ukupno, 0);
      this.ukupniPrihod = this.naplaceniProizvod?.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);
    })
  }

  ngOnDestroy() {
    this.subRacuni?.unsubscribe();
    this.subKompanija?.unsubscribe();
  }
}
