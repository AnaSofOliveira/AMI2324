import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FireauthService } from "../fireauth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
 })

 export class LoginPage implements OnInit {

  validations_form!: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
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
        email: new FormControl( '', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
      });
  }

  tryLogin(value: { email: any; password: any; }){
    this.authService.doLogin(value).then(res => {
      this.router.navigate(["/home"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  goRegisterPage(){
    this.router.navigate(["/register"]);
  }
 }
