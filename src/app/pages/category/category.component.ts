import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductsApiService} from "../../services/products-api.service";
import {CategoriesApiService} from "../../services/categories-api.service";
import * as _ from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product/product";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
//
  productsFiltered:any=[]
  productData:Product={} as Product;
  dataSource= new MatTableDataSource();
  isFiltering=false;

//
  constructor(private productsApi:ProductsApiService,private categoriesApi:CategoriesApiService
              ,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productsApi.getAllProductsByCategory(this.route.snapshot.url[1].path)
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
