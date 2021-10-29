import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudCatSubcatRoutingModule } from './crud-cat-subcat-routing.module';
import { CrudCatSubcatComponent } from './crud-cat-subcat/crud-cat-subcat.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    CrudCatSubcatComponent
  ],
  imports: [
    CommonModule,
    CrudCatSubcatRoutingModule,
    DropdownModule
    ],
  exports: [
    CrudCatSubcatComponent
  ]
})
export class CrudCatSubcatModule { }
