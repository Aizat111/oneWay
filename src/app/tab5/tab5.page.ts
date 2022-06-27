import { AddCarComponent } from './../modal/add-car/add-car.component';
import { AboutMeComponent } from './../modal/about-me/about-me.component';
import { NumberIdentyComponent } from './../modal/number-identy/number-identy.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthIDComponent } from '../modal/auth-id/auth-id.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  slider: boolean = true;
  constructor(private router: Router, private  modalController: ModalController) { }

  ngOnInit() {
  }
  segmentChanged(ev: any) {
    this.slider = !this.slider;
  }
  async goAuth() {
    const modal = await this.modalController.create({
      component: AuthIDComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'visibleSignUp':true
      }
    });
    return await modal.present();
  }
  async goNumber(type:string) {
    const modal = await this.modalController.create({
      component: NumberIdentyComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'type':type
      }
    });
    return await modal.present();
  }
  async goAboutMe(type:string) {
    const modal = await this.modalController.create({
      component: AboutMeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'type':type
      }
    });
    return await modal.present();
  }
  async goAddCar(type:string) {
    const modal = await this.modalController.create({
      component: AddCarComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'type':type
      }
    });
    return await modal.present();
  }
}
