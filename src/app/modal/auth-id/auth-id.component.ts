import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth-id',
  templateUrl: './auth-id.component.html',
  styleUrls: ['./auth-id.component.scss'],
})
export class AuthIDComponent implements OnInit {
  @ViewChild('mySlider') slides:IonSlides;
  _email='';
  _firstname='';
  _lastname='';
  _date='';
  _password='';
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
