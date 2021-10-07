import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsModule } from '../views/items/items.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ItemsComponent } from './home-screen/items/items.component';
import { MainpageComponent } from './home-screen/mainpage/mainpage.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
{path:'',component:HomeScreenComponent,
children:[

  {path:'mainpage',component:MainpageComponent},
  {path:'items',component:ItemsComponent}
]
},

  {path:'checkout',component:CheckoutComponent},
  {path:'shoppingcart',component:ShoppingCartComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserPanelRoutingModule { }
