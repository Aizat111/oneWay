import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AlertController, IonDatetime, LoadingController, ModalController } from '@ionic/angular';
import { PublishService } from 'src/app/services/publish/publish.service';
import { CountPassengerComponent } from '../count-passenger/count-passenger.component';
import { FindPlaceComponent } from '../find-place/find-place.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  title:'';
  fromName:any;
  toName:any;
  from:string = '';
  to: string = '';
  srcKey: '';
  switchControl:boolean = false;
  cities:any = [];
  countPsgnr=1;
  todaysDate:any=new Date();
  price: number;
  time: any;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor(private modalController:ModalController,
    private postApi: PublishService,
    private _cdr: ChangeDetectorRef,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) 
    {

    }
    ngOnInit() {
      this.getCities('');
      this.todaysDate=this.todaysDate.toString().slice(3,15);
    }
  
 
  async findPlace(){
    const modal = await this.modalController.create({
      component: FindPlaceComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async selectCitiy(city:any){
    if(!this.switchControl){
      this.switchControl = !this.switchControl;
      this.from = city.id;
      this.fromName = city.name;

    }else{
      this.to = city.id;
      this.toName = city.name;
      this.switchControl = !this.switchControl;
    }
  }
  selectLoc(type: boolean){
    this.switchControl = type;
  }
  getCities(e:any){
  this.postApi.getCities(e).subscribe((data) => {
    console.log(data);
    this.cities = data;
    this._cdr.detectChanges();
  },er=>{
    console.log(er);
  });
  }

  async addPost(){
    const user = this.auth.currentUser;
    const body ={
      title: this.title,
      from: this.from,
      from_city_name: this.fromName,
      to: this.to,
      to_city_name: this.toName,
      date: this.todaysDate,
      time: this.time,
      totalCountPsgnr:this.countPsgnr,
      countPsgnr:0,
      user_id:user.uid,
      price: this.price
      
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.postApi.post(body);
    loading.dismiss();

    if (!result) {
      const alert = await this.alertController.create({
        header: 'Upload failed',
        message: 'There was a problem uploading your avatar.',
        buttons: ['OK'],
      });
      await alert.present();
    }else{
      this.dismiss();
    }
 
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
  confirm() {
    this.datetime[0].nativeEl.confirm();
    console.log(this.datetime);
  }
  
  reset() {
    this.datetime[0].nativeEl.reset();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
