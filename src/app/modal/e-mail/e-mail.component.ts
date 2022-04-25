import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-e-mail',
  templateUrl: './e-mail.component.html',
  styleUrls: ['./e-mail.component.scss'],
})
export class EMailComponent implements OnInit {
  @Input() startValue='';
  @Input() startPlaceHolder='';
  _email='';
  _password='';

  constructor(private  modalController: ModalController, private router:Router) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data    
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  onSubmit()
  {
    this.router.navigate(['tabs']);
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
