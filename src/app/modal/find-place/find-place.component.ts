import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-place',
  templateUrl: './find-place.component.html',
  styleUrls: ['./find-place.component.scss'],
})
export class FindPlaceComponent implements OnInit {

  constructor(private modalController:ModalController) { }
  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data    
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
