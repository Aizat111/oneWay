import { UserItemComponent } from './components/user-item/user-item.component';
import { AddCarComponent } from './modal/add-car/add-car.component';
import { NumberIdentyComponent } from './modal/number-identy/number-identy.component';
import { FindPlaceComponent } from './modal/find-place/find-place.component';
import { EMailComponent } from './modal/e-mail/e-mail.component';
import { SigninComponent } from 'src/app/modal/signin/signin.component';
import { SignupProcessComponent } from './signup-process/signup-process.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountPassengerComponent } from './modal/count-passenger/count-passenger.component';
import { AuthIDComponent } from './modal/auth-id/auth-id.component';


@NgModule({
  declarations: [AppComponent,SignupProcessComponent,SigninComponent,EMailComponent,FindPlaceComponent,CountPassengerComponent,AuthIDComponent,NumberIdentyComponent,AddCarComponent],
  entryComponents: [AuthIDComponent,NumberIdentyComponent,AddCarComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
