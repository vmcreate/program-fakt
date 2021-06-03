import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/model/Klijent';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {
  routeSub: Subscription | undefined;
  routeUrl?: string;
  klijent?: Klijent
  kompanijaId?: string;
  constructor(private route: ActivatedRoute,
    private klijentService: KlijentService,
    private kompanijaService: KompanijaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id']
      this.klijentService.getKlijenta(id).subscribe((response: any) => {
        this.klijent = { ...response.payload.data(), id: response.payload.id };
      })
    })
    this.kompanijaService.getIzabranuKompaniju().subscribe((res) => this.kompanijaId = res)
  }
  updateKlijenta(f: NgForm) {
    this.klijentService.updateKlijenta(this.klijent?.id, this.kompanijaId, f.value)
      .then(() => this.router.navigate(['/dashboard/', 'klijenti'])).then(() => {
        this.kompanijaService.toast('Izmene zavrsene', 'OK')
      })
  }

  deleteKlijenta() {
    this.klijentService.deleteKlijenta(this.klijent?.id, this.kompanijaId).then(() => {
      this.kompanijaService.toast('Klijent je uspesno obrisan', 'OK')
    })


  }
  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
