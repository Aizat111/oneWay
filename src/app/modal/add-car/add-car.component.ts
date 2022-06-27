import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {

  @ViewChild('mySlider') slides:IonSlides;
  _plaka='';
  _carName='';
  _carYear='';

  slideOpts={
    initalSlide:0,
    slidesPerView:1,
    allowTouchMove:false
  };
  constructor(private modalController:ModalController) { }

  ngOnInit() {}
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
}
