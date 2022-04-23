import { EMailComponent } from './modal/e-mail/e-mail.component';
import { SigninComponent } from 'src/app/modal/signin/signin.component';
import { SignupProcessComponent } from './signup-process/signup-process.component';
import { SignupComponent } from './modal/signup/signup.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent,SignupComponent,SignupProcessComponent,SigninComponent,EMailComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
