import { ProfileService } from 'src/app/services/profile/profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
 
  messages: any;
  newMsg = '';
  userID:any;
  sendUser: any;
  getUser: any;

 
  constructor(private chatService: ChatService, private router: Router,
     private activatedRoute: ActivatedRoute,
     private profileApi: ProfileService,
     private auth: Auth,) { }
 
  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');
   this.getProfile(this.userID);
   const user = this.auth.currentUser;
   this.getProfileGet(user.uid);
  

  }
  getChat(){
    this.chatService.getChatMessages(this.sendUser?.id,this.userID).subscribe(data=>{
      this.messages = data;
      console.log(this.messages);
     });
  }
 
  sendMessage() {
    const body = {
      createdAt: new Date(),
      from: this.sendUser?.id,
      msg: this.newMsg,
      fromName: this.sendUser?.body?.name ,
      myMsg: true,
      to:this.userID,
      toNmae:this.getUser
    }
    this.chatService.addChatMessage(this.sendUser?.id,this.userID,body).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
    this.chatService.addChatMessage(this.userID,this.sendUser?.id,body).then(() => {
   
    });
  }
  getProfile(id) {
    this.profileApi.getUserProfileForMsg(id).subscribe((data) => {
       this.getUser = data;

    });
  }
  getProfileGet(id) {
    this.profileApi.getUserProfileForMsg(id).subscribe((data) => {
       this.sendUser = data;
       this.getChat();
    });
  }
  signOut() {

  }

}
