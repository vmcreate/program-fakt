import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KompanijaService {
  izabranaKompanija = new Subject<string>();
  isAdmin = new Subject<boolean>();
  constructor(private db: AngularFirestore) { }
  getIzabranuKompaniju() {
    return this.izabranaKompanija.asObservable();
  }
  getIsAdmin() {
    return this.isAdmin.asObservable();
  }
  getKompanije() {
    return this.db.collection('kompanija').snapshotChanges();
  }
  getKompaniju() {
    return this.db.collection('profil').doc('kompanija').snapshotChanges().subscribe(async (res: any) => {
      const kompanija = await res.payload.data().kompanija;
      this.izabranaKompanija.next(kompanija);
    })
  }
  async isAdminKompanija(id: string) {
    this.db.firestore.doc(`/kompanija/${id}`).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.isAdmin.next(true)
        }
        else {
          this.isAdmin.next(false)

        }
      });
  }
  izaberiKompaniju(id: string) {
    return this.db.collection('profil').doc('kompanija').set({ kompanija: id }).then(() => {
      this.izabranaKompanija.next(id)
    })
  }

}
