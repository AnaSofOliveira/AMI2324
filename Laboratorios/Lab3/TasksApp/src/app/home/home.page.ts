import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { FireserviceService } from '../fire-service.service';
import { Task } from './task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  tasks: Array<Task> = [];

  constructor(private fser: FireserviceService) {
  }

  ngOnInit(): void {
    this.fser.getTasks().subscribe((data: any[]) => {
      this.tasks = data.map((e: { payload: { doc: { id: any; data: () => { (): any; new(): any;[x: string]: any; }; }; }; }) => {
        return {
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          status: e.payload.doc.data()['status'],
        };
      });
      console.log(this.tasks);
    });
  }

  addTask() {
    let ntask: string | null= prompt("New Task");
    if (ntask !== "" && ntask !== null) {
      let t: Task = { $key: '', title: ntask, status: 'open' };
      console.log(t);
      this.fser.createTask(t).then(resp => {
        console.log("createTask: then - " + resp);
      })
        .catch(error => {
          console.log("createTask: catch - " + error);
        });
      console.log("addTask: " + this.tasks);
    }
  }

  markAsDone(slidingItem: IonItemSliding, task:any) {
    task.status = (task.status === "done")? "open":"done";
    console.log ("markAsDone " + task);
    this.fser.updateTask (task.$key, task);
    slidingItem.close();
  }

  removeTask(slidingItem: IonItemSliding, task:any) {
    task.status = "removed";
    this.fser.deleteTask(task.$key);
    slidingItem.close();
  }
}
