import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';

import { IonContent, IonSpinner } from "@ionic/angular/standalone";
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.page.html',
  styleUrls: ['./login-social.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, AuthLayoutComponent, MatButtonModule, MatDivider],
})
export class LoginSocialPage {

  constructor() { }


}
