import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Equipa } from 'src/app/core/entities/equipa';
import { Jogo } from 'src/app/core/entities/jogo';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';

@Component({
  selector: 'app-info-equipas',
  templateUrl: './info-equipas.component.html',
  styleUrls: ['./info-equipas.component.scss'],
})
export class InfoEquipasComponent  implements OnInit {

  @Input() jogo!: Jogo;
  equipaCasa!: Equipa;
  equipaVisitante!: Equipa;

  constructor(private fireService: FirestoreService, private navCtrl: NavController) { }

  ngOnInit() {

    this.getEquipa(this.jogo.equipaCasa).then(data => {
      this.equipaCasa = data as Equipa;
    });

    this.getEquipa(this.jogo.equipaVisitante).then(data => {
      this.equipaVisitante = data as Equipa;
    });

  }


  getEquipa(nomeEquipa: string): Promise<Equipa> {
      return new Promise<Equipa>((resolve) => {
        this.fireService.obterEquipa(nomeEquipa).subscribe((data: any) => {
          const equipa = data as Equipa;
          resolve(equipa);
        });
      });
    }


  goBack() {
    this.navCtrl.back();
  }

}
