import { SignupComponent } from './../signup/signup.component';
import { SignupProcessComponent } from '../../signup-process/signup-process.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EMailComponent } from '../e-mail/e-mail.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async goEmail() {
    const modal = await this.modalController.create({
      component: SignupProcessComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'E-posta adresin'
      }
    });
    return await modal.present();
  }
  async goSignup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  } 
  async goPhone() {
    const modal = await this.modalController.create({
      component: SignupProcessComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'Telefon numaran'
      }
    });
    return await modal.present();
  }


}
