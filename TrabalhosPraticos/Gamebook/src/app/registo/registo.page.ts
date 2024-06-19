import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {ChangeDetectionStrategy, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {merge} from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { IonButtons, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatDividerModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistoPage{

readonly email = new FormControl('', [Validators.required, Validators.email]);
readonly password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
readonly confirmPassword = new FormControl('', [this.passwordValidator]);

errorMessageEmail = signal('');
errorMessagePassword = signal('');
errorMessageConfirmPassword = signal('');

constructor() {
  merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateEmailErrorMessage());

  merge(this.password.statusChanges, this.password.valueChanges)
  .pipe(takeUntilDestroyed())
  .subscribe(() => this.updatePasswordErrorMessage());

  merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
  .pipe(takeUntilDestroyed())
  .subscribe(() => this.updateConfirmPasswordErrorMessage());
}



updateEmailErrorMessage() {
  if (this.email.hasError('required')) {
    this.errorMessageEmail.set('Introduzir o e-mail');
  } else if (this.email.hasError('email')) {
    this.errorMessageEmail.set('E-mail inválido');
  } else {
    this.errorMessageEmail.set('');
  }
}

updatePasswordErrorMessage() {
  if (this.password.hasError('required')) {
    this.errorMessagePassword.set('Introduzir a password');
  } else if (this.password.hasError('password')) {
    this.errorMessagePassword.set('Password inválida');
  } else {
    this.errorMessagePassword.set('');
  }
}

passwordValidator() {
  
}

}
