import { Component, OnDestroy, OnInit } from '@angular/core';
import { Klijent } from 'src/app/model/Klijent';
import { Predracun } from 'src/app/model/Predracun';
import jspdf from 'jspdf';
import { Proizvod } from 'src/app/model/Proizvod';
import { Kompanija } from 'src/app/model/Kompanija';
import { KlijentService } from 'src/app/service/klijent.service';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { RacunService } from 'src/app/service/racun.service';
declare var jsPDF: any;
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Pracun } from 'src/app/model/Pracun';

@Component({
  selector: 'app-ponavljajuci-detalji',
  templateUrl: './ponavljajuci-detalji.component.html',
  styleUrls: ['./ponavljajuci-detalji.component.css']
})
export class PonavljajuciDetaljiComponent implements OnInit, OnDestroy {
  klijent?: string;
  proizvodi?: Array<any> = [];
  kompanija?: Kompanija;
  izabraniProizvodi: Array<any> = [];
  kompanijaId?: string;
  popust: number = 0;
  godina?: any;
  deposit: number = 0;
  ukupno: number = 0;
  sveUkupno?: number = 0;
  izabranaFirma?: Klijent;
  datumIzdavanja?: number;
  datumVazenja?: number;
  mesto: string | undefined;
  ulica?: string;
  routeId?: string;
  KlijentUid?: string;
  klijentFirma?: string;
  subKompanija?: Subscription;
  klijentPib: any;
  klijentMB: any;
  backgroundImg?: any;
  brojponude: string = 'Bice dodeljeno';
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.route.params.subscribe(params => {
      const id = params['id']
      this.routeId = id;
    })
    this.subKompanija = this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getPonavljajuciRacun(kompanijaId, this.routeId).subscribe((res: any) => {

        const { mesto, pocetniDatum, pib, ulica, maticni_broj, zavrsniDatum, status, ime, proizvodi, deposit, popust, ukupno, godina, klijentUid }: any = res.payload.data();

        this.mesto = mesto;
        this.datumIzdavanja = pocetniDatum;
        this.datumVazenja = zavrsniDatum;
        this.klijent = ime;
        this.godina = godina;
        this.deposit = Number(deposit);
        this.popust = Number(popust);
        this.ulica = ulica;
        this.izabraniProizvodi = [];
        this.klijentPib = pib;
        this.klijentMB = maticni_broj;
        this.KlijentUid = klijentUid;
        proizvodi?.map((proizvod: any) => {
          this.izabraniProizvodi.push(proizvod)
        })
        this.klijentService.getKlijenta(klijentUid).subscribe((res: any) => {
          this.klijentMB = res.payload.data().maticni_broj;
          this.klijentPib = res.payload.data().pib;
          this.klijentFirma = res.payload.data().firma;
          this.izabranaFirma = res.payload.data();
        })

        this.ukupno = this.izabraniProizvodi.reduce((a, b) => a + b.ukupno, 0)
        this.sveUkupno = this.ukupno - this.popust;
      })
      this.proizvodService.getProizvode(kompanijaId).subscribe(res => {
        this.proizvodi = [];
        res.map((proizvod: any) => {
          this.proizvodi?.push({ ...proizvod.payload.doc.data(), id: proizvod.payload.doc.id })
        })
      })
      this.proizvodService.getDomene(this.kompanijaId).subscribe(res => {
        res.map((domen: any) => {
          const domenRes = domen.payload.doc.data();
          if (this.KlijentUid === domenRes.klijent.id || domenRes.datumDodele === null) {
            this.proizvodi?.push({ ...domen.payload.doc.data(), id: domen.payload.doc.id })
          }

        })
      })
      this.kompanijaService.getKompInfo(kompanijaId).subscribe((res: any) => {
        this.kompanija = { ...res.payload.data() };


      })
    })
  }
  dodajStavku(p: Proizvod) {
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
    this.sveUkupno = this.ukupno - this.popust;
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
    this.sveUkupno = this.ukupno - this.popust;

  }
  popustEv() {
    if (this.popust > this.ukupno) {
      this.kompanijaService.toast('Ne moze popust biti veci od ukupne cene', 'OK')
      return;
    }
    this.sveUkupno = this.ukupno - this.popust;

  }
  depositEv() {
    if (this.deposit > this.ukupno) {
      this.kompanijaService.toast('Ne moze deposit biti veci od ukupne cene', 'OK')
      return;
    }

    this.sveUkupno = this.ukupno - this.popust;

  }
  public convetToPDF() {
    let DATA: any = document.getElementById('pdf');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 200;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jspdf('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 3, 3, 208, 250)

      PDF.save('angular-demo.pdf');
    });
  }
  izaberiFirmu(klijent: Klijent) {
    this.izabranaFirma = klijent;
  }
  // KONTROLE DUGMAD
  nacrt() {
    const domenArr: any = [];
    this.izabraniProizvodi.map(item => {
      if (item.napomena === 'Domen') {
        domenArr.push(item);
      } if (item.datumDodele === null) [
        item.datumDodele === new Date().valueOf()
      ]
    })
    const data: Pracun = {
      ime: this.klijent,
      pocetniDatum: this.datumIzdavanja?.valueOf(),
      zavrsniDatum: this.datumVazenja?.valueOf(),
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'nacrt',
      mesto: this.mesto,
      godina: this.godina,
      kompanijaUid: this.kompanijaId,
      deposit: 0,
      placeno: false

    }

    this.racunService.updatePonavljajuciRacunNacrt(this.kompanijaId, this.routeId, data)
      .then(() => {
        domenArr.forEach((domen: any) => {
          this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
        })

      }).then(() => {
        this.router.navigate(['dashboard', 'ponavljajuci-racun'])
      });
    this.kompanijaService.toast('Racun zapamcen', 'OK')
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
    const data: Pracun = {
      ime: this.klijent,
      pocetniDatum: this.datumIzdavanja?.valueOf(),
      zavrsniDatum: this.datumVazenja?.valueOf(),
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'zavrseno',
      mesto: this.mesto,
      godina: this.godina,
      kompanijaUid: this.kompanijaId,
      deposit: 0,
      placeno: false

    }

    this.racunService.updatePonavljajuciRacunNacrt(this.kompanijaId, this.routeId, data)
      .then(() => {
        domenArr.forEach((domen: any) => {
          this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
        })

      }).then(() => {
        this.router.navigate(['dashboard', 'ponavljajuci-racun'])
      });
    this.kompanijaService.toast('Racun zapamcen', 'OK')
  }
  posalji() { }
  deleteP() {
    this.racunService.deletePonavljajuciRacun(this.kompanijaId, this.routeId)
      .then(() => {
        this.kompanijaService.toast('Predracun uspesno izbrisan, Klijent vise  nije u mogucnosti da ga vidi.', 'OK')

      })
  }



  ngOnDestroy() {
    this.subKompanija?.unsubscribe();
  }
}


