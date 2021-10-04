import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    BadgeModule,
    ButtonModule
  ],
  exports: [
    HomeScreenComponent
  ]
})
export class UserPanelModule { }
