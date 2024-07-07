import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonContent, IonSpinner } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, AuthLayoutComponent],
})
export class SplashPage implements OnInit{

  constructor(private router: Router, private fireAuthService: FireAuthService) { }

  goToSocialLoginPage() {
    this.router.navigate(['/login-social'], { replaceUrl: true });
  }

  ngOnInit(): void {
    this.fireAuthService.isLogIn()
      .then((value) => {
        value ? this.router.navigate(['/home'], { replaceUrl: true }) : this.goToSocialLoginPage();
      })
      .catch(() => this.goToSocialLoginPage());
  }
}
