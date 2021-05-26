import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kompanija } from 'src/app/model/Kompanija';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { NovaKompanijaFormaComponent } from './nova-kompanija-forma/nova-kompanija-forma.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  kompanije?: Array<Kompanija> = [];
  isAdmin?: boolean = false;
  constructor(public dialog: MatDialog, private kompanijaDb: KompanijaService) { }

  ngOnInit(): void {
    this.kompanijaDb.getKompanije().subscribe(res => {
      this.kompanije = [];
      res.map(item => {

        this.kompanije?.push({ ...item.payload.doc.data() as Kompanija, id: item.payload.doc.id })
      })
    })
    this.kompanijaDb.getIsAdmin().subscribe(res => this.isAdmin = res)
  }
  dodajPreduzece(): void {
    const dialogRef = this.dialog.open(NovaKompanijaFormaComponent, {
      width: '350px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('modal closed');
    });
  }
  izaberiKompaniju(id: string) {
    this.kompanijaDb.izaberiKompaniju(id).then(() => this.kompanijaDb.getIzabranuKompaniju().subscribe(res => console.log(res)))
  }
}
