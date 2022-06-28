import { ProfileService } from './../services/profile/profile.service';
import { AddCarComponent } from './../modal/add-car/add-car.component';
import { AboutMeComponent } from './../modal/about-me/about-me.component';
import { NumberIdentyComponent } from './../modal/number-identy/number-identy.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthIDComponent } from '../modal/auth-id/auth-id.component';
import { AuthService } from '../services/auth/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  slider: boolean = true;
  profile:any = [];
  imgUrl:string = '';
  userData: any;
  constructor(private router: Router, private  modalController: ModalController,
 
    private profilehApi: ProfileService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.profilehApi.getUserProfile().subscribe((data) => {
      this.userData = data;
      this.profile = data.body;
      this.imgUrl = data.imageUrl;
      console.log(this.profile);
    });
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
        'type': type
      }
    });
    return await modal.present();
  }
  async goAboutMe(type:string) {
    const modal = await this.modalController.create({
      component: AboutMeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'type':this.userData
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

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });
 
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();
 
      const result = await this.profilehApi.uploadImage(image,this.profile);
      loading.dismiss();
 
      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }




  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
