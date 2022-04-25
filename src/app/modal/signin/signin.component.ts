import { SignupProcessComponent } from '../../signup-process/signup-process.component';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EMailComponent } from '../e-mail/e-mail.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  @Input() visibleSignUp=false;
  constructor(private modalController: ModalController) { }
  
  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  openSignUp()
  {
    this.visibleSignUp=!this.visibleSignUp;
  }

  async SignUpEmail() {
    const modal = await this.modalController.create({
      component: SignupProcessComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'E-posta adresin',
        'startPlaceholder':'E-posta'
      }
    });
    return await modal.present();
  }
 
  async SignUpPhone() {
    const modal = await this.modalController.create({
      component: SignupProcessComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'Telefon numaran',
        'startPlaceholder':'Telefon numara'
      }
    });
    return await modal.present();
  }

  async SignInEmail() {
    const modal = await this.modalController.create({
      component: EMailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'E-Postan',
        'startPlaceHolder': 'E-posta'
      }
    });
    modal.onDidDismiss().then(count=>{
    this.dismiss()
    });
    return await modal.present();
  }

  async SignInPhone() {
    const modal = await this.modalController.create({
      component: EMailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'startValue': 'Telefon numaranız',
        'startPlaceHolder': 'Telefon numara'
      }
    });
    modal.onDidDismiss().then(count=>{
      this.dismiss()
      });
    return await modal.present();
  }


}
