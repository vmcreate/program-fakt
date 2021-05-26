import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { NoviKlijentComponent } from './klijenti/novi-klijent/novi-klijent.component';





const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            {
                path: 'klijenti', component: KlijentiComponent
            },
            { path: 'proizvodi', component: ProizvodiComponent },
            { path: 'klijenti/novi-klijent', component: NoviKlijentComponent },
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