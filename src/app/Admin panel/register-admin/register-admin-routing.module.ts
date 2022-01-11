import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [

  {
    path: '',
    component: RegisterAdminComponent,
    data: {
      title: 'Register Admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAdminRoutingModule { }
