import { ProfileService } from 'src/app/services/profile/profile.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AlertController,
  IonDatetime,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { PublishService } from 'src/app/services/publish/publish.service';
import { CountPassengerComponent } from '../count-passenger/count-passenger.component';
import { FindPlaceComponent } from '../find-place/find-place.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  @Input() post: any;
  @Input() update: any;
  title: '';
  fromName: any;
  toName: any;
  from: string = '';
  to: string = '';
  srcKey: '';
  switchControl: boolean = false;
  cities: any = [];
  countPsgnr = 1;
  todaysDate: any = new Date();
  price: number;
  time: any;
  userData: any;
  result: any;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  constructor(
    private modalController: ModalController,
    private postApi: PublishService,
    private _cdr: ChangeDetectorRef,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private profileApi: ProfileService
  ) {}
  ngOnInit() {
    this.getCities('');
    this.todaysDate = this.todaysDate.toString().slice(3, 15);
    this.getProfile();
    console.log(this.post);
    if (this.update) {
      this.price = this.post.price;
      this.time = this.post.time;
      this.title = this.post.title;
      this.fromName = this.post.from_city_name;
      this.toName = this.post.to_city_name;
      this.countPsgnr = this.post.totalCountPsgnr;
      this.from = this.post.from;
      this.to = this.post.to;
    }
  }

  async findPlace() {
    const modal = await this.modalController.create({
      component: FindPlaceComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async selectCitiy(city: any) {
    if (!this.switchControl) {
      this.switchControl = !this.switchControl;
      this.from = city.id;
      this.fromName = city.name;
    } else {
      this.to = city.id;
      this.toName = city.name;
      this.switchControl = !this.switchControl;
    }
  }
  selectLoc(type: boolean) {
    this.switchControl = type;
  }
  getCities(e: any) {
    this.postApi.getCities(e).subscribe(
      (data) => {
        console.log(data);
        this.cities = data;
        this._cdr.detectChanges();
      },
      (er) => {
        console.log(er);
      }
    );
  }

  async addPost() {
    const user = this.auth.currentUser;
    const body = {
      title: this.title,
      from: this.from,
      from_city_name: this.fromName,
      to: this.to,
      to_city_name: this.toName,
      date: this.todaysDate,
      time: this.time,
      totalCountPsgnr: this.countPsgnr,
      countPsgnr: 0,
      user_id: user.uid,
      price: this.price,
      userData: this.userData,
    };

    const loading = await this.loadingController.create();
    await loading.present();
    if (this.update) {
      this.result = await this.postApi.updatePost(this.post.id, body);
    } else {
      this.result = await this.postApi.post(body);
    }

    loading.dismiss();

    if (!this.result) {
      const alert = await this.alertController.create({
        header: 'Upload failed',
        message: 'There was a problem uploading your avatar.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.dismiss();
    }
  }

  getProfile() {
    this.profileApi.getUserProfile().subscribe((data) => {
      this.userData = data;
    });
  }
  async countPassenger() {
    const modal = await this.modalController.create({
      component: CountPassengerComponent,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then((count) => {
      if (count.data.dismissed) this.countPsgnr = count.data.count;
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

  userAdd(body){

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
