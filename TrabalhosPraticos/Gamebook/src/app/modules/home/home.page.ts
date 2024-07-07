import { Component } from '@angular/core';
import { IonHeader, IonContent, IonToolbar } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarioComponent } from 'src/app/layout/calendario/calendario.component';
import { TabsComponent } from 'src/app/layout/tabs/tabs.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {}

}
