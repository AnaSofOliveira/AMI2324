import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistoPageRoutingModule } from './registo-routing.module';
import { RegistoPage } from './registo.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistoPageRoutingModule,
    ReactiveFormsModule,
  ],
})
export class RegistoPageModule {}
