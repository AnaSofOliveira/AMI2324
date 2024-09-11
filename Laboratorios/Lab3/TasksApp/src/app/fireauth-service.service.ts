import { Injectable } from '@angular/core';
import { FireserviceService } from './fire-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

@Injectable({
 providedIn: 'root'
})

export class FireauthService {

  constructor(private firebaseService: FireserviceService, public afAuth: AngularFireAuth){}

  doRegister(value: { email: any; password: any; }){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email,
      value.password)
      .then(
        (      res: any) => resolve(res),
        (      err: any) => reject(err))
    })
  }

  doLogin(value: { email: any; password: any; }){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        (      res: any) => resolve(res),
        (      err: any) => reject(err))
    })
  }

  doLogout(){
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signOut().then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error: any) => {
        console.log(error);
        reject();
      });
    })
  }
}
