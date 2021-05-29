import { Component, OnInit } from '@angular/core';
import { Klijent } from 'src/app/model/Klijent';
import { Predracun } from 'src/app/model/Predracun';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.css']
})
export class PonudeComponent implements OnInit {
  predracuni?: Array<Predracun> = [];
  kompanijaId?: string;
  displayedColumns: string[] = ['brojpredracuna', 'ime', 'datumI', 'datumV', 'iznos', 'status', 'detalji'];

  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) { }

  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getPredracune(kompanijaId).subscribe(res => {
        this.predracuni = [];
        res.map((predracun: any) => {
          this.predracuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
        })

      })
    })

  }

}
