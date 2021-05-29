import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Predracun } from '../model/Predracun';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private db: AngularFirestore, private router: Router) { }

  zapamtiNacrt(kompanijaId: any, data: Predracun, klijentId: any) {
    const key = this.makeid(15);
    return this.db.collection('kompanija').doc(kompanijaId).collection('predracun').doc(key).set(data).then(() => {
      this.db.collection('klijenti').doc(klijentId).collection('predracun').doc(key).set(data)
    })
  }
  updateNacrt(kompanijaId: any, id: any, data: Predracun, klijentId: any) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('predracun').doc(id).update(data).then(() => {
      this.db.collection('klijenti').doc(klijentId).collection('predracun').doc(id).update(data)
    })
  }
  getPredracune(kompanijaId: any) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('predracun').snapshotChanges();
  }
  getPredracun(kompanijaId: any, predracunId: any) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('predracun').doc(predracunId).snapshotChanges();

  }
  async deletePredracun(kompanijaId: any, predracunId: any, klijentId: any) {

    try {
      await this.db.collection('klijenti').doc(klijentId).collection('predracun').doc(predracunId).delete();
      await this.db.collection('kompanija').doc(kompanijaId).collection('predracun').doc(predracunId).delete();
      this.router.navigate(['/dashboard/', 'ponude']);
    }
    catch (err) {
      console.log(err)
    }

  }

  makeid(length: any) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

}

