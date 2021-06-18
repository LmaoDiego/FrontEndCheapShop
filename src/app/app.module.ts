import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { OrderComponent } from './models/Order/order/order.component';
// import { CategoryComponent } from './models/category/category.component';
// import { CommentComponent } from './models/comment/comment.component';
// import { DepartmentComponent } from './models/department/department.component';
// import { DistrictComponent } from './models/district/district.component';

import {ProductsApiService} from "./services/products-api.service";
import {ProductComponent} from "./pages/product/product.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import { HomeComponent } from './pages/home/home/home.component';
import {ProductsComponent} from "./pages/products/products.component";
// import { UserComponent } from './models/user/user.component';
// import { SupplierComponent } from './models/supplier/supplier.component';


@NgModule({
  declarations: [
    AppComponent,
    // OrderComponent,
    // CategoryComponent,
    // CommentComponent,
    // DepartmentComponent,
    // DistrictComponent,
    ProductComponent,
    HomeComponent,
    // UserComponent,
    // SupplierComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [ProductsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
