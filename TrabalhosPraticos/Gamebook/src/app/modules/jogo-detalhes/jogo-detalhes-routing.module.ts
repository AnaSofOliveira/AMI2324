import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JogoDetalhesPage } from './jogo-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: JogoDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JogoDetalhesPageRoutingModule {}
