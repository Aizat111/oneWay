import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-count-passenger',
  templateUrl: './count-passenger.component.html',
  styleUrls: ['./count-passenger.component.scss'],
})
export class CountPassengerComponent implements OnInit {
  countPassenger=1;
  @Input() maxCount: any;
  constructor(private modalController:ModalController,private router:Router) { }

  ngOnInit() {}
  dismiss(control) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data 
    // this.router.navigate(['tabs']);
    this.modalController.dismiss({
    'dismissed': control,
    'count':this.countPassenger,
    });
  }
  increasePassenger(){
    if(this.maxCount>this.countPassenger)
    this.countPassenger+=1;
  }
  decreasePassenger(){
    if(this.countPassenger>1)
    this.countPassenger-=1;
  }

}
