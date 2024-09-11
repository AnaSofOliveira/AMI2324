import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { Task } from './home/task';


@Injectable({
  providedIn: 'root'
})

export class FireserviceService {
  private snapshotChangesSubscription: any;

  constructor(public af: AngularFirestore) { }

  getTasks() {
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('people').doc(currentUser!.uid).collection('tasks').snapshotChanges();
  }

  createTask(t: Task) {
    let currentUser = firebase.auth().currentUser;
    let object = this.af.collection('people').doc(currentUser!.uid).collection('tasks').add(t);
    return object;
  }

  updateTask(TaskID: any, t: Task) {
    let currentUser = firebase.auth().currentUser;
    this.af.collection('people').doc(currentUser!.uid).collection('tasks').doc(TaskID).set(t);
    //this.af.doc('tasks/' + TaskID).update(t);
  }

  deleteTask(TaskID: any) {
    let currentUser = firebase.auth().currentUser;
    this.af.collection('people').doc(currentUser!.uid).collection('tasks').doc(TaskID).delete();
    //this.af.doc('tasks/' + TaskID).delete();
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }
}
