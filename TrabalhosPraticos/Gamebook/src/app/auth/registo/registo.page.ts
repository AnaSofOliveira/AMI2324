import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonSpinner } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { Utilizador } from 'src/app/core/entities/utilizador';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
  standalone: true,
  imports: [AuthLayoutComponent, IonicModule, MatDivider, IonSpinner, MatButton, ReactiveFormsModule, CommonModule],
})

export class RegistoPage implements OnInit{
 validators!: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Preencher e-mail.' },
      { type: 'pattern', message: 'Insira um e-mail válido.' }
    ],
    'password': [
      { type: 'required', message: 'Preencher password' },
      { type: 'minlength', message: 'Password tem de conter mais que 5 caracteres.' }
    ]
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: FireAuthService, private fireService: FirestoreService) {
  }

  ngOnInit(): void {
    this.validators = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.minLength(5),Validators.required])),
      }
    );
  }

  register(value: {email: any; password: any;}){
    this.authService.register(value).then(res => {
      this.fireService.adicionarUtilizador(value.email, res.user?.uid);
      this.goToHomePage()
    }, err => {
      this.errorMessage = "Erro no registo do utilizador!"
    })
  }

  goToLoginPage(){
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goToHomePage(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToSocialLoginPage(){
    this.router.navigate(['/login-social'], { replaceUrl: true });
  }

}
