import { AddPostComponent } from './../modal/add-post/add-post.component';
import { PublishService } from './../services/publish/publish.service';
import { IonDatetime, ModalController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FindPlaceComponent } from '../modal/find-place/find-place.component';
import { CountPassengerComponent } from '../modal/count-passenger/count-passenger.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  posts:any = [];
  userData: any;

  constructor(private modalController:ModalController,
    private postApi: PublishService,
    private _cdr: ChangeDetectorRef,) 
    {

    }
    ngOnInit() {
      this.getMyPosts();
    }
  
 getMyPosts(){
     this.postApi.getPosts().subscribe(data=>{
      this.posts = data;
      console.log(this.posts);
     });
 }
  async findPlace(){
    const modal = await this.modalController.create({
      component: AddPostComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'post': [],
        'update': false
      }
    });
    return await modal.present();
  }
  getUser(user_id:string){
    this.postApi.getUserProfile(user_id=>{
      
    })
  }

 
}
