import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "./layout/tabs/tabs.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./auth/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'registo',
    loadChildren: () => import('./auth/registo/registo.module').then( m => m.RegistoPageModule)
  },
  {
    path: 'login-social',
    loadChildren: () => import('./auth/login-social/login-social.module').then( m => m.LoginSocialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendario',
      },
      {
        path: 'calendario',
        loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'jogo-detalhes/:id',
        loadChildren: () => import('./modules/jogo-detalhes/jogo-detalhes.module').then( m => m.JogoDetalhesPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./modules/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'classificacoes',
        loadChildren: () => import('./modules/classificacoes/classificacoes.module').then( m => m.ClassificacoesPageModule)
      },
    ],
  },
  {
    path: 'modal-equipas-favoritas',
    loadChildren: () => import('./modules/perfil/modal-equipas-favoritas/modal-equipas-favoritas.module').then( m => m.ModalEquipasFavoritasPageModule)
  },


  /* {
    path: 'jogo-detalhes',
    loadChildren: () => import('./modules/jogo-detalhes/jogo-detalhes.module').then( m => m.JogoDetalhesPageModule)
  }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
