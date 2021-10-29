import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditemsRoutingModule } from './additems-routing.module';
import { AdditemsComponent } from './additems.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
AdditemsComponent
  ],
  imports: [
    CommonModule,
    AdditemsRoutingModule,
    DropdownModule
  ],
  exports: [
    
  ]
})
export class AdditemsModule { }
