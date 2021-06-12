import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './models/Order/order/order.component';
import { CategoryComponent } from './models/category/category.component';
import { CommentComponent } from './models/comment/comment.component';
import { DepartmentComponent } from './models/department/department.component';
import { DistrictComponent } from './models/district/district.component';
import { ProductComponent } from './models/product/product.component';
import { UserComponent } from './models/user/user.component';
import { SupplierComponent } from './models/supplier/supplier.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CategoryComponent,
    CommentComponent,
    DepartmentComponent,
    DistrictComponent,
    ProductComponent,
    UserComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
