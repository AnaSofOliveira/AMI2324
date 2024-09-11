import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/core/services/database/firestore.service';

@Component({
  selector: 'app-modal-equipas-favoritas',
  templateUrl: './modal-equipas-favoritas.page.html',
  styleUrls: ['./modal-equipas-favoritas.page.scss'],
})
export class ModalEquipasFavoritasPage implements OnInit {

  @Input() equipasFavoritas: string[] = [];
  equipas: any[] = [];

  constructor(private fireService: FirestoreService, private modalController: ModalController) { }

  ngOnInit() {

    this.fireService.obterTodasEquipas().subscribe(data => {
      data.map(
        (e: {
          payload: {
            doc: {
              id: any;
              data: any;
              }
            };
        }) => {
          this.equipas.push(
            {nome: e.payload.doc.data()['nome'],
            selected: this.equipasFavoritas.some((equipa) => equipa === e.payload.doc.data()['nome'])}
            );
        }
      )
    });
  }

  fecharModal(){
    this.modalController.dismiss();
  }

  guardarEquipasFavoritas(){
    console.log(this.equipas);
    const equipasSelecionadas = this.equipas.filter(equipa =>{
      if(equipa.selected){
        return equipa.nome;
      }
    });
    console.log('equipasSelecionadas');
    console.log(equipasSelecionadas);
    this.modalController.dismiss(equipasSelecionadas);
  }
}
