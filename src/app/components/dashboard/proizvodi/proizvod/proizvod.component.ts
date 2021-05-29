import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/model/Proizvod';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit, OnDestroy {
  routeSub: Subscription | undefined;
  routeUrl?: string;
  proizvod?: Proizvod
  kompanijaId?: string;
  constructor(private route: ActivatedRoute,
    private kompanijaService: KompanijaService,
    private proizvodService: ProizvodService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.kompanijaService.getKompaniju();
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id']
      this.kompanijaService.getIzabranuKompaniju().subscribe(res => this.proizvodService.getProizvod(res, id)
        .subscribe((response: any) => {
          this.kompanijaId = res;
          this.proizvod = { ...response.payload.data(), id: response.payload.id };
        }))

    })

  }
  updateProizvod(f: NgForm) {
    console.log(this.kompanijaId, this.proizvod?.id)
    this.proizvodService.updateProizvod(this.kompanijaId, this.proizvod?.id, f.value)
      .then(() => this.router.navigate(['/dashboard/', 'proizvodi']))
  }
  deleteProizvod() {
    this.proizvodService.deleteProizvod(this.proizvod?.id, this.kompanijaId)
      .then(() => this.router.navigate(['/dashboard/', 'proizvodi']))
  }

  ngOnDestroy() {
    this.routeSub?.add;
  }
}
