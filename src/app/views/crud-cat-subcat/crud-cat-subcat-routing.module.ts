import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCatSubcatModule } from './crud-cat-subcat.module';
import { CrudCatSubcatComponent } from './crud-cat-subcat/crud-cat-subcat.component';

const routes: Routes = [
  {
    path: '',
    component: CrudCatSubcatComponent,
    data: {
      title: 'Category'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudCatSubcatRoutingModule { }
