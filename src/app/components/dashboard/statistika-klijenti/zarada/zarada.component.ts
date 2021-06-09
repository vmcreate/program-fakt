import { Component, Input, OnInit } from '@angular/core';
import { KlijentService } from 'src/app/service/klijent.service';

@Component({
  selector: 'zarada',
  templateUrl: './zarada.component.html',
  styleUrls: ['./zarada.component.css']
})
export class ZaradaComponent implements OnInit {
  @Input('id') id?: string;
  @Input('kompanija') kompanijaId?: string;
  ukupnoArr?: Array<any> = [];
  ukupno?: any;
  constructor(private klijentService: KlijentService) { }

  ngOnInit(): void {
    this.klijentService.getKlijentRacun(this.id).subscribe(res => {
      console.log(this.id)
      this.ukupnoArr = [];
      this.ukupno = null;
      res.map(klijent => {
        const k = klijent.payload.doc.data();
        if (k.placeno === true && k.status === 'zavrseno' && this.kompanijaId === k.kompanijaUid) {
          this.ukupnoArr?.push(k)
        }
        this.ukupno = this.ukupnoArr?.reduce((a, b) => a + b.ukupno, 0)
      })
    })

  }

}
