import { AddPostComponent } from './modal/add-post/add-post.component';
import { AboutMeComponent } from './modal/about-me/about-me.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { AddCarComponent } from './modal/add-car/add-car.component';
import { NumberIdentyComponent } from './modal/number-identy/number-identy.component';
import { FindPlaceComponent } from './modal/find-place/find-place.component';
import { EMailComponent } from './modal/e-mail/e-mail.component';
import { SigninComponent } from 'src/app/modal/signin/signin.component';
import { SignupProcessComponent } from './signup-process/signup-process.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountPassengerComponent } from './modal/count-passenger/count-passenger.component';
import { AuthIDComponent } from './modal/auth-id/auth-id.component';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    SignupProcessComponent,
    SigninComponent,
    EMailComponent,
    FindPlaceComponent,
    CountPassengerComponent,
    AuthIDComponent,
    NumberIdentyComponent,
    AddCarComponent,
    AboutMeComponent,
    AddPostComponent,
    
  ],
  entryComponents: [AuthIDComponent, NumberIdentyComponent, AddCarComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
