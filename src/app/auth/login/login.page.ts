import { SignupComponent } from './../../modal/signup/signup.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from 'src/app/modal/signin/signin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private  modalController: ModalController) { }

  ngOnInit() {

  }
  onSubmit(form)
  {
    this.router.navigate(['tabs']);
  }
  async goSignup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async goSignin() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
