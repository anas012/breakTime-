import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ItemsComponent } from './home-screen/startuppage/items/items.component';
import { MainpageComponent } from './home-screen/startuppage/mainpage/mainpage.component';
import { SearcheditemComponent } from './home-screen/startuppage/searcheditem/searcheditem.component';
import { StartuppageComponent } from './home-screen/startuppage/startuppage.component';



const routes: Routes = [
{path:'',component:HomeScreenComponent,
children:[
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},

{path:'startup',component:StartuppageComponent,
children:[
   {path:'mainpage',component:MainpageComponent},
  {path:'items/:id',component:ItemsComponent},
   {path:'searcheditem/:searchitem',component:SearcheditemComponent}
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
