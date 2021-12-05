import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageJumbotronRoutingModule } from './mainpage-jumbotron-routing.module';
import { JumbotronListComponent } from './jumbotron-list/jumbotron-list.component';
import { JumbotronAddComponent } from './jumbotron-add/jumbotron-add.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    JumbotronListComponent,
    JumbotronAddComponent
  ],
  imports: [
    CommonModule,
    MainpageJumbotronRoutingModule,
    TableModule,
    ToastModule
  ],
  exports: [
    JumbotronListComponent,
    JumbotronAddComponent
  ]
})
export class MainpageJumbotronModule { }
