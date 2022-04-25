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

  ngOnInit() {}
  onSubmit(form)
  {
    this.router.navigate(['tabs']);
  }
  async goSignin() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'visibleSignUp':false
      }
    });
    return await modal.present();
 } 
 async goSignup() {
  const modal = await this.modalController.create({
    component: SigninComponent,
    cssClass: 'my-custom-class',
    componentProps: {
      'visibleSignUp':true
    }
  });
  return await modal.present();
} 
}
