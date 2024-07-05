import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(public auth: AngularFireAuth) {}

  register(value: { email: any; password: any; }) {
    return new Promise<any> ((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        (res: any) => {
          // Assume the token is part of the response, e.g., res.user.getIdToken()
          res.user.getIdToken().then((token: string) => {
            localStorage.setItem('authToken', token);
            resolve(res);
          });
        },
        (err: any) => reject(err)
      )
    })
  }


  login(value: { email: any; password: any; }) {
    return new Promise<any> ((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(

        (res: any) => {
          // Assume the token is part of the response, e.g., res.user.getIdToken()
          res.user.getIdToken().then((token: string) => {
            localStorage.setItem('authToken', token);
            resolve(res);
          });
        },
        (err: any) => reject(err)
      )
    })
  }

  logout() {
    return new Promise<void> ((resolve, reject) => {
      this.auth.signOut().then(() => {
        localStorage.removeItem('authToken');
        /*this.firebaseService.unsubscribeOnLogOut();*/
        resolve();
      }).catch((error: any) => {
        reject();
      });
    })
  }

  isLoggedIn() {
    return !!localStorage.getItem('authToken');
  }

  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      this.auth.signInWithRedirect(provider);
      this.auth.getRedirectResult()
        .then((res: any) => {
          res.user.getIdToken().then((token: string) => {
            localStorage.setItem('authToken', token);
            resolve(res);
          });
        }).catch((err: any) => reject(err));
    });
  }
}
