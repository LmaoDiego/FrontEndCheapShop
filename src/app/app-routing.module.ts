import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import {ProductsComponent} from "./pages/products/products.component";
import {PublishedProductComponent} from "./pages/published-product/published-product.component";
import {HomeComponent} from "./pages/home/home/home.component";

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'catalog/product/:id', component: PublishedProductComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
