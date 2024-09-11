import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { CalendarioComponent } from 'src/app/layout/calendario/calendario.component';
import { TabsComponent } from 'src/app/layout/tabs/tabs.component';
import { HomePage } from './home.page';
import { JogoCartaoComponent } from 'src/app/layout/calendario/jogo-cartao/jogo-cartao.component';
import { BarraDatasComponent } from 'src/app/layout/calendario/barra-datas/barra-datas.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage, CalendarioComponent, TabsComponent, JogoCartaoComponent, BarraDatasComponent]
})
export class HomePageModule {}
