import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { HomeScreenComponent } from './user-panel/home-screen/home-screen.component';


export const routes: Routes = [
  {
    path: '',component:HomeScreenComponent
  },
 
 
 
 
  {
    path: 'main',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
    
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'items',
        loadChildren: () => import('./views/items/items.module').then(m => m.ItemsModule)
      },
      {
        path: 'Additems',
        loadChildren: () => import('./views/additems/additems.module').then(m => m.AdditemsModule)
      },
      {
        path: 'cat',
        loadChildren: () => import('./views/crud-cat-subcat/crud-cat-subcat.module').then(m => m.CrudCatSubcatModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
