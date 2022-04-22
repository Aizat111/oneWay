import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router, private navControl: NavController) { 
    
  }
  ngOnInit() {
    setTimeout(()=>{
      this.navControl.navigateRoot('login');
    },5000)
  }

}
