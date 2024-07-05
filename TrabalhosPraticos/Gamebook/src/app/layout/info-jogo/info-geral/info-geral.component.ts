import { map } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, Control, icon } from 'leaflet';
import { Jogo } from 'src/app/core/entities/jogo';

@Component({
  selector: 'app-info-geral',
  templateUrl: './info-geral.component.html',
  styleUrls: ['./info-geral.component.scss'],
})
export class InfoGeralComponent  implements OnInit {

  @Input() jogo!: Jogo;
  map!: Map;
  markerIcon: any;

  constructor() {
    this.markerIcon = icon({
      iconUrl: 'assets/icon/marker-icon.png',
      iconSize: [30,  40],
    });
   }

  ngOnInit() {
    console.log(this.jogo);
    console.log(this.jogo.data);

    this.map = new Map('map').setView([28.644800, 77.216721], 13);

    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
       attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);

    console.log("ionViewDidEnter" + this.map);

    this.leafletMap();

    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 1000);
    });
  }

  leafletMap(){
    marker([this.jogo.estadio.latitude, this.jogo.estadio.longitude], {icon: this.markerIcon}).addTo(this.map)
    .bindPopup(this.jogo.estadio.nome) //, {minWidth : 200, content: this.jogo.estadio.nome, offset: [0, -1]}
    .openPopup();
  }

}
