import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./auth/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
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
  /* {
    path: 'jogo-detalhes',
    loadChildren: () => import('./modules/jogo-detalhes/jogo-detalhes.module').then( m => m.JogoDetalhesPageModule)
  }, */
  {
    path: 'jogo-detalhes/:id',
    loadChildren: () => import('./modules/jogo-detalhes/jogo-detalhes.module').then( m => m.JogoDetalhesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
