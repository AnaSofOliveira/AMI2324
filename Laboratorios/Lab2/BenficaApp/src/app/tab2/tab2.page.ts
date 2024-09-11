import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PLAYERS } from '../players';
import { ModalpagePage } from '../modalpage/modalpage.page';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Player } from '../player';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  selected_index = 0;
  actionSheetController: ActionSheetController;
  players: Player[] = [];

  constructor(public modalCtrl : ModalController) {
    this.actionSheetController = new ActionSheetController();
  }

  ngOnInit(): void {
    this.players = PLAYERS;
  }

  onSlideChange(){
    this.selected_index = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

    async presentModal() {
      let url = this.players[this.selected_index].url;
      const modal = await this.modalCtrl.create({
      component: ModalpagePage,
      componentProps: { value: url }
      });
      return await modal.present();
      }

  async openMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Player',
      mode: 'ios',
      buttons: [
        {text: 'Play Video',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
          this.presentModal();
          }
        },
        {text: 'Follow',
          icon: 'logo-twitter',
          handler: () => {
          console.log('Favorite clicked');
          }
        },
        {text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

}
