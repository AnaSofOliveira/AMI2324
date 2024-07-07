import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ListaEquipasFavoritasComponent } from 'src/app/layout/perfil/lista-equipas-favoritas/lista-equipas-favoritas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage, ListaEquipasFavoritasComponent]
})
export class PerfilPageModule {}
