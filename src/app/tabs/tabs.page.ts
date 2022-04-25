import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from '../modal/signin/signin.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private  modalController: ModalController) {}

  async goSignin() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
