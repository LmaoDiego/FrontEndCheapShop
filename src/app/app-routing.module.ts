import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import {ProductsComponent} from "./pages/products/products.component";
import {OrderComponent } from "./pages/order/order.component";
import {OrdersComponent} from "./pages/orders/orders.component";
const routes: Routes = [

  //{ path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/new', component: OrderComponent },
  { path: 'orders/:id', component: OrderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
