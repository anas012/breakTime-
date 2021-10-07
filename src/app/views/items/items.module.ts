import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items/items.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule
  ],
  exports: [
    ItemsComponent
  ]
})
export class ItemsModule { }
