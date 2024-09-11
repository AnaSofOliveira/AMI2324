import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificacoesPage } from './classificacoes.page';

const routes: Routes = [
  {
    path: '',
    component: ClassificacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificacoesPageRoutingModule {}
