import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { CalendarioComponent } from 'src/app/layout/calendario/calendario.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
})
export class HomePageModule {}
