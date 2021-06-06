import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['ime', 'datumI', 'datumV', 'iznos', 'status', 'detalji'];

  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) { }

  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getPonavljajuciRacune(kompanijaId).subscribe(res => {
        this.pracuni = [];
        res.map((predracun: any) => {
          this.pracuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
        })

      })
    })

  }

}

