import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, Control } from 'leaflet';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { Jogo } from 'src/app/core/entities/jogo';

@Component({
  selector: 'app-jogo-detalhes',
  templateUrl: './jogo-detalhes.page.html',
  styleUrls: ['./jogo-detalhes.page.scss'],
})
export class JogoDetalhesPage {

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  selected_index = 0;
  /* map!: Map; */
  gameKey!: string;
  jogo!: Jogo;

  constructor(private route: ActivatedRoute, private router: Router, private fireService: FirestoreService) {
    this.route.paramMap.subscribe(params => {
      this.gameKey = params.get('id')!;

      this.fireService.getJogo(this.gameKey).subscribe((jogo: any) => {
        if(jogo != null){
          this.jogo = jogo[0] as Jogo;
          this.jogo.data = (this.jogo.data as any).toDate();
        }
      });
    });
  }

  onSlideChange(){
    this.selected_index = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

/*
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
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
    marker([38.752669777579364, -9.184713172327804]).addTo(this.map)
    .bindPopup("estádio da luz")
    .openPopup();
  } */


}




