import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEquipasFavoritasPage } from './modal-equipas-favoritas.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEquipasFavoritasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEquipasFavoritasPageRoutingModule {}
