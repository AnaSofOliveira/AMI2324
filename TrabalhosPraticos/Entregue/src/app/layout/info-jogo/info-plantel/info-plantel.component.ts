import { latLng } from 'leaflet';
import { Component, Input, OnInit } from '@angular/core';
import { Equipa } from 'src/app/core/services/database/entities/equipa';
import { Jogador } from 'src/app/core/services/database/entities/jogador';
import { Jogo } from 'src/app/core/services/database/entities/jogo';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { Md5 } from 'ts-md5';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-info-plantel',
  templateUrl: './info-plantel.component.html',
  styleUrls: ['./info-plantel.component.scss'],
})
export class InfoPlantelComponent implements OnInit{

  @Input() jogo!: Jogo;
  jogadoresEquipaCasa: Jogador[] = [];
  jogadoresEquipaVisitante: Jogador[] = [];
  posicoes!: string[];

  constructor(private fireService: FirestoreService) {
    this.posicoes = ['Guarda-Redes', 'Defesa', 'Médio', 'Avançado'];
  }

  ngOnInit(): void {
    this.getJogadoresFromEquipa(this.jogo.equipaCasa).then(jogadores => {
      this.jogadoresEquipaCasa = jogadores;
    });

    this.getJogadoresFromEquipa(this.jogo.equipaVisitante).then(jogadores => {
      this.jogadoresEquipaVisitante = jogadores;
    });
    /* this.getJogo('yZpbzl9o11rIACdpbTZt'); */
  }

  filterPosicaoJogadores(jogadores: Jogador[], posicao: string): Jogador[] {
    let j =  jogadores.filter(jogador => jogador.posicao == posicao);
    return j;
  }

  getJogadoresFromEquipa(equipa: string): Promise<Jogador[]> {
    return new Promise<Jogador[]>((resolve) => {
      this.fireService.getJogadoresFromEquipa(equipa).subscribe((data: any) => {
        const equipa = data as Equipa;
        resolve(equipa.jogadores);
      });
    });
  }

  getJogo(codigoJogo: string){
    this.fireService.getJogo(codigoJogo).subscribe((data: any) => {

      if(data[0] != null){
        let j = data[0];
        this.jogo = {
          $key: j.$key,
          competicao: j['competicao'],
          data: j['data'],
          estadio: j['estadio'],
          equipaCasa: j['equipaCasa'],
          equipaVisitante: j['equipaVisitante'],
          resultado: j['resultado']
        } as Jogo;
      }
    });
  }
}




