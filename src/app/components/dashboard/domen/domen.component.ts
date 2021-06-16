import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-domen',
  templateUrl: './domen.component.html',
  styleUrls: ['./domen.component.css']
})
export class DomenComponent implements OnInit {
  domeni?: Array<any> = [];
  dataSource?: any;
  kompanijaId?: any;
  displayedColumns: string[] = ['ime', 'klijent', 'datumD', 'cena', 'troskovi', 'detalji'];
  neNaplceni?: Array<any> = [];
  naplaceniProizvod?: Array<any> = [];
  trosak?: number = 0;
  ukupno?: number = 0;
  prihod?: number = 0
  nenaplaceno?: number = 0;
  pickDatumOd: any;
  pickDatumDo: any;
  constructor(private kompanijaService: KompanijaService, private proizvodiService: ProizvodService) { }
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(res => {
      this.kompanijaId = res;
      if (res) {
        this.domeni = [];
        this.proizvodiService.getDomene(this.kompanijaId).subscribe(res => {
          res.map((proizvod => {
            this.domeni?.push({
              ...proizvod.payload.doc.data(),
              klijent: proizvod.payload.doc.data().klijent.firma,
              id: proizvod.payload.doc.id
            })
          }))

          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.domeni;
          this.dataSource.sort = this.sort;
          this.trosak = this.domeni?.reduce((a, b) => a + b.troskovi, 0)
          this.ukupno = this.domeni?.reduce((a, b) => a + b.cena, 0)
          this.prihod = Number(this.ukupno) - Number(this.trosak);


        })
      }

    })



  }
  onDateChange(ev: any) {
    const start: number = ev.start;
    const end: number = ev.end;
    this.pickDatumOd = ev.start;
    this.pickDatumDo = ev.end;

    this.dataSource.data = this.domeni?.filter(domen =>
      domen.datumDodele >= start && domen.datumDodele <= end

    )

    if (this.dataSource.data.length === 0) {
      this.dataSource.data = this.domeni;
      this.trosak = this.domeni?.reduce((a, b) => a + b.troskovi, 0)
      this.ukupno = this.domeni?.reduce((a, b) => a + b.cena, 0)
      this.prihod = Number(this.ukupno) - Number(this.trosak);
    } else {
      this.trosak = this.dataSource.data.reduce((a: any, b: any) => a + b.troskovi, 0)
      this.ukupno = this.dataSource.data.reduce((a: any, b: any) => a + b.cena, 0)
      this.prihod = Number(this.ukupno) - Number(this.trosak);
    }

  }
}
