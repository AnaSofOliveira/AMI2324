import { Component } from '@angular/core';
import { IonHeader, IonContent, IonToolbar } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePage {

  constructor(public router: Router) {}

  goToDetalhes(){
    this.router.navigate(['/jogo-detalhes']);
  }

}
