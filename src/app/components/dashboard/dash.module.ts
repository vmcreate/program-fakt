import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { DashboardComponent } from './dashboard.component';
import { DashRoutingModule } from './dash-routing.module';
import { MaterialModule } from 'src/app/modul/material.module';
import { NovaKompanijaFormaComponent } from './nova-kompanija-forma/nova-kompanija-forma.component';
import { FormsModule } from '@angular/forms';
import { NoviKlijentComponent } from './klijenti/novi-klijent/novi-klijent.component';
import { ProfilComponent } from './klijenti/profil/profil.component';



@NgModule({
  declarations: [
    KlijentiComponent,
    ProizvodiComponent,
    DashboardComponent,
    NovaKompanijaFormaComponent,
    NoviKlijentComponent, ProfilComponent
  ],
  imports: [
    CommonModule, MaterialModule, DashRoutingModule, FormsModule
  ]
})
export class DashModule { }
