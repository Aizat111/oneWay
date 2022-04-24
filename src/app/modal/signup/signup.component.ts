import { SignupProcessComponent } from './../../signup-process/signup-process.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EMailComponent } from '../e-mail/e-mail.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private modalController: ModalController, private router:Router) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.router.navigate(['tabs']);
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async goEmail() {
    const modal = await this.modalController.create({
      component: EMailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'E-Postan',
        'startPlaceHolder': 'E-posta'
      }
    });
    return await modal.present();
  }
  async goPhone() {
    const modal = await this.modalController.create({
      component: EMailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'Telefon numaranız',
        'startPlaceHolder': 'Telefon numara'
      }
    });
    return await modal.present();
  }
}
