import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonSpinner } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import {MatButton} from "@angular/material/button";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, MatDivider, AuthLayoutComponent, IonicModule, MatButton, ReactiveFormsModule, CommonModule],
})
export class LoginPage implements OnInit {

  validators!: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Preencher o e-mail.' },
      { type: 'pattern', message: 'Insira um e-mail válido.' }
    ],
    'password': [
      { type: 'required', message: 'Preencher a password' },
      { type: 'minlength', message: 'Password tem de conter mais que 5 caracteres.' }
    ],
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: FireAuthService) {
  }


  ngOnInit(): void {
    this.validators = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.minLength(5),Validators.required])),
      },
    );
  }

  login(value: {email: any; password: any;}){
    this.authService.login(value).then(res => {
      console.log("Resultado: " + res);
      this.goToHomePage()
    }, err => {
      console.log("Erro: " + err);
      this.errorMessage = "Erro ao efetuar o login!"
    })
  }

  goToRegisterPage(){
    this.router.navigate(['/registo'], { replaceUrl: true });
  }

  goToHomePage(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToSocialLoginPage(){
    this.router.navigate(['/login-social'], { replaceUrl: true });
  }

}
