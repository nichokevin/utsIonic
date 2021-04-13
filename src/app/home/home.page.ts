  import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

  interface data {
    judul : string,
    isi : string,
    nilai : string
  }
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  judul : string;
  isi : string;

  constructor(
    afs : AngularFirestore,
    private route: Router
  ) {
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();
  }

  input() {
    this.route.navigate(['/input']);
  }

  kliklist(judul:string){
    console.log(judul)
    this.route.navigate(['/detail',judul]);
  }

  edit(judul:string){
    console.log(judul)
    this.route.navigate(['/edit',judul]);
  }

  delete(judul:string){
    console.log(judul)
    this.isiDataColl.doc(judul).delete()
  }
}
