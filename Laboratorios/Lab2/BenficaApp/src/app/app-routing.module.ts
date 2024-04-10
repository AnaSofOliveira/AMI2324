import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'tab3', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'videoplay/:sid', loadChildren: () => import('./videoplay/videoplay.module').then(m => m.VideoplayPageModule) },
  { path: 'modalpage', loadChildren: () => import('./modalpage/modalpage.module').then(m => m.ModalpagePageModule) },
];


/* const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modalpage',
    loadChildren: () => import('./modalpage/modalpage.module').then( m => m.ModalpagePageModule)
  },
  {
    path: 'videoplay',
    loadChildren: () => import('./videoplay/videoplay.module').then( m => m.VideoplayPageModule)
  }
]; */

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
