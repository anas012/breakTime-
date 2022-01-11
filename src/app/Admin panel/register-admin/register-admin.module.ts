import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAdminRoutingModule } from './register-admin-routing.module';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputMask, InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    RegisterAdminRoutingModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    PasswordModule,
    InputTextModule,
    InputMaskModule,
  ],
  exports: [
    RegisterAdminComponent
  ]
})
export class RegisterAdminModule { }
