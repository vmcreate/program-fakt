import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KlijentService } from 'src/app/service/klijent.service';

@Component({
  selector: 'app-novi-klijent',
  templateUrl: './novi-klijent.component.html',
  styleUrls: ['./novi-klijent.component.css']
})
export class NoviKlijentComponent implements OnInit {

  constructor(private klijentService: KlijentService) { }

  ngOnInit(): void {
  }
  dodajKlijenta(f: NgForm) {
    const data = f.value;
    this.klijentService.createKlijent(data);
  }
}
