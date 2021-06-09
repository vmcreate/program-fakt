import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource?: any;
  racuni?: Array<Predracun>;
  kompanijaId?: string;
  displayedColumns: string[] = ['brojracuna', 'ime', 'datumI', 'datumV', 'iznos', 'status', 'placeno', 'detalji'];
  isLoading?: boolean;

  constructor(private klijentService: KlijentService,
    private proizvodService: ProizvodService,
    private kompanijaService: KompanijaService,
    private racunService: RacunService
  ) {

  }
  @ViewChild(MatSort) sort?: MatSort;



  ngOnInit() {
    console.log('ispalio2')
    this.kompanijaService.getKompaniju();
    this.isLoading = true;
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.racunService.getRacune(kompanijaId).subscribe(res => {
        this.isLoading = false;
        this.racuni = [];
        res.map((predracun: any) => {
          this.racuni?.push({ ...predracun.payload.doc.data(), id: predracun.payload.doc.id })
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.racuni;
          this.dataSource.sort = this.sort;
        })
        this.dataSource.sortingDataAccessor = (item: any, property: any) => {
          switch (property) {
            case 'iznos': return item.ukupno;
            case 'datumI': {
              let newDate = new Date(item.datumIzdavanja).valueOf();
              return newDate;
            }
            case 'datumV': {
              let newDate = new Date(item.datumVazenja).valueOf();
              return newDate;
            }
            default: return item[property];
          }
        };

      })
    })

  }


  placenoToggle(el: any) {
    const placeno = !el.placeno;
    this.racunService.updateRacunNacrt(this.kompanijaId, el.id, { placeno: placeno }, el.klijentUid)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(filterValue.lastIndexOf);
  }

}
