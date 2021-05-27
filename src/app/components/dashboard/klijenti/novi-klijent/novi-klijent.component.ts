import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';

@Component({
  selector: 'app-novi-klijent',
  templateUrl: './novi-klijent.component.html',
  styleUrls: ['./novi-klijent.component.css']
})
export class NoviKlijentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  kompanija?: string;
  constructor(private klijentService: KlijentService, private router: Router, private kompanijaService: KompanijaService, private db: AngularFirestore) {
    this.subscription = this.kompanijaService.getIzabranuKompaniju().subscribe(res => this.kompanija = res)
  }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
  }
  dodajKlijenta(f: NgForm) {
    const data = f.value;
    let uid: string;
    this.klijentService.createKlijent(data, 'hehe')
      .subscribe((res: any) => {
        uid = res.uid;
        this.db.collection('klijenti')
          .doc(uid)
          .set({ ...data, password: null })
        this.db.collection('kompanija').doc(this.kompanija).collection('klijenti').doc(uid).set({ ...data, password: null });
        this.router.navigate(['/dashboard/', 'klijenti']);
        f.resetForm();
      })



  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
