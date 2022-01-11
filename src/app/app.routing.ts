import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { AdminauthGuard } from "./shared/adminauth.guard";
import { AuthGuard } from "./shared/auth.guard";

export const routes: Routes = [
  {
    path: "main",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard, AdminauthGuard],
    data: {
      title: "Home",
    },

    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./Admin panel/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./Admin panel/orders/orders.module").then((m) => m.OrdersModule),
        canActivate: [AuthGuard, AdminauthGuard],
      },

      {
        path: "cat",
        loadChildren: () =>
          import("./Admin panel/crud-cat-subcat/crud-cat-subcat.module").then(
            (m) => m.CrudCatSubcatModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },
      {
        path: "jumbotron",
        loadChildren: () =>
          import("./Admin panel/mainpage-jumbotron/mainpage-jumbotron.module").then(
            (m) => m.MainpageJumbotronModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },

      {
        path: "product",
        loadChildren: () =>
          import("./Admin panel/products/products.module").then(
            (m) => m.ProductsModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },
      {
        path: "register",
        loadChildren: () =>
          import("./Admin panel/register-admin/register-admin.module").then(
            (m) => m.RegisterAdminModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },
      {
        path: "resetpw",
        loadChildren: () =>
          import("./Admin panel/reset-password/reset-password.module").then(
            (m) => m.ResetPasswordModule
          ),
        canActivate: [AuthGuard, AdminauthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
