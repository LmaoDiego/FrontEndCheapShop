import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import {ProductsComponent} from "./pages/products/products.component";
import {UserComponent} from "./pages/user/user.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";

const routes: Routes = [

  //{ path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'user', component: UserComponent},
  { path: 'user/:id/edit', component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
