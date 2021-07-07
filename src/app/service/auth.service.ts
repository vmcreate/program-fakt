import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }
  checkStatus() {
    return this.auth.authState;
  }
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.auth.signOut();
  }
  createCompany(email: string, password: string, ime: string, prezime: string, kompanija: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then((user: any) => {
      this.db.collection('kompanija').doc(user.user.uid)
        .set(({ email: email, ime: ime, prezime: prezime, kompanija: kompanija, isAdmin: true }))
        .then((data: any) => this.db.collection('profil').doc('kompanija').set({ kompanija: user.user.uid }))
    })
  }
}
