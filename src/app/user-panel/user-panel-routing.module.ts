import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsModule } from '../views/items/items.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ItemsComponent } from './home-screen/items/items.component';
import { MainpageComponent } from './home-screen/startuppage/mainpage/mainpage.component';
import { StartuppageComponent } from './home-screen/startuppage/startuppage.component';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
{path:'',component:HomeScreenComponent,
children:[
  {path:'checkout',component:CheckoutComponent},
  {path:'shoppingcart',component:ShoppingCartComponent},

{path:'startup',component:StartuppageComponent,
children:[
   {path:'mainpage',component:MainpageComponent},
  {path:'items',component:ItemsComponent}
]

},

]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserPanelRoutingModule { }
