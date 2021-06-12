import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Domen } from '../model/Doment';
import { Proizvod } from '../model/Proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private db: AngularFirestore) { }

  dodajProizvod(kompanijaId: any, data: Proizvod) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('proizvodi').add(data)
  }
  getProizvode(kompanijaId: any) {
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
  // DOMEN
  dodajDomen(kompanijaId: any, data: Proizvod) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('domeni').add(data)
  }
  getDomene(kompanijaId: any) {
    return this.db.collection('kompanija').doc(kompanijaId).collection('domeni').snapshotChanges();
  }
  getDomen(adminId: any, id: any) {
    return this.db.collection('kompanija').doc(adminId).collection('domeni').doc(id).snapshotChanges();
  }
  async updateDomen(adminId: any, domenId: any, data: Proizvod) {
    await this.db.collection('kompanija').doc(adminId).collection('domeni').doc(domenId).update(data);
  }
  async deleteDomen(klijentId: any, adminId: any) {
    this.db.collection('kompanija').doc(adminId).collection('domeni').doc(klijentId).delete();

  }
}
