  import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

  interface data {
    judul : string,
    isi : string
  }
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;

  constructor(
    afs : AngularFirestore
  ) {
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();
  }

  simpan() {
    this.isiDataColl.doc(this.Judul).set({
      judul : this.Judul,
      isi: this.Isi
    })
  }

}
