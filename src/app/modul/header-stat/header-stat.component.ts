import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-stat',
  templateUrl: './header-stat.component.html',
  styleUrls: ['./header-stat.component.css']
})
export class HeaderStatComponent implements OnInit {
  @Input('ukupniTrosak') ukupniTrosak: any = 0;
  @Input('nenaplaceno') nenaplaceno: any = 0;
  @Input('ukupniPrihod') ukupniPrihod: any = 0;
  constructor() { }



  ngOnInit(): void {
  }

}
