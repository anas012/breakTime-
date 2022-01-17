import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsModule } from './products.module';

const routes: Routes = [

  {
    path: '',
  
    data: {
      title: 'products'
    },
    children:[
      {
        path:'',
        component:ProductListComponent,
        data: {
          title: '',
        },
      },
      {
        path:'add',
        component:ProductAddComponent,
        data: {
          title: 'Add',
        },
      },
      {
        path:'edit/:id',
        component:ProductEditComponent,
        data: {
          title: 'Edit',
        },
      },
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
