import { Component, OnInit} from '@angular/core';
import {Category} from "../../models/category/category";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesApiService} from "../../services/categories-api.service";
import * as _ from "lodash";
import {HttpClient} from "@angular/common/http";
import {ProductsApiService} from "../../services/products-api.service";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  //
  categories:any=[];
  categoryData: Category={} as Category;
  dataSource = new MatTableDataSource();
  isFiltering = false;
  constructor(private productsApi:ProductsApiService, private http:HttpClient, private categoriesApi: CategoriesApiService, private router: Router,private route:ActivatedRoute) { }
  //

  ngOnInit(): void {
    this.categoriesApi.getAllCategories()
      .subscribe((response: Category) => {
        this.categoryData = {} as Category;
        this.categoryData = _.cloneDeep(response);
        console.log(response);
        console.log(this.categoryData);
        this.categories=response;
      });

  }

  navigateToCategory(categoryName:string):void{
    this.router.navigate([`categories/${categoryName}`])
      .then(() => console.log(this.route.url) );
  }

  navigateToProducts(categoryName:string): void {
    this.productsApi.categoryFilter=categoryName;
    this.router.navigate([`products`])
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
