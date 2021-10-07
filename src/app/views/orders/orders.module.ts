import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule

  ],
  exports: [
   
  ]
})
export class OrdersModule { }
