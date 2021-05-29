import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Proizvod } from '../model/Proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private db: AngularFirestore) { }

  dodajProizvod(kompanijaId: any, data: Proizvod) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('proizvodi').add(data)
  }
  getProizvode(kompanijaId: string) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('proizvodi').snapshotChanges();
  }
  getProizvod(adminId: any, id: any) {
    return this.db.collection('kompanija').doc(adminId).collection('proizvodi').doc(id).snapshotChanges();
  }
  async updateProizvod(adminId: any, klijentId: any, data: Proizvod) {
    await this.db.collection('kompanija').doc(adminId).collection('proizvodi').doc(klijentId).update(data);
  }
  async deleteProizvod(klijentId: any, adminId: any) {
    this.db.collection('kompanija').doc(adminId).collection('proizvodi').doc(klijentId).delete();
  }
}
