import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-number-identy',
  templateUrl: './number-identy.component.html',
  styleUrls: ['./number-identy.component.scss'],
})
export class NumberIdentyComponent implements OnInit {
  @Input() type='';
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
  code = '';
  constructor(private modalController:ModalController) { }

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
}
