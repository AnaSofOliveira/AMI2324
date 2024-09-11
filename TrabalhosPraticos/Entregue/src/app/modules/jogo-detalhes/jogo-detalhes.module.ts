import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JogoDetalhesPageRoutingModule } from './jogo-detalhes-routing.module';

import { JogoDetalhesPage } from './jogo-detalhes.page';
import { InfoJogadorComponent } from 'src/app/layout/info-jogo/info-plantel/info-jogador/info-jogador.component';
import { InfoPlantelComponent } from 'src/app/layout/info-jogo/info-plantel/info-plantel.component';
import { InfoEquipasComponent } from 'src/app/layout/info-jogo/info-equipas/info-equipas.component';
import { InfoGeralComponent } from 'src/app/layout/info-jogo/info-geral/info-geral.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JogoDetalhesPageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [JogoDetalhesPage, InfoJogadorComponent, InfoPlantelComponent, InfoEquipasComponent, InfoGeralComponent]
})
export class JogoDetalhesPageModule {}
