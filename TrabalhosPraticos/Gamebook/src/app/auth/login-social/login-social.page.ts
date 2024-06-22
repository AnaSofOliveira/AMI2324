import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';

import { IonContent, IonSpinner } from "@ionic/angular/standalone";
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';


@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.page.html',
  styleUrls: ['./login-social.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, AuthLayoutComponent, MatButtonModule, MatDivider],
})
export class LoginSocialPage {

  errorMessage: string = '';

  constructor(private router: Router, private authService: FireAuthService) { }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(res => {
      console.log("Resultado: " + res);
      this.goToHomePage()
    }, err => {
      console.log("Erro: " + err);
      this.errorMessage = "Erro ao efetuar o login!"
    })
  }

  goToHomePage(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToRegisterPage() {
    this.router.navigate(['/registo'], { replaceUrl: true });
  }
}
