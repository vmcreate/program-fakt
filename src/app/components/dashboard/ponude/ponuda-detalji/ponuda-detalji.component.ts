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
  datumIzdavanja?: Date;
  datumVazenja?: Date;
  mesto: string | undefined;
  routeId?: string;
  KlijentUid?: string;

  subKompanija?: Subscription;
  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService,
    private route: ActivatedRoute,
    private router: Router
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

        const { brojponude, mesto, datumIzdavanja, datumVazenja, status, ime, proizvodi, deposit, popust, ukupno, godina, klijentUid }: any = res.payload.data();

        this.brojponude = brojponude;
        this.mesto = mesto;
        this.datumIzdavanja = datumIzdavanja;
        this.datumVazenja = datumVazenja;
        this.klijent = ime;
        this.godina = godina;
        this.deposit = Number(deposit);
        this.popust = Number(popust);
        this.izabraniProizvodi = [];
        this.KlijentUid = klijentUid;
        proizvodi?.map((proizvod: any) => {
          this.izabraniProizvodi.push(proizvod)
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

    })
  }
  dodajStavku(p: Proizvod) {
    this.izabraniProizvodi?.push({ id: p.id, proizvod: p.proizvod, napomena: p.napomena, cena: p.cena, kolicina: 1, ukupno: p.cena * 1 })
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
      alert('Kolicina ne moze biti manja od 1');
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
      alert('Ne mooze popust biti veci od ukupne cene')
      return;
    }
    this.sveUkupno = this.ukupno - this.deposit - this.popust;

  }
  depositEv() {
    if (this.deposit > this.ukupno) {
      alert('Ne mooze deposit biti veci od ukupne cene')
      return;
    }

    this.sveUkupno = this.ukupno - this.deposit - this.popust;

  }
  public convetToPDF() {
    const data: any = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 200;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.autoPrint();
      pdf.output('dataurlnewwindow');
      // pdf.save('new-file.pdf'); // Generated PDF
    });
  }
  izaberiFirmu(klijent: Klijent) {
    this.izabranaFirma = klijent;
  }
  // KONTROLE DUGMAD
  nacrt() {
    const data: Predracun = {
      brojponude: this.brojponude,
      ime: this.klijent,
      datumIzdavanja: this.datumIzdavanja,
      datumVazenja: this.datumVazenja,
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'nacrt',
      mesto: this.mesto,
      godina: this.godina
    }

    this.racunService.updateNacrt(this.kompanijaId, this.routeId, data, this.KlijentUid)
  }
  zavrsi() {
    const data: Predracun = {
      brojponude: this.brojponude,
      ime: this.klijent,
      datumIzdavanja: this.datumIzdavanja,
      datumVazenja: this.datumVazenja,
      deposit: this.deposit,
      popust: this.popust,
      ukupno: this.sveUkupno,
      proizvodi: this.izabraniProizvodi,
      status: 'zavrseno',
      mesto: this.mesto,
      godina: this.godina
    }

    this.racunService.updateNacrt(this.kompanijaId, this.routeId, data, this.KlijentUid)
  }
  posalji() { }
  deleteP() {
    this.racunService.deletePredracun(this.kompanijaId, this.routeId, this.KlijentUid)
  }

  ngOnDestroy() {
    this.subKompanija?.unsubscribe();
  }
}
