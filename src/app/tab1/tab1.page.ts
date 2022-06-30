import { Router } from '@angular/router';
import { FindPlaceComponent } from './../modal/find-place/find-place.component';
import { IonDatetime, ModalController } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CountPassengerComponent } from '../modal/count-passenger/count-passenger.component';
import { PublishService } from '../services/publish/publish.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  countPsgnr=1;
  todaysDate:any=new Date();
  from:any = [];
  to:any = [];
  posts:any = [];
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor(private modalController:ModalController, private postApi: PublishService, private _cdr: ChangeDetectorRef,
    private router: Router) {}
  ngOnInit(){
    this.todaysDate=this.todaysDate.toString().slice(3,15);
  }

  async countPassenger(){
    const modal = await this.modalController.create({
      component: CountPassengerComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'maxCount': 5
      }
    });
    modal.onDidDismiss().then(count=>{
    if(count.data.dismissed)
    this.countPsgnr=count.data.count;
       });
   return await modal.present();
  }

  async findPlace(type: boolean){
    const modal = await this.modalController.create({
      component: FindPlaceComponent,
      cssClass: 'my-custom-class'

    });
    modal.onDidDismiss().then(location=>{
      if(location.data.dismissed)
      if(type) this.from = location.data.location;
      else this.to = location.data.location;
         });
    return await modal.present();
  }

  confirm() {
    this.datetime[0].nativeEl.confirm();
  }

  openPage(id:string){
    this.router.navigate(['choose'])
  }
  

  search(){
    const body = {
      from: this.from.id,
      to: this.to.id,
      date: this.todaysDate,
      countPsgnr:this.countPsgnr

    }
   this.postApi.getSearchResults(body).subscribe(data=>{
    console.log(data);
    this.posts = data;
   })
  }
  }

