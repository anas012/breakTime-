import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {MegaMenuModule} from 'primeng/megamenu';
import {SidebarModule} from 'primeng/sidebar';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {TableModule} from 'primeng/table';
import { ItemsComponent } from './home-screen/startuppage/items/items.component';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToastModule} from 'primeng/toast';
import { StartuppageComponent } from './home-screen/startuppage/startuppage.component';
import { MainpageComponent } from './home-screen/startuppage/mainpage/mainpage.component';


@NgModule({
  declarations: [
    HomeScreenComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    ItemsComponent,
    StartuppageComponent,
    MainpageComponent,

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    BadgeModule,
    ButtonModule,
    OverlayPanelModule,
    InputNumberModule,
    FormsModule,
    ScrollPanelModule,
    TieredMenuModule,
    VirtualScrollerModule,
    MegaMenuModule,
    SidebarModule,
    TableModule,
    DialogModule,
    BreadcrumbModule,
    InputMaskModule,
    PasswordModule,
    ToastModule
    

  ],
  exports: [
    HomeScreenComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    ItemsComponent,
    StartuppageComponent,
    MainpageComponent,

  ]
})
export class UserPanelModule { }
