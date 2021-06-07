import { Component, OnInit } from '@angular/core';
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
export class StatistikaComponent implements OnInit {
  racuni?: Array<any> = [];
  neNaplceni?: Array<any> = [];
  naplaceniProizvod?: Array<any> = [];
  ukupniTrosak?: number = 0;
  nenaplaceno?: number = 0;
  ukupniPrihod?: number = 0
  kompanijaId?: string;
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService) { }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getRacune(kompanijaId).subscribe(res => {
        this.racuni = [];
        this.neNaplceni = [];
        this.naplaceniProizvod = [];
        this.ukupniTrosak = 0;
        this.nenaplaceno = 0;
        this.ukupniPrihod = 0
        res.map((predracun: any) => {
          if (predracun.payload.doc.data().status === 'zavrseno') {
            this.racuni?.push(...predracun.payload.doc.data().proizvodi);

          }
          if (predracun.payload.doc.data().placeno === false && predracun.payload.doc.data().status === 'zavrseno') {
            this.neNaplceni?.push(...predracun.payload.doc.data().proizvodi);

          }
          if (predracun.payload.doc.data().placeno === true && predracun.payload.doc.data().status === 'zavrseno') {
            this.naplaceniProizvod?.push(...predracun.payload.doc.data().proizvodi);

          }
        })

        this.ukupniTrosak = this.racuni.reduce((a, b) => a + b.troskovi, 0);
        this.nenaplaceno = this.neNaplceni.reduce((a, b) => a + b.ukupno, 0);
        this.ukupniPrihod = this.naplaceniProizvod.reduce((a, b) => a + b.ukupno, 0) - Number(this.ukupniTrosak);
        console.log('Nenaplaceno:', this.nenaplaceno, 'Ukupni trosak:', this.ukupniTrosak, 'Ukupni prihod:', this.ukupniPrihod)

      })
    })

  }

}
