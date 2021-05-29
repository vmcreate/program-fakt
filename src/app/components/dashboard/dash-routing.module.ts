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





const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: 'klijenti', component: KlijentiComponent },
            { path: 'proizvodi', component: ProizvodiComponent },
            { path: 'klijenti/novi-klijent', component: NoviKlijentComponent },
            { path: 'klijenti/:id', component: ProfilComponent },
            { path: 'proizvodi/novi-proizvod', component: NoviProizvodComponent },
            { path: 'proizvodi/:id', component: ProizvodComponent },
            { path: 'ponude', component: PonudeComponent },
            { path: 'ponude/nov-predracun', component: NovPredracunComponent },
            { path: 'ponude/:id', component: PonudaDetaljiComponent },
            { path: 'racun', component: RacunComponent }
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