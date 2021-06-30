import { Component, OnInit } from '@angular/core';
import { Klijent } from 'src/app/model/Klijent';
import { Kompanija } from 'src/app/model/Kompanija';
import { Proizvod } from 'src/app/model/Proizvod';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';


import jspdf from 'jspdf';
declare var jsPDF: any;

import html2canvas from 'html2canvas';
import { Predracun } from 'src/app/model/Predracun';
import { Router } from '@angular/router';
import { Domen } from 'src/app/model/Doment';
@Component({
  selector: 'app-nov-racun',
  templateUrl: './nov-racun.component.html',
  styleUrls: ['./nov-racun.component.css']
})
export class NovRacunComponent implements OnInit {
  klijenti?: Array<Klijent> = [];
  proizvodi?: Array<Proizvod> = [];
  domeni?: Array<Domen> = [];
  kompanija?: Kompanija;
  izabraniProizvodi: Array<any> = [];
  kompanijaId?: string;
  popust: number = 0;
  racun?: any;
  godina?: any = new Date().getFullYear();
  deposit: number = 0;
  ukupno: number = 0;
  sveUkupno?: number = 0;
  izabranaFirma?: Klijent;
  datumIzdavanja?: Date;
  datumVazenja?: Date;
  mesto: string | undefined;
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.klijentService.getKlijente(kompanijaId).subscribe(res => {
        this.klijenti = [];
        res.map((klijent: any) => {
          this.klijenti?.push({ ...klijent.payload.doc.data(), id: klijent.payload.doc.id })
        })
      })

      this.kompanijaService.getKompInfo(kompanijaId).subscribe((res: any) => {
        this.kompanija = { ...res.payload.data() };
        let racun = Number(this.kompanija?.racun) + 1;

        if (racun < 10) {
          return (this.racun = '000' + racun.toString());
        }
        else if (racun < 100) {
          return (this.racun = '00' + racun.toString());
        }
        else if (racun < 1000) {
          return (this.racun = '0' + racun.toString());
        }
        else {
          return (this.racun = racun);
        }

      })
    })




  }
  dodajStavku(p: any) {

    this.izabraniProizvodi?.push({
      datumDodele: new Date().valueOf(),
      klijent: this.izabranaFirma, id: p.id,
      ime: p.ime, napomena: p.napomena,
      cena: p.cena, troskovi: p.troskovi,
      kolicina: 1, ukupno: p.cena * 1
    })

    this.ukupno = this.izabraniProizvodi.reduce((a, b) => a + b.ukupno, 0)
    this.sveUkupno = this.ukupno - this.deposit - this.popust;
  }
  deleteIzabraniProizvod(id: any) {
    const index = this.izabraniProizvodi?.findIndex((ind, index) => index === id);
    this.izabraniProizvodi?.splice(Number(index), 1)
    this.ukupno = this.izabraniProizvodi.reduce((a, b) => a + b.ukupno, 0)
    this.sveUkupno = this.ukupno - this.deposit - this.popust;
  }
  changeKolicinu(kolicina: any, index: number) {
    const findIndx = this.izabraniProizvodi?.findIndex((ind, indx) => indx === index);
    let kolicinaN = Number(kolicina.value);
    if (kolicinaN < 1) {
      this.kompanijaService.toast('Kolicina ne moze biti manja od 1', 'OK')
      kolicinaN = 1;
      return;
    }


    this.izabraniProizvodi[findIndx].kolicina = kolicinaN;
    this.izabraniProizvodi[findIndx].ukupno = kolicinaN * this.izabraniProizvodi[findIndx].cena;
    this.ukupno = this.izabraniProizvodi.reduce((a, b) => a + b.ukupno, 0)
    this.sveUkupno = this.ukupno - this.deposit - this.popust;

  }
  popustEv() {
    if (this.popust > this.ukupno) {
      this.kompanijaService.toast('Ne moze popust biti veci od ukupne cene', 'OK')
      return;
    }
    this.sveUkupno = this.ukupno - this.deposit - this.popust;

  }
  depositEv() {
    if (this.deposit > this.ukupno) {
      this.kompanijaService.toast('Ne moze deposit biti veci od ukupne cene', 'OK')
      return;
    }

    this.sveUkupno = this.ukupno - this.deposit - this.popust;

  }

  izaberiFirmu(klijent: Klijent) {
    this.izabraniProizvodi = [];
    this.proizvodi = [];
    this.izabranaFirma = klijent;
    this.kompanijaService.toast('Klijent izabran', 'OK')
    this.proizvodService.getProizvode(this.kompanijaId).subscribe(res => {
      res.map((proizvod: any) => {
        this.proizvodi?.push({ ...proizvod.payload.doc.data(), id: proizvod.payload.doc.id })
      })
    })
    this.proizvodService.getDomene(this.kompanijaId).subscribe(res => {
      res.map((domen: any) => {
        const domenRes = domen.payload.doc.data();
        if (this.izabranaFirma?.id === domenRes.klijent.id || domenRes.datumDodele === null) {
          this.proizvodi?.push({ ...domen.payload.doc.data(), id: domen.payload.doc.id })
        }

      })

    })
  }
  // KONTROLE DUGMAD
  nacrt() {
    const domenArr: any = [];
    this.izabraniProizvodi.map(item => {

      if (item.napomena === 'Domen') {
        domenArr.push(item);
      } if (item.datumDodele === null || item.datumDodele === undefined) [
        item.datumDodele = new Date().valueOf()
      ]
    })
    const data: Predracun = {
      brojracuna: this.racun,
      ime: this.izabranaFirma?.firma,
      klijentUid: this.izabranaFirma?.id,
      datumIzdavanja: this.datumIzdavanja?.valueOf(),
      datumVazenja: this.datumVazenja?.valueOf(),
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'nacrt',
      mesto: this.mesto,
      godina: this.godina,
      placeno: false,
      kompanijaUid: this.kompanijaId

    }
    this.racunService.zapamtiRacunNacrt(this.kompanijaId, data, this.izabranaFirma?.id).then(() => {
      this.kompanijaService.updateRacun(this.kompanijaId, Number(this.racun)),
        this.kompanijaService.toast('Nacrt zapamcen', 'OK')

    }).then(() => {
      domenArr.forEach((domen: any) => {
        this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
      })

    })
      .then(() => this.router.navigateByUrl('/dashboard/racun'))

  }
  zavrsi() {
    const domenArr: any = [];
    this.izabraniProizvodi.map(item => {
      if (item.napomena === 'Domen') {
        domenArr.push(item);
      } if (item.datumDodele === null) [
        item.datumDodele === new Date().valueOf()
      ]
    })
    const data: Predracun = {
      brojracuna: this.racun,
      ime: this.izabranaFirma?.firma,
      klijentUid: this.izabranaFirma?.id,
      datumIzdavanja: this.datumIzdavanja?.valueOf(),
      datumVazenja: this.datumVazenja?.valueOf(),
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'zavrseno',
      mesto: this.mesto,
      godina: this.godina,
      placeno: false,
      kompanijaUid: this.kompanijaId
    }

    this.racunService.zapamtiRacunNacrt(this.kompanijaId, data, this.izabranaFirma?.id).then(() => {
      this.kompanijaService.updateRacun(this.kompanijaId, Number(this.racun)),
        this.kompanijaService.toast('Nacrt zapamcen', 'OK')

    }).then(() => {
      domenArr.forEach((domen: any) => {
        this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
      })

    })
      .then(() => this.router.navigateByUrl('/dashboard/racun'))

  }
  posalji() {
    //na mail
  }

}

