import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";

@NgModule({
  declarations: [
    AddproductComponent,
    AllproductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    AddproductComponent,
    AllproductsComponent
  ],
  providers: [ConfirmationService],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class ProductsModule { }
