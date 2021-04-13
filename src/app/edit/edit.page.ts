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
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  judul:string;
  isi :string;
  tgl : string;
  nilai:string;
  pic: any;
  temp :string;
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
    this.temp = this.judul
    const temp = this.isiDataColl.doc(this.judul).valueChanges().subscribe(data => {
      this.judul=data.judul
      this.isi=data.isi
      this.tgl = data.tgl
      this.nilai = data.nilai
      this.pic = data.pic
    })
  }

  edit(){
    
    this.isiDataColl.doc(this.temp).update({
      judul : this.judul,
      isi: this.isi,
      tgl: this.tgl,
      nilai: this.nilai,
      pic: this.pic
    })
    this.route.navigate(['/home']);
  }
  
}
