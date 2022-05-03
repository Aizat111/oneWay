import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FindPlaceComponent } from '../modal/find-place/find-place.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalController:ModalController) {}
  async findPlace(){
    const modal = await this.modalController.create({
      component: FindPlaceComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
