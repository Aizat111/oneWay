import { IonSlides, ModalController } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signup-process',
  templateUrl: './signup-process.component.html',
  styleUrls: ['./signup-process.component.scss'],
})
export class SignupProcessComponent implements OnInit {
  @ViewChild('mySlider') slides:IonSlides;
  slideOpts={
    initalSlide:0,
    slidesPerView:1,
    allowTouchMove:false

  };
  @Input() startValue='';
  _email='';
  _name='';
  _surname='';
  _date='';
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
