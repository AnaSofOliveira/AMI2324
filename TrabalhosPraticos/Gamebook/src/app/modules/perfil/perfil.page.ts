import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/compat';
import { Equipa } from 'src/app/core/entities/equipa';
import { Utilizador } from 'src/app/core/entities/utilizador';
import { FireAuthService } from 'src/app/core/services/auth/fire-auth.service';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { ModalEquipasFavoritasPage } from 'src/app/modules/perfil/modal-equipas-favoritas/modal-equipas-favoritas.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  modalAberto: boolean = false;

  user?: Utilizador;
  equipasFavoritas: string[] = [];

  constructor(private authService: FireAuthService, private fireService: FirestoreService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.fireService.obterUtilizador().subscribe((data: any) => {
      this.user = data as Utilizador;
    });

    this.fireService.obterEquipasFavoritas().subscribe((data: any) => {
      this.equipasFavoritas = data.equipasFavoritas;
    });
/*
    this.fireService.obterTodasEquipas().subscribe(data => {
      this.equipas = data.map(
        (e: {
          payload: {
            doc: {
              id: any;
              data: any;
              }
            };
        }) => {
          console.log('obterTodasEquipas');
          console.log(e.payload.doc.data()['nome']);
          return e.payload.doc.data()['nome'];
      });
    }); */
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

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalEquipasFavoritasPage,
      componentProps: { selectedTeams: this.equipasFavoritas }
    });

    modal.onDidDismiss().then((data) => {
      this.equipasFavoritas = [];
      if (data.data) {
        data.data.forEach((equipa: any) => {
          this.equipasFavoritas.push(equipa.nome);
        });
        this.atualizarEquipasFavoritas(this.equipasFavoritas);
      }
    });

    return await modal.present();
  }

  atualizarEquipasFavoritas(equipasFavoritas: string[]) {
    this.fireService.atualizarEquipasFavoritas(equipasFavoritas).then(() => {
      console.log("Equipas favoritas guardadas com sucesso");
    }).catch((err: any) => {
      console.log("Erro ao guardar equipas favoritas");
      console.log(err);
    });
  }

/*
  loadFavoriteTeams() {
    // Carregar equipes favoritas do Firebase
    this.fireService.getFavoriteTeams().subscribe(teams => {
      this.favoriteTeams = teams;
    });
  }


  loadAllTeams() {
    // Carregar todas as equipes do Firebase
    this.fireService.getAllTeams().subscribe(teams => {
      this.allTeams = teams.map(team => ({
        ...team,
        isSelected: this.favoriteTeams.some(fav => fav.id === team.id)
      }));
    });

    openTeamSelection() {
      this.isTeamSelectionModalOpen = true;
    }

    closeTeamSelection() {
      this.isTeamSelectionModalOpen = false;
    }

    saveFavoriteTeams() {
      const selectedTeams = this.allTeams.filter(team => team.isSelected);
      this.fireService.updateFavoriteTeams(selectedTeams).then(() => {
        this.favoriteTeams = selectedTeams;
        this.closeTeamSelection();
      });
    }
  } */

}
