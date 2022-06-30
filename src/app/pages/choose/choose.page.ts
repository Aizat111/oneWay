import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AddPostComponent } from 'src/app/modal/add-post/add-post.component';
import { CountPassengerComponent } from 'src/app/modal/count-passenger/count-passenger.component';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { PublishService } from 'src/app/services/publish/publish.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {
  postId: any;
  post: any;
  userData: any;
  user:any;
  countPsgnr=1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postApi: PublishService,
    private _cdr: ChangeDetectorRef,
    private auth: Auth,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private profilehApi: ProfileService,
  ) {}

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userData = this.auth.currentUser;
    console.log(this.postId);
    this.getPost();
  }
  getPost() {
    this.postApi.getPost(this.postId).subscribe((data) => {
      this.post = data;
      console.log(this.post);
    });
  }
  async deletePost() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.postApi.deletePost(this.post.id).then((res) => {
      this.router.navigate(['tabs/tab2']);
      loading.dismiss();
    });
    loading.dismiss();
  }
  cal(psgnr: number, price: number) {
    return psgnr * price;
  }
  async editPost() {
    const modal = await this.modalController.create({
      component: AddPostComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        post: this.post,
        update: true,
      },
    });
    return await modal.present();
  }
  async countPassenger(){
    const modal = await this.modalController.create({
      component: CountPassengerComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'maxCount': this.post?.totalCountPsgnr
      }
    });
    modal.onDidDismiss().then(count=>{
    if(count.data.dismissed)
    this.countPsgnr=count.data.count;
       });
   return await modal.present();
  }
  submit(){
    const body = {
      user: this.user,
      status:false
    }
    
  }
  getProfile(){
    this.profilehApi.getUserProfile().subscribe((data) => {
      this.user = data;

    });
  }
}
