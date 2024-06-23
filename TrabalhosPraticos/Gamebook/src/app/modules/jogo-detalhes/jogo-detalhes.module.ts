import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JogoDetalhesPageRoutingModule } from './jogo-detalhes-routing.module';

import { JogoDetalhesPage } from './jogo-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JogoDetalhesPageRoutingModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [JogoDetalhesPage]
})
export class JogoDetalhesPageModule {}
