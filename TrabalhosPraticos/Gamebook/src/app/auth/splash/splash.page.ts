import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonContent, IonSpinner } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, AuthLayoutComponent],
})
export class SplashPage {

  constructor(private router: Router) { }


  navigateToLogin() {
    this.router.navigate(['/login-social'], { replaceUrl: true });
  }
}
