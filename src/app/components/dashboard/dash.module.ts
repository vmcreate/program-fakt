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
import { SharedModule } from 'src/app/modul/shared';
import { StatistikaKlijentiComponent } from './statistika-klijenti/statistika-klijenti.component';
import { ZaradaComponent } from './statistika-klijenti/zarada/zarada.component';
import { DomenComponent } from './domen/domen.component';
import { InformacijeComponent } from './statistika-klijenti/informacije/informacije.component';
import { NoviDomenComponent } from './domen/novi-domen/novi-domen.component';
import { DomenInformacijeComponent } from './domen/domen-informacije/domen-informacije.component';
import { DaterangeComponent } from 'src/app/modul/daterange/daterange.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HeaderStatComponent } from 'src/app/modul/header-stat/header-stat.component';
import { PdfTableComponent } from 'src/app/modul/pdf-table/pdf-table.component';
import { PdfNaplataComponent } from 'src/app/modul/pdf-naplata/pdf-naplata.component';
import { StatistikaKlijentaComponent } from 'src/app/modul/statistika-klijenta/statistika-klijenta.component';


@NgModule({
  declarations: [
    KlijentiComponent,
    ProizvodiComponent,
    DashboardComponent,
    NovaKompanijaFormaComponent,
    NoviKlijentComponent, ProfilComponent,
    NoviProizvodComponent,
    ProizvodComponent, PonudeComponent, RacunComponent,
    NovPredracunComponent, PonudaDetaljiComponent,
    PostavkeComponent, NovRacunComponent,
    RacunDetaljiComponent, PonavljajuciComponent,
    NoviPonvaljajuciRacunComponent,
    PonavljajuciDetaljiComponent, StatistikaComponent,
    StatistikaKlijentiComponent, ZaradaComponent, DomenComponent,
    InformacijeComponent, NoviDomenComponent,
    DomenInformacijeComponent, DaterangeComponent
    , HeaderStatComponent, PdfTableComponent, PdfNaplataComponent, StatistikaKlijentaComponent
  ],
  imports: [
    CommonModule, MaterialModule, DashRoutingModule, FormsModule, SharedModule, ReactiveFormsModule, NgApexchartsModule
  ]
})
export class DashModule { }
