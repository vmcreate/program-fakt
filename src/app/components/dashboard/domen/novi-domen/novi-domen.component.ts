import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-novi-domen',
  templateUrl: './novi-domen.component.html',
  styleUrls: ['./novi-domen.component.css']
})
export class NoviDomenComponent implements OnInit {
  kompanijaId?: string;
  klijenti?: Array<Klijent> = [];
  izabranaFirma?: Klijent;
  constructor(private kompanijaService: KompanijaService,
    private klijentService: KlijentService,
    private location: Location,
    private proizvodService: ProizvodService) { }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.klijentService.getKlijente(kompanijaId).subscribe(res => {
        this.klijenti = [];
        res.map((klijent: any) => {
          this.klijenti?.push({ ...klijent.payload.doc.data(), id: klijent.payload.doc.id, napomena: 'Domen' })
        })
      })
    })
  }
  izaberiFirmu(klijent: Klijent) {
    this.izabranaFirma = klijent;
    this.kompanijaService.toast('Klijent izabran', 'OK')
  }
  goBack() {
    this.location.back();
  }
  dodajDomen(f: NgForm) {
    let { ime, klijent, datumDodele, cena, troskovi }: any = f.value;
    if (klijent !== '') {
      datumDodele = new Date().valueOf();
    } else {
      datumDodele = null;
      klijent = {}
    }
    this.proizvodService.dodajDomen(this.kompanijaId, { ime, klijent, datumDodele, cena, troskovi, napomena: 'Domen' }).then(() => {
      this.goBack()
    })

  }
}
