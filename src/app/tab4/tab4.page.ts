import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ChatService } from '../services/chat/chat.service';
import { ProfileService } from '../services/profile/profile.service';
//import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  users: any = [];
  constructor(private chatService: ChatService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileApi: ProfileService,
    protected readonly cd: ChangeDetectorRef,) {
     setTimeout(()=>{
   
     },3000)
    
     }
 
  ngOnInit() {
    this.getUsers();
  }
 
  getUsers(){
    this.chatService.getUsers().subscribe(data=>{
      console.log(data);
      this.users = data;
    
     });
  }

}
