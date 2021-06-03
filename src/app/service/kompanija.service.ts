import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Kompanija } from '../model/Kompanija';

@Injectable({
  providedIn: 'root'
})
export class KompanijaService {
  izabranaKompanija = new Subject<string>();
  isAdmin = new Subject<boolean>();
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) { }
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
  getKompInfo(id: string) {
    return this.db.collection('kompanija').doc(id).snapshotChanges()

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
  updatePredracun(id: any, predracun: any) {
    return this.db.collection('kompanija').doc(id).update({ predracun: predracun });
  }
  updateKompaniju(adminId: any, data: any) {
    return this.db.collection('kompanija').doc(adminId).update(data);
  }
  toast(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['my-snack-bar']
    })
  }
}
