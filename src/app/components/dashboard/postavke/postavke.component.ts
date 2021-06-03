import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Kompanija } from 'src/app/model/Kompanija';
import { KlijentService } from 'src/app/service/klijent.service';
import { KompanijaService } from 'src/app/service/kompanija.service';

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.css']
})
export class PostavkeComponent implements OnInit, OnDestroy {
  routeSub: Subscription | undefined;
  routeUrl?: string;
  kompanija?: Kompanija
  kompanijaId?: string;
  imageUrl?: any;
  constructor(private route: ActivatedRoute,
    private klijentService: KlijentService,
    private kompanijaService: KompanijaService,
    private storageService: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.kompanijaService.getKompaniju();
    this.kompanijaService.getIzabranuKompaniju().subscribe((res) => {
      this.kompanijaId = res
      this.kompanijaService.getKompInfo(res).subscribe((res: any) => {
        this.kompanija = { ...res.payload.data(), id: res.payload.id }
        this.imageUrl = res.payload.data().imageUrl;
      })
    }
    )
  }
  updateKompaniju(f: NgForm) {
    let data = f.value;
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        data[key] = "/";
      }
    })
    this.kompanijaService.updateKompaniju(this.kompanija?.id, data)
  }

  deleteKompanija() {
    console.log('brisanje...')

  }
  async onImagePicked(e: any) {
    const fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];


      this.storageService.upload(`/logo/${this.kompanija?.id}`, file)
        .then(data => {
          data.ref.getDownloadURL().then(imageUrl => {
            this.kompanijaService.updateKompaniju(this.kompanija?.id, { imageUrl: imageUrl })
            this.imageUrl = imageUrl;
            this.kompanijaService.toast('Logo je otpremljen', 'OK')
          })

        });
    }
  }
  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
