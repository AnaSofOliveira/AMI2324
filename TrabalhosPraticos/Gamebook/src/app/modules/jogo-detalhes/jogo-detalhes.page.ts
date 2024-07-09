import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, Control } from 'leaflet';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';
import { Jogo } from 'src/app/core/entities/jogo';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';


@Component({
  selector: 'app-jogo-detalhes',
  templateUrl: './jogo-detalhes.page.html',
  styleUrls: ['./jogo-detalhes.page.scss'],
})
export class JogoDetalhesPage /* implements AfterViewInit */{
  public config: SwiperOptions = {
    autoHeight: true, // Enable auto height
  };

  /* @ViewChild('swiper') swiperRef: ElementRef | undefined; */
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;
  selected_index = 0;
  /* map!: Map; */
  gameKey!: string;
  jogo!: Jogo;
  swiper?: Swiper;

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
/*
  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    const swiperOptions: SwiperOptions = {
      on: {
        init: () => console.log('swiper initialized'),
        slideChange: () => this.onSlideChange(),
      },
    };
    this.swiper = new Swiper(this.swiperRef!.nativeElement, swiperOptions);
    this.swiper.on('slideChange', function () {
      console.log('slide changed');
    });
  } */

  onSlideChange(){
    this.selected_index = this.swiperRef?.nativeElement.swiper.activeIndex;
    console.log('onSlideChange', this.selected_index);
  }

  slideTo(index: number) {
    console.log('slideTo', index);
    console.log(this.swiper);
    this.swiperRef?.nativeElement.swiper.slideTo(index);
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




