import { AlertController, IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-process',
  templateUrl: './signup-process.component.html',
  styleUrls: ['./signup-process.component.scss'],
})
export class SignupProcessComponent implements OnInit {
  @ViewChild('mySlider') slides:IonSlides;
  credentials: FormGroup;
  //controls slides
  slideOpts={
    initalSlide:0,
    slidesPerView:1,
    allowTouchMove:false
  };
  @Input() startValue='';
  @Input() startPlaceholder='';
  _email='';
  _name='';
  _surname='';
  _date='';
  _password='';
  _gendar: '';
  constructor(private modalController:ModalController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService, private router:Router) { }

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
  nextSlide(){
    this.slides.slideNext();
  }
  prevSlide(){
    this.slides.slidePrev();
  }
  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
  console.log(this.credentials.value)
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
    console.log(user);
    if (user) {
      this.nextSlide();
  
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }
 async regUser(){
  const body = {
    email:this.credentials.value.email,
    surname:this._surname,
    name:this._name,
    date:this._date,
    gendar:this._gendar
  }
  const loading = await this.loadingController.create();
  await loading.present();

  const result = await this.authService.registerUser(body);
  loading.dismiss();

  if (!result) {
    const alert = await this.alertController.create({
      header: 'Upload failed',
      message: 'There was a problem uploading your avatar.',
      buttons: ['OK'],
    });
    await alert.present();
  }else{
    this.dismiss(); 
    this.router.navigateByUrl('tabs', { replaceUrl: true });
  }
  
    // 
 }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
 
    if (user) {
      this.router.navigateByUrl('tabs', { replaceUrl: true });
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
