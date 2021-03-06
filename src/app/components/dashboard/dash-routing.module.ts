import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { NoviKlijentComponent } from './klijenti/novi-klijent/novi-klijent.component';
import { ProfilComponent } from './klijenti/profil/profil.component';
import { NoviProizvodComponent } from './proizvodi/novi-proizvod/novi-proizvod.component';
import { ProizvodComponent } from './proizvodi/proizvod/proizvod.component';
import { PonudeComponent } from './ponude/ponude.component';
import { RacunComponent } from './racun/racun.component';
import { NovPredracunComponent } from './ponude/nov-predracun/nov-predracun.component';
import { PonudaDetaljiComponent } from './ponude/ponuda-detalji/ponuda-detalji.component';
import { PostavkeComponent } from './postavke/postavke.component';
import { NovRacunComponent } from './racun/nov-racun/nov-racun.component';
import { RacunDetaljiComponent } from './racun/racun-detalji/racun-detalji.component';
import { PonavljajuciComponent } from './ponavljajuci/ponavljajuci.component';
import { NoviPonvaljajuciRacunComponent } from './ponavljajuci/novi-ponvaljajuci-racun/novi-ponvaljajuci-racun.component';
import { PonavljajuciDetaljiComponent } from './ponavljajuci/ponavljajuci-detalji/ponavljajuci-detalji.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { StatistikaKlijentiComponent } from './statistika-klijenti/statistika-klijenti.component';
import { DomenComponent } from './domen/domen.component';
import { InformacijeComponent } from './statistika-klijenti/informacije/informacije.component';
import { NoviDomenComponent } from './domen/novi-domen/novi-domen.component';
import { DomenInformacijeComponent } from './domen/domen-informacije/domen-informacije.component';
import { ProfilKlijentaComponent } from './profil-klijenta/profil-klijenta.component';





const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', component: StatistikaComponent },
            { path: 'klijenti', component: KlijentiComponent },
            { path: 'proizvodi', component: ProizvodiComponent },
            { path: 'domen', component: DomenComponent },
            { path: 'postavke', component: PostavkeComponent },
            { path: 'klijenti/novi-klijent', component: NoviKlijentComponent },
            { path: 'klijenti/:id', component: ProfilComponent },
            { path: 'proizvodi/novi-proizvod', component: NoviProizvodComponent },
            { path: 'proizvodi/:id', component: ProizvodComponent },
            { path: 'ponude', component: PonudeComponent },
            { path: 'ponude/nov-predracun', component: NovPredracunComponent },
            { path: 'ponude/:id', component: PonudaDetaljiComponent },
            { path: 'racun', component: RacunComponent },
            { path: 'racun/nov-racun', component: NovRacunComponent },
            { path: 'racun/:id', component: RacunDetaljiComponent },
            { path: 'ponavljajuci-racun', component: PonavljajuciComponent },
            { path: 'ponavljajuci-racun/novi-ponavljajuci-racun', component: NoviPonvaljajuciRacunComponent },
            { path: 'ponavljajuci-racun/:id', component: PonavljajuciDetaljiComponent },
            { path: 'statistika-klijenti', component: StatistikaKlijentiComponent },
            { path: 'statistika-klijenti/:id', component: InformacijeComponent },
            { path: 'domen/novi-domen', component: NoviDomenComponent },
            { path: 'domen/:id', component: DomenInformacijeComponent },
            { path: 'profil-klijenta', component: ProfilKlijentaComponent }



        ]
    }



]


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashRoutingModule { }