import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  credentials: FormGroup;

  constructor(private  modalController: ModalController, private router:Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,) { }
    get email() {
      return this.credentials.get('email');
    }
   
    get password() {
      return this.credentials.get('password');
    }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
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

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
 
    if (user) {
      console.log(user)
      this.router.navigateByUrl('tabs', { replaceUrl: true });
      this.dismiss();
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }
 
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


}
