import { Component, Input, OnInit } from '@angular/core';
import { Kompanija } from 'src/app/model/Kompanija';
import { Proizvod } from 'src/app/model/Proizvod';
import jspdf from 'jspdf';
declare var jsPDF: any;
import html2canvas from 'html2canvas';
import { RacunService } from 'src/app/service/racun.service';
import { HttpClient } from '@angular/common/http';
import { KompanijaService } from 'src/app/service/kompanija.service';
@Component({
  selector: 'pdf-naplata',
  templateUrl: './pdf-naplata.component.html',
  styleUrls: ['./pdf-naplata.component.css']
})
export class PdfNaplataComponent implements OnInit {
  fajl: any;


  constructor(private racunService: RacunService, private http: HttpClient, private kompanijaService: KompanijaService) { }
  @Input('kompanija') kompanija?: Kompanija;
  @Input('izabraniProizvodi') izabraniProizvodi?: Array<Proizvod>;
  @Input('brojracuna') brojracuna?: any;
  @Input('godina') godina?: number;
  @Input('datumIzdavanja') datumIzdavanja?: number;
  @Input('popust') popust: number = 0;
  @Input('deposit') deposit: number = 0;
  @Input('ukupno') ukupno?: number = 0;
  @Input('sveUkupno') sveUkupno?: number = 0;
  @Input('klijent') klijent?: any;
  @Input('ulica') ulica?: string;
  @Input('klijentPib') klijentPib?: any;
  @Input('klijentMB') klijentMB?: any;
  @Input('mesto') mesto?: string;
  @Input('faktura') faktura?: string;
  @Input('routeId') routeId?: any;
  ngOnInit(): void {
  }
  public async convetToPDF() {
    var data: any = document.getElementById('pdf');
    await html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`${this.faktura} - ${this.brojracuna}-${this.godina} - ${this.kompanija?.kompanija}.pdf`); // Generated PDF  
      const file = pdf.output("blob");
      this.racunService.uploadPdf(`${this.faktura} - ${this.brojracuna}-${this.godina} - ${this.kompanija?.kompanija}.pdf`, file)


    });
  }
  otpremiFajl() {
    this.convetToPDF()

  }
  posalji() {

    this.racunService.getPdf(`${this.faktura} - ${this.brojracuna}-${this.godina} - ${this.kompanija?.kompanija}.pdf`).subscribe((pdf: string) => {
      const newPdf = pdf.replace('racun-pdf/', 'racun-pdf%2F')
      this.http
        .get(
          `${this.racunService.getEmail()}dest=${this.kompanija?.email}&pdf=${newPdf}`,
          {
            responseType: 'text'
          }
        )
        .subscribe(() => this.kompanijaService.toast('E-mail poslat!', 'OK'));
    }, (error) => {
      if (error) {
        this.kompanijaService.toast('Pre slanja E-maila, Spremite PDF!', 'OK')
      }
    }
    )

  }
}
