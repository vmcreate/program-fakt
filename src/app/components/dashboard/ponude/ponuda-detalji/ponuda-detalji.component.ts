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



@Component({
  selector: 'app-ponuda-detalji',
  templateUrl: './ponuda-detalji.component.html',
  styleUrls: ['./ponuda-detalji.component.css']
})
export class PonudaDetaljiComponent implements OnInit, OnDestroy {
  klijent?: string;
  proizvodi?: Array<any> = [];
  kompanija?: Kompanija;
  izabraniProizvodi: Array<any> = [];
  kompanijaId?: string;
  popust: number = 0;
  brojponude?: any;
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
  racun: any;
  predracun = 'Predracun';
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
      this.racunService.getPredracun(kompanijaId, this.routeId).subscribe((res: any) => {

        const { brojponude, mesto, datumIzdavanja, pib, ulica, maticni_broj, datumVazenja, status, ime, proizvodi, deposit, popust, ukupno, godina, klijentUid }: any = res.payload.data();
        this.brojponude = brojponude;
        this.mesto = mesto;
        this.datumIzdavanja = datumIzdavanja;
        this.datumVazenja = datumVazenja;
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
        this.sveUkupno = this.ukupno - this.deposit - this.popust;
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
    const data: Predracun = {
      brojponude: this.brojponude,
      ime: this.klijent,
      datumIzdavanja: this.datumIzdavanja?.valueOf(),
      datumVazenja: this.datumVazenja?.valueOf(),
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'nacrt',
      mesto: this.mesto,
      godina: this.godina,
      kompanijaUid: this.kompanijaId
    }
    console.log(data)
    this.racunService.updateNacrt(this.kompanijaId, this.routeId, data, this.KlijentUid)
      .then(() => {
        domenArr.forEach((domen: any) => {
          this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
        })

      }).then(() => {
        this.router.navigate(['dashboard', 'ponude'])
      });
    this.kompanijaService.toast('Predracun zapamcen', 'OK')
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
      brojponude: this.brojponude,
      ime: this.klijent,
      datumIzdavanja: this.datumIzdavanja?.valueOf(),
      datumVazenja: this.datumVazenja?.valueOf(),
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'zavrseno',
      mesto: this.mesto,
      godina: this.godina,
      kompanijaUid: this.kompanijaId
    }

    this.racunService.updateNacrt(this.kompanijaId, this.routeId, data, this.KlijentUid)
      .then(() => {
        domenArr.forEach((domen: any) => {
          this.proizvodService.updateDomen(this.kompanijaId, domen.id, { ...domen, klijent: domen.klijent, datumDodele: new Date().valueOf() })
        })

      }).then(() => {
        this.router.navigate(['dashboard', 'ponude'])
      });
    this.kompanijaService.toast('Predacun zapamcen', 'OK')
  }
  posalji() { }
  deleteP() {
    this.racunService.deletePredracun(this.kompanijaId, this.routeId, this.KlijentUid)
      .then(() => {
        this.kompanijaService.toast('Predracun uspesno izbrisan, Klijent vise  nije u mogucnosti da ga vidi.', 'OK')

      })
  }
  uFakturu() {
    const data: Predracun = {
      brojracuna: this.racun,
      ime: this.klijent,
      klijentUid: this.KlijentUid,
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

    this.racunService.zapamtiRacunNacrt(this.kompanijaId, data, this.KlijentUid).then(() => {
      this.kompanijaService.updateRacun(this.kompanijaId, Number(this.racun)),
        this.kompanijaService.toast(`PROFAKTURA JE PREBACENA U FAKTURU REDNI BROJ RACUNA ${this.racun}`, 'OK')

    }).then(() => this.router.navigateByUrl('/dashboard/racun'))
  }




  ngOnDestroy() {
    this.subKompanija?.unsubscribe();
  }
}


