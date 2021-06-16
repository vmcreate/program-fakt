import { Component, Input, OnInit } from '@angular/core';
import { Predracun } from 'src/app/model/Predracun';
import jspdf from 'jspdf';
declare var jsPDF: any;
import html2canvas from 'html2canvas';

@Component({
  selector: 'pdf-table',
  templateUrl: './pdf-table.component.html',
  styleUrls: ['./pdf-table.component.css']
})
export class PdfTableComponent implements OnInit {

  constructor() { }
  @Input('klijenti') klijenti?: Array<Predracun>;

  @Input('ukupniTrosak') ukupniTrosak?: number = 0;
  @Input('nenaplaceno') nenaplaceno?: number = 0;
  @Input('ukupniPrihod') ukupniPrihod?: number = 0
  @Input('pickDatumOd') pickDatumOd: any;
  @Input('pickDatumDo') pickDatumDo: any;

  ngOnInit(): void {

  }
  public convetToPDF() {
    var data: any = document.getElementById('pdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }
}
