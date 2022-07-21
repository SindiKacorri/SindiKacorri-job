import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Recruiters} from "../model/recruiters";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addJob(recruiters: Recruiters) {
    recruiters.id = this.afs.createId();
    return this.afs.collection('/Recruiters').add(recruiters);
}

  getAllJobs() {
    return this.afs.collection('/Recruiters').snapshotChanges();
  }

  deleteJob(recruiters: Recruiters) {
    return this.afs.doc('/Recruiters/'+recruiters.id).delete();
  }

  updateJob(recruiters: Recruiters) {
    this.deleteJob(recruiters);
    this.addJob(recruiters);
  }
}
