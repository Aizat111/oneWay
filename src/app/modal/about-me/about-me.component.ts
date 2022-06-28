import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  @Input() type='';
  @ViewChild('mySlider') slides:IonSlides;
  _aboutMe='';

  constructor(private modalController:ModalController, private profilehApi: ProfileService,
    private loadingController: LoadingController,
    private alertController: AlertController,) { }

  ngOnInit() {
    console.log(this.type);
    
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  nextSlide(){
    this.slides.slideNext();
  }
  prevSlide(){
    this.slides.slidePrev();
  }
  async addAboutMe(){
    const body = {
      content: this._aboutMe,

    }
    const loading = await this.loadingController.create();
    await loading.present();
    const ruselt =  this.profilehApi.aboutMe(body);
    await loading.dismiss();
    console.log(ruselt);
    
    if(!ruselt){
      const alert = await this.alertController.create({
        header: 'Upload failed',
        message: 'There was a problem uploading your avatar.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    else{
      this.dismiss();
    }
  }

}
