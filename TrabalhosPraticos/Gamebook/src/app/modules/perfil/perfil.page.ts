import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Equipa } from 'src/app/core/entities/equipa';
import { Utilizador } from 'src/app/core/entities/utilizador';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  user?: Utilizador;
  equipasFavoritas: Equipa[] = [];

  constructor(private authService: FireAuthService, private fireService: FirestoreService, private router: Router) { }

  ngOnInit() {

    this.fireService.obterUtilizador().subscribe((data: any) => {
      this.user = data as Utilizador;
    });

    this.fireService.getEquipasFavoritas().subscribe((data: any) => {
      data.forEach((equipa: any) => {
        this.equipasFavoritas.push(equipa.nome);
      });
    });

    console.log(this.user);
  }

  logout() {
    this.authService.doLogout().then(() => {
      this.goToSplashPage();
    }).catch((err) => {
      console.log("Erro ao realizar logout()");
    });
  }

  goToSplashPage() {
    this.router.navigate(['/splash'], { replaceUrl: true });
  }

}
