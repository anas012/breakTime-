import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


import {PasswordModule} from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    PasswordModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
    NgxSpinnerModule
  
  ],
  exports: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordModule { }
