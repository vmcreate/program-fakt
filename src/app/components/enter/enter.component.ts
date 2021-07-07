import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { KompanijaService } from 'src/app/service/kompanija.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private db: AngularFirestore, private kompanijaService: KompanijaService) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    const { email, password } = form.value;
    this.auth.login(email, password)
      .then((user: any) => {
        if (user) {//ako postoji u kompanjiji updateprofil ako ne null
          const ref = this.db.collection('kompanija').doc(user.user.uid);
          const doc = ref.get();
          doc.subscribe(res => {
            if (res.exists) {

              this.kompanijaService.izaberiKompaniju(user.user.uid)
              this.router.navigate(['dashboard'])
            } else {
              this.kompanijaService.izaberiKompaniju('klijent')
              this.router.navigate(['dashboard/profil-klijenta'])

            }

          })

          console.log(user.user);

        }
        else {
          console.log('no user')
        }

      }).catch(err => console.log(err))

  }
}
