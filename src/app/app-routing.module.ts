import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import {ProductsComponent} from "./pages/products/products.component";
import {UserComponent} from "./pages/user/user.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {HomeComponent} from "./pages/home/home/home.component";
import {PublishedProductComponent} from "./pages/published-product/published-product.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {OrderComponent} from "./pages/order/order.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'user', component: UserComponent},
  { path: 'user/:id/edit', component: EditProfileComponent},
  {path: 'catalog/product/:id',component:PublishedProductComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/new', component: OrderComponent },
  { path: 'orders/:id', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
