import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-klijenti',
  templateUrl: './klijenti.component.html',
  styleUrls: ['./klijenti.component.css']
})
export class KlijentiComponent {
  displayedColumns: string[] = ['id'];
  dataSource: MatTableDataSource<any>;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 100];
  constructor() {
    // Create 100 users
    const users = [12, 3, 4, 5, 6]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    console.log(this.dataSource)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangedPage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;

  }
}

