import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AllproductsComponent } from './allproducts/allproducts.component';

const routes: Routes = [


  {
    path: '',
    data: {
      title: 'Products'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: ''
      // },
       {
        path: 'addprd',
        component: AddproductComponent,
        data: {
          title: 'Add Products'
        }
      },
      {
        path: 'allprd',
        component: AllproductsComponent,
        data: {
          title: 'All Products'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
