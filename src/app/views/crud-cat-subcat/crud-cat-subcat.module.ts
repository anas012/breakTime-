import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudCatSubcatRoutingModule } from './crud-cat-subcat-routing.module';
import { CrudCatSubcatComponent } from './crud-cat-subcat/crud-cat-subcat.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    CrudCatSubcatComponent
  ],
  imports: [
    CommonModule,
    CrudCatSubcatRoutingModule,
    DropdownModule,
    FormsModule,
    ToastModule
    ],
  exports: [
    CrudCatSubcatComponent
  ]
})
export class CrudCatSubcatModule { }
