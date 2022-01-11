import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageJumbotronRoutingModule } from './mainpage-jumbotron-routing.module';
import { JumbotronListComponent } from './jumbotron-list/jumbotron-list.component';
import { JumbotronAddComponent } from './jumbotron-add/jumbotron-add.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { ButtonsModule } from "@progress/kendo-angular-buttons";
@NgModule({
  declarations: [
    JumbotronListComponent,
    JumbotronAddComponent
  ],
  imports: [
    CommonModule,
    MainpageJumbotronRoutingModule,
    TableModule,
    ToastModule,
    ButtonsModule
  ],
  exports: [
    JumbotronListComponent,
    JumbotronAddComponent
  ]
})
export class MainpageJumbotronModule { }
