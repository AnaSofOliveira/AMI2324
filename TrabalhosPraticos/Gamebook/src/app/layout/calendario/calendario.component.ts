import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Jogo } from 'src/app/core/entities/jogo';
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

  jogos!: Jogo[];
  competicoes: string[] = [];
  equipasFavoritas: string[] = [];

  constructor(private fireService: FirestoreService) { }

  ngAfterViewInit(): void {
    this.slideTo(this.indexDiasSelecionado);
  }

  ngOnInit() {
    this.generateDays();
    this.sliderDiasRef?.nativeElement.swiper.slideTo(this.indexDiasSelecionado);
    this.sliderJogosRef?.nativeElement.swiper.slideTo(this.indexJogosSelecionado);

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

  generateDays() {
    const today = moment();
    for (let i = -7; i <= 7; i++) {
      if (i === 0) {
        this.days.push('hoje');
      } else if (i === -1) {
        this.days.push('ontem');
      } else if (i === 1) {
        this.days.push('amanhã');
      } else {
        this.days.push(today.clone().add(i, 'days').format('D/MMM'));
      }
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
  }

  slideTo(index: number) {
    console.log('slideTo');
    console.log(index);
    this.sliderDiasRef?.nativeElement.swiper.slideTo(index);
    this.sliderJogosRef?.nativeElement.swiper.slideTo(index);
  }

  filterJogoInCompeticao(jogos: Jogo[], competicao: string): Jogo[] {
    return jogos.filter(jogo => jogo.competicao == competicao);
  }

  isJogoFavorito(jogo: Jogo): boolean {
    return this.equipasFavoritas.includes(jogo.equipaCasa) || this.equipasFavoritas.includes(jogo.equipaVisitante);
  }

}
