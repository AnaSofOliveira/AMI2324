import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassificacoesPageRoutingModule } from './classificacoes-routing.module';

import { ClassificacoesPage } from './classificacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassificacoesPageRoutingModule
  ],
  declarations: [ClassificacoesPage]
})
export class ClassificacoesPageModule {}
