import { UserItemComponent } from './../../components/user-item/user-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersListPageRoutingModule } from './users-list-routing.module';

import { UsersListPage } from './users-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersListPageRoutingModule,
    
  ],
  declarations: [UsersListPage,UserItemComponent]
})
export class UsersListPageModule {}
