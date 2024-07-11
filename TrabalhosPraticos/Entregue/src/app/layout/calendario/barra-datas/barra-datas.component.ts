import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import Swiper from 'swiper';

@Component({
  selector: 'app-barra-datas',
  templateUrl: './barra-datas.component.html',
  styleUrls: ['./barra-datas.component.scss'],
})
export class BarraDatasComponent implements OnInit, AfterViewInit{


  @ViewChild('daySlider', { static: false }) swiperRef!: ElementRef;

  days: string[] = [];
  selectedDayIndex: number = 6; // "hoje" is the 8th element (index 7)

  ngOnInit() {
    this.generateDays();
    this.swiperRef?.nativeElement.swiper.slideTo(this.selectedDayIndex);
  }

  ngAfterViewInit(): void {
    this.slideTo(this.selectedDayIndex);
  }

  generateDays() {
    const today = moment();
    for (let i = -7; i <= 7; i++) {
      if (i === 0) {
        this.days.push('hoje');
      } else if (i === -1) {
        this.days.push('ontem');
      } else if (i === 1) {
        this.days.push('amanhã');
      } else {
        this.days.push(today.clone().add(i, 'days').format('D/MMM'));
      }
    }
  }

  onSlideChange() {
    this.selectedDayIndex = this.swiperRef?.nativeElement.swiper.getActiveIndex;
    console.log('onSlideChange');
    console.log(this.selectedDayIndex);
  }

  slideTo(index: number) {
    console.log('slideTo');
    console.log(index);
    this.swiperRef?.nativeElement.swiper.slideTo(index);
  }
}
