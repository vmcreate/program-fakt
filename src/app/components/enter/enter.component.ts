import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    const { email, password } = form.value;
    this.auth.login(email, password)
      .then(user => {
        if (user) {
          this.router.navigate(['dashboard'])
          console.log(user.user);

        }
        else {
          console.log('no user')
        }

      }).catch(err => console.log(err))

  }
}
