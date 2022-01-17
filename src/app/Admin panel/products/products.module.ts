import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductAddComponent } from "./product-add/product-add.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { PaginatorModule } from "primeng/paginator";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ProductEditComponent } from "./product-edit/product-edit.component";
@NgModule({
  declarations: [ProductListComponent, ProductAddComponent,ProductEditComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    ButtonsModule,
    PaginatorModule,
    InputNumberModule,
    InputSwitchModule
  ],
  exports: [ProductListComponent, ProductAddComponent,ProductEditComponent],
  providers: [ConfirmationService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsModule {}
