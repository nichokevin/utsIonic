import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  pic : any
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  judul:string;
  isi :string;
  tgl : string;
  nilai:string;
  pic: any;
  constructor(
    private actRoute: ActivatedRoute,
    private route : Router,
    afs : AngularFirestore
  ) {
    this.judul = this.actRoute.snapshot.paramMap.get('judul');
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();
   }

  ngOnInit() {
    const temp = this.isiDataColl.doc(this.judul).valueChanges().subscribe(data => {
      this.judul=data.judul
      this.isi=data.isi
      this.tgl = data.tgl
      this.nilai = data.nilai
      this.pic = data.pic
    })
  }

  home(){
    this.route.navigate(['/home']);
  }
}
