import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  pic : any
}

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class InputPage implements OnInit {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  judul : string;
  isi : string;
  tgl : string;
  nilai : string;
  pic : any;

  constructor(afs : AngularFirestore,
    private route: Router) {
      this.isiDataColl = afs.collection('dataCoba');
      this.isiData = this.isiDataColl.valueChanges();
     }

  ngOnInit() {
  }

  simpan() {
    this.isiDataColl.doc(this.judul).set({
      judul : this.judul,
      isi: this.isi,
      tgl: this.tgl,
      nilai: this.nilai,
      pic: this.pic
    })
    this.route.navigate(['/home']);
  }
}
