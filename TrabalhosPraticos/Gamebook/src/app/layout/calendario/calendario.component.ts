import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/core/entities/jogo';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent  implements OnInit {

  jogos!: Jogo[];
  competicoes: string[] = [];
  equipasFavoritas: string[] = [];

  constructor(private fireService: FirestoreService) { }

  ngOnInit() {
    this.fireService.obterTodosJogos().subscribe(data => {
      this.jogos = data.map(
        (e: {
          payload: {
            doc: {
              id: any;
              data: any;
              }
            };
        }) => {
          return {
            $key: e.payload.doc.id,
            competicao: e.payload.doc.data()['competicao'],
            data: e.payload.doc.data()['data'].toDate(),
            estadio: e.payload.doc.data()['estadio'],
            equipaCasa: e.payload.doc.data()['equipaCasa'],
            equipaVisitante: e.payload.doc.data()['equipaVisitante'],
            resultado: e.payload.doc.data()['resultado']
          } as Jogo;
      });
      this.jogos.forEach(jogo => {
        if (!this.competicoes.includes(jogo.competicao)) {
          this.competicoes.push(jogo.competicao);
        }
      });


      this.fireService.getEquipasFavoritas().subscribe((data: any) => {
        data.forEach((equipa: any) => {
          this.equipasFavoritas.push(equipa.nome);
        });
      });

    });
  }

  filterJogoInCompeticao(jogos: Jogo[], competicao: string): Jogo[] {
    return jogos.filter(jogo => jogo.competicao == competicao);
  }

  isJogoFavorito(jogo: Jogo): boolean {
    return this.equipasFavoritas.includes(jogo.equipaCasa) || this.equipasFavoritas.includes(jogo.equipaVisitante);
  }
}
