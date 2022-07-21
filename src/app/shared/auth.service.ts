import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "./user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {}

  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('token','true');
      this.router.navigate(['/recruiters']);

    }, err => {
       alert('Login failed');
       this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('Registration succeeded');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  SignOut() {
    return this.fireauth.signOut().then(() => {
      window.alert('Logged out!');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }

}

