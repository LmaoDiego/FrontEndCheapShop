import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../models/product/product";
import {ProductsApiService} from "../../../services/products-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  products:any=[];
  productData: Product={} as Product;
  productId!:number;
  dataSource = new MatTableDataSource();
  isFiltering = false;
  constructor(private productsApi: ProductsApiService, private router: Router,private route:ActivatedRoute) {

  }


  ngOnInit(): void {
    this.productsApi.getAllProducts()
      .subscribe((response: Product) => {
        this.productData = {} as Product;
        this.productData = _.cloneDeep(response);
        console.log(response);
        console.log(this.productData);
        this.products=response;
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
