import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import {ProductsComponent} from "./pages/products/products.component";

const routes: Routes = [

  //{ path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
