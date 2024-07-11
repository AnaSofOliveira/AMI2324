import { Component, OnInit, input } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class AuthLayoutComponent{

  constructor() { }

}
