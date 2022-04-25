import { FindPlaceComponent } from './../modal/find-place/find-place.component';
import { IonDatetime, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountPassengerComponent } from '../modal/count-passenger/count-passenger.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  countPsgnr=1;
  todaysDate:any=new Date();
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor(private modalController:ModalController) {}
  ngOnInit(){
    this.todaysDate=this.todaysDate.toString().slice(3,15);
  }

  async countPassenger(){
    const modal = await this.modalController.create({
      component: CountPassengerComponent,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(count=>{
    if(count.data.dismissed)
    this.countPsgnr=count.data.count;
       });
   return await modal.present();
  }

  async findPlace(){
    const modal = await this.modalController.create({
      component: FindPlaceComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  confirm() {
    this.datetime[0].nativeEl.confirm();
  }
  
  reset() {
    this.datetime[0].nativeEl.reset();
  }
  }

