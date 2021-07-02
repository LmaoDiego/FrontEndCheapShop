import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductsApiService} from "../../services/products-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {SuppliersApiService} from "../../services/suppliers-api.service";
import {Product} from "../../models/product/product";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
//
  productsFiltered:any=[]
  productData:Product={} as Product;
  dataSource= new MatTableDataSource();
  isFiltering=false;

//
  constructor(private productsApi:ProductsApiService,private suppliersApi:SuppliersApiService
    ,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productsApi.getAllProductsBySupplier(this.route.snapshot.url[1].path)
      .subscribe((response:Product)=>{
        this.productData={} as Product;
        this.productData=_.cloneDeep(response);
        console.log(response);
        console.log(this.productData);
        this.productsFiltered=response;
      });

  }

  navigateToPublishedProduct(productId:number): void {
    this.router.navigate([`catalog/product/${productId}`])
      .then(() => console.log(this.route.url) );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }

}
