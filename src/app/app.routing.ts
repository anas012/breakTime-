import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AdminauthGuard } from './shared/adminauth.guard';
import { AuthGuard } from './shared/auth.guard';


export const routes: Routes = [

 
  {
    path: 'main',
    component: DefaultLayoutComponent,canActivate:[AuthGuard,AdminauthGuard],
    data: {
      title: 'Home'
   },
    
    children: [
    
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      ,canActivate:[AuthGuard,AdminauthGuard]},
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
        ,canActivate:[AuthGuard,AdminauthGuard] },
      {
        path: 'products',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)
      ,canActivate:[AuthGuard,AdminauthGuard]},
     
      {
        path: 'cat',
        loadChildren: () => import('./views/crud-cat-subcat/crud-cat-subcat.module').then(m => m.CrudCatSubcatModule)
      ,canActivate:[AuthGuard,AdminauthGuard]},
    ]
  },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
