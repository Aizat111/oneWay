import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.page.html',
  styleUrls: ['./stars.page.scss'],
})
export class StarsPage implements OnInit {

  slider: boolean = true;
  constructor(private router: Router, private  modalController: ModalController) { }

  ngOnInit() {
  }
  segmentChanged(ev: any) {
    this.slider = !this.slider;
  }

}
