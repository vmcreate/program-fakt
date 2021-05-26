import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Klijent } from '../model/Klijent';
import { KompanijaService } from './kompanija.service';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private kompService: KompanijaService) { }

  createKlijent(data: Klijent) {
    let uid: any;
    this.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(createdUser => {
        uid = createdUser.user?.uid;
        this.db.collection('klijenti')
          .doc(uid)
          .set({ ...data, password: null })
      })
      .then(() => {
        this.kompService.getIzabranuKompaniju().subscribe(res => {
          this.db.collection('kompanija').doc(res).collection('klijenti').doc(uid).set({ ...data, password: null })
        })
      })
  }
  getKlijente(id: string) {
    return this.db.collection('kompanija').doc(id).collection('klijenti').snapshotChanges();
  }
}
