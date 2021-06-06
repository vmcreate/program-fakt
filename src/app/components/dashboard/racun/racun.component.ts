import { Component, OnInit } from '@angular/core';
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
  racuni?: Array<Predracun> = [];
  kompanijaId?: string;
  displayedColumns: string[] = ['brojracuna', 'ime', 'datumI', 'datumV', 'iznos', 'status', 'placeno', 'detalji'];

  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) { }

  ngOnInit() {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getRacune(kompanijaId).subscribe(res => {
        this.racuni = [];
        res.map((predracun: any) => {
          this.racuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
        })

      })
    })

  }
  placenoToggle(el: any) {
    const placeno = !el.placeno;
    this.racunService.updateRacunNacrt(this.kompanijaId, el.id, { placeno: placeno }, el.klijentUid)
  }
}
