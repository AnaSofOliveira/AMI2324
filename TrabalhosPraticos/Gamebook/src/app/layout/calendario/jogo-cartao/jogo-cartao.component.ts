import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { Component, Input, OnInit } from '@angular/core';
import { Jogo } from 'src/app/core/entities/jogo';
import { Equipa } from 'src/app/core/entities/equipa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo-cartao',
  templateUrl: './jogo-cartao.component.html',
  styleUrls: ['./jogo-cartao.component.scss'],
})
export class JogoCartaoComponent  implements OnInit {

  @Input() jogo!: Jogo;
  logotipoEquipaCasa!: string;
  logotipoEquipaVisitante!: string;

  constructor(private fireService: FirestoreService, private router: Router) {}

  ngOnInit() {
    if(this.jogo){
      this.fireService.obterEquipa(this.jogo.equipaCasa).subscribe(data => {
        let equipa = data as Equipa;
        this.logotipoEquipaCasa = equipa.imagem;
      });

      this.fireService.obterEquipa(this.jogo.equipaVisitante).subscribe(data => {
        let equipa = data as Equipa;
        this.logotipoEquipaVisitante = equipa.imagem;
      });
    }
  }

  createNotification() {
    throw new Error('Method not implemented.');
  }


  goToInfoGamePage() {
    this.router.navigate(['jogo-detalhes', this.jogo.$key]);
  }

}
