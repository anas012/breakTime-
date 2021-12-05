import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {PaginatorModule} from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule,
    NgxSpinnerModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
OrdersComponent
  ],
  providers: [ConfirmationService],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class OrdersModule { }
