import { Component, Input, OnInit } from '@angular/core';
import { Jogador } from 'src/app/core/entities/jogador';

@Component({
  selector: 'app-info-jogador',
  templateUrl: './info-jogador.component.html',
  styleUrls: ['./info-jogador.component.scss'],
})
export class InfoJogadorComponent{

  @Input() jogador!: Jogador;

  constructor() {}

}
