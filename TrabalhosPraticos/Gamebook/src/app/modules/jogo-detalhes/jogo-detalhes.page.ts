import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, Control } from 'leaflet';
import { InfoJogadorComponent } from './info-jogador/info-jogador.component';
import { IonContent, IonCol } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-jogo-detalhes',
  templateUrl: './jogo-detalhes.page.html',
  styleUrls: ['./jogo-detalhes.page.scss'],
})
export class JogoDetalhesPage {

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  selected_index = 0;
  map!: Map;

  constructor() { }

  onSlideChange(){
    this.selected_index = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.map = new Map('map').setView([28.644800, 77.216721], 13);

    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
       attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);

    console.log("ionViewDidEnter" + this.map);

    this.leafletMap();
  }

  leafletMap(){
    marker([38.752669777579364, -9.184713172327804]).addTo(this.map)
    .bindPopup("estádio da luz")
    .openPopup();
  }


}




