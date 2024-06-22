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
    ],
    'confirmPassword': [
      {type: 'minlength', message: 'Password tem de conter mais que 5 caracteres.' },
      {type: 'mismatch', message: 'As passwords não coincidem.'}
    ]
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: FireAuthService) {
  }

  ngOnInit(): void {
    this.validators = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.minLength(5),Validators.required])),
        passwordConfirm: new FormControl('', Validators.compose([Validators.minLength(5), this.passwordMatchValidator])),
      },
    );
  }

  register(value: {email: any; password: any;}){
    this.authService.register(value).then(res => {
      console.log("Resultado: " + res);
      this.goToHomePage()
    }, err => {
      console.log("Erro: " + err);
      this.errorMessage = "Erro no registo do utilizador!"
    })
  }

  passwordMatchValidator(formGroup: any){
    return formGroup.get('password').value === formGroup.get('passwordConfirm').value ? null : {'mismatch': true};
  }

  goToLoginPage(){
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goToHomePage(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}
