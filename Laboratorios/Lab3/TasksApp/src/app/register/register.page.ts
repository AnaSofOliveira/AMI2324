import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from '../fireauth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  validations_form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(private authService: FireauthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.minLength(5),Validators.required])),
      });
  }

  tryRegister(value: { email: any; password: any; }){
    this.authService.doRegister(value).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in.";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  goLoginPage(){
    this.router.navigate(["/login"]);
  }
}
