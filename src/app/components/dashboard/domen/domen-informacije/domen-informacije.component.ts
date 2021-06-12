import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/model/Klijent';
import { Proizvod } from 'src/app/model/Proizvod';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';
import { ProizvodService } from 'src/app/service/proizvod.service';

@Component({
  selector: 'app-domen-informacije',
  templateUrl: './domen-informacije.component.html',
  styleUrls: ['./domen-informacije.component.css']
})
export class DomenInformacijeComponent implements OnInit, OnDestroy {
  routeUrl?: string;
  domen?: Proizvod
  kompanijaId?: string;
  routeSub?: Subscription;
  izabranaFirma?: Klijent;
  klijenti?: Array<Klijent> = [];
  constructor(private route: ActivatedRoute,
    private kompanijaService: KompanijaService,
    private proizvodService: ProizvodService,
    private router: Router,
    private klijentService: KlijentService
  ) {

  }

  ngOnInit() {

    this.kompanijaService.getKompaniju();
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id']
      this.kompanijaService.getIzabranuKompaniju().subscribe(res => this.proizvodService.getDomen(res, id)
        .subscribe((response: any) => {
          this.kompanijaId = res;
          this.domen = { ...response.payload.data(), id: response.payload.id };
        }))

    })
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe(kompanijaId => {
      this.kompanijaId = kompanijaId;
      this.klijentService.getKlijente(kompanijaId).subscribe(res => {
        this.klijenti = [];
        res.map((klijent: any) => {
          this.klijenti?.push({ ...klijent.payload.doc.data(), id: klijent.payload.doc.id })
        })
      })
    })
  }
  izaberiFirmu(klijent: Klijent) {
    this.izabranaFirma = klijent;
    this.kompanijaService.toast('Klijent izabran', 'OK')
  }
  updateProizvod(f: NgForm) {
    let datumD = this.domen?.datumDodele;
    if (datumD === null) {
      datumD = new Date().valueOf();
    }
    this.proizvodService.updateDomen(this.kompanijaId, this.domen?.id, { ...f.value, datumDodele: datumD, napomena: 'Domen' })
      .then(() => this.router.navigate(['/dashboard/', 'domen']))
  }
  deleteProizvod() {
    this.proizvodService.deleteDomen(this.domen?.id, this.kompanijaId)
      .then(() => { this.router.navigate(['/dashboard/', 'domen']), this.kompanijaService.toast('Domen obrisan', 'OK') })
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.firma === o2.firma;
  }
  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}