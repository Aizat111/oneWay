import { ModalController } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublishService } from 'src/app/services/publish/publish.service';

@Component({
  selector: 'app-find-place',
  templateUrl: './find-place.component.html',
  styleUrls: ['./find-place.component.scss'],
})
export class FindPlaceComponent implements OnInit {
  fromName:any;
  toName:any;
  from:string = '';
  to: string = '';
  srcKey: '';
  switchControl:boolean = false;
  cities:any = [];
  constructor(private modalController:ModalController,   private postApi: PublishService,    private _cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.getCities('');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data    
    this.modalController.dismiss({
      'dismissed': true,
      'location':this.from,
    });
  }
  async selectCitiy(city:any){
 
      this.from = city;
      this.fromName = city.name;
    this.dismiss();
    
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

}
