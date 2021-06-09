import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Klijent } from '../model/Klijent';
import { KompanijaService } from './kompanija.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private http: HttpClient, private auth: AngularFireAuth, private db: AngularFirestore, private kompService: KompanijaService, private fun: AngularFireFunctions) { }

  createKlijent(data: Klijent, iKomp: string) {
    let uid: any;
    return this.http
      .get(
        `https://us-central1-fakt-program.cloudfunctions.net/createUserNew?email=${data.email}&password=${data.password}`
        , { responseType: 'json' }
      )

  }
  getKlijente(id: string) {
    return this.db.collection('kompanija').doc(id).collection('klijenti').snapshotChanges();
  }
  getKlijenta(id: string) {
    return this.db.collection('klijenti').doc(id).snapshotChanges();
  }
  async updateKlijenta(klijentId: any, adminId: any, data: Klijent) {
    await this.db.collection('klijenti').doc(klijentId).update(data);
    this.db.collection('kompanija').doc(adminId).collection('klijenti').doc(klijentId).update(data);
  }
  async deleteKlijenta(klijentId: any, adminId: any) {
    this.db.collection('kompanija').doc(adminId).collection('klijenti').doc(klijentId).delete();
  }
  getKlijentRacun(klijentId: any) {
    return this.db.collection('klijenti').doc(klijentId).collection('racun').snapshotChanges();
  }
}
