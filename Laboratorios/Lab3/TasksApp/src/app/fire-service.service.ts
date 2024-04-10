import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from './home/task';

@Injectable({
  providedIn: 'root'
 })

 export class FireserviceService {

  private snapshotChangesSubscription: any;

  constructor(public af:AngularFirestore) {}

  getTasks () {
    return this.af.collection('tasks').snapshotChanges();
  }

  createTask(t:Task) {
    return this.af.collection('tasks').add(t);
  }

  updateTask(TaskID:any, t: Task){
    this.af.collection('tasks').doc(TaskID).set(t);
  }

  deleteTask(TaskID:any) {
    this.af.collection('tasks').doc(TaskID).delete();
  }

  unsubscribeOnLogOut(){
    this.snapshotChangesSubscription.unsubscribe();
  }
}
