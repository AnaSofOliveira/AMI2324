import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonSpinner } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, MatDivider, AuthLayoutComponent, IonicModule],
})
export class LoginPage {

  constructor() { }


}
