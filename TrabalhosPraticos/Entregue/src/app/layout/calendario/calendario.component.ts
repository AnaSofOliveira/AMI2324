import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Jogo } from 'src/app/core/services/database/entities/jogo';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent  implements OnInit, AfterViewInit {

  @ViewChild('sliderDias', { static: false }) sliderDiasRef!: ElementRef;
  @ViewChild('sliderJogos', { static: false }) sliderJogosRef!: ElementRef;

  days: string[] = [];
  indexDiasSelecionado: number = 7; // "hoje" is the 8th element (index 7)
  indexJogosSelecionado: number = 7;
  realDays: moment.Moment[] = [];

  todosJogos: Jogo[] = [];
  jogosDia: Jogo[] = [];
  jogosFavoritos: Jogo[] = [];
  competicoes: string[] = [];
  equipasFavoritas: string[] = [];

  constructor(private fireService: FirestoreService) { }

  ngAfterViewInit(): void {
    this.slideTo(this.indexDiasSelecionado);
    this.jogosDia = this.filterJogosInDay(this.todosJogos, this.realDays[this.indexDiasSelecionado]);
    this.updateCompeticoesDia();
  }

  ngOnInit() {
    this.generateDays();
    this.slideTo(this.indexDiasSelecionado);

    this.fireService.obterTodosJogos().subscribe(data => {
      this.todosJogos = data.map(
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

      this.fireService.obterEquipasFavoritas().subscribe((data: any) => {
        this.equipasFavoritas = data.equipasFavoritas;
      });
    });
  }

  generateDays() {
    const today = moment();
    for (let i = -7; i <= 7; i++) {
      if (i === 0) {
        this.days.push('Hoje');
      } else if (i === -1) {
        this.days.push('Ontem');

      } else if (i === 1) {
        this.days.push('Amanhã');
      } else {
        this.days.push(today.clone().add(i, 'days').format('D/MMM'));
      }
      this.realDays.push(today.clone().add(i, 'days'));
    }
  }

  onSlideDiasChange() {
    this.indexDiasSelecionado = this.sliderDiasRef.nativeElement.swiper.activeIndex;
    this.indexJogosSelecionado = this.indexDiasSelecionado;

    this.slideTo(this.indexJogosSelecionado);
  }

  onSlideJogosChange() {
    this.indexJogosSelecionado = this.sliderJogosRef.nativeElement.swiper.activeIndex;
    this.indexDiasSelecionado = this.indexJogosSelecionado;

    this.slideTo(this.indexDiasSelecionado);
    this.jogosFavoritos = this.filterJogosFavoritos(this.jogosDia);

  }

  slideTo(index: number) {
    this.sliderDiasRef?.nativeElement.swiper.slideTo(index);
    this.sliderJogosRef?.nativeElement.swiper.slideTo(index);

    this.jogosDia = this.filterJogosInDay(this.todosJogos, this.realDays[index]);
    this.updateCompeticoesDia();
  }

  updateCompeticoesDia(): void {
    this.competicoes = [];
    this.jogosDia.forEach(jogo => {
      if (!this.competicoes.includes(jogo.competicao)) {
        this.competicoes.push(jogo.competicao);
      }
    });
  }

  filterJogosFavoritos(jogos: Jogo[]): Jogo[] {
    console.log('filterJogosFavoritos')
    console.log(jogos);
    let favoritos = jogos.filter(jogo => this.isJogoFavorito(jogo));
    console.log(favoritos);
    return favoritos;
  }

  filterJogoInCompeticao(jogos: Jogo[], competicao: string): Jogo[] {
    return jogos.filter(jogo => jogo.competicao == competicao);
  }

  filterJogosInDay(jogos: Jogo[], dia: moment.Moment): Jogo[] {
    return jogos.filter(jogo => moment(jogo.data).isSame(dia, 'day'));
  }

  isJogoFavorito(jogo: Jogo): boolean {
    console.log('isJogoFavorito');
    console.log("Equipas Favoritas:", this.equipasFavoritas)
    console.log("Jogo: ", jogo);
    console.log("Casa: ", jogo.equipaCasa);
    console.log("Visitante: ", jogo.equipaVisitante);

    let isFavorito = this.equipasFavoritas.includes(jogo.equipaCasa) || this.equipasFavoritas.includes(jogo.equipaVisitante);
    console.log(isFavorito);
    return isFavorito;
  }

}
