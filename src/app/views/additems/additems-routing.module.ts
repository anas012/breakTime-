import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditemsComponent } from './additems.component';

const routes: Routes = [
{
  path: '',
  component: AdditemsComponent,
  data: {
    title: 'Add items'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditemsRoutingModule { }
