import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEquipasFavoritasPageRoutingModule } from './modal-equipas-favoritas-routing.module';

import { ModalEquipasFavoritasPage } from './modal-equipas-favoritas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEquipasFavoritasPageRoutingModule
  ],
  declarations: [ModalEquipasFavoritasPage]
})
export class ModalEquipasFavoritasPageModule {}
