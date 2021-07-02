import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductsApiService} from "../../services/products-api.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {Supplier} from "../../models/supplier/supplier";
import {SuppliersApiService} from "../../services/suppliers-api.service";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

//
  suppliers:any=[];
  supplierData: Supplier={} as Supplier;
  dataSource = new MatTableDataSource();
  isFiltering = false;
  constructor(private productsApi:ProductsApiService, private http:HttpClient, private suppliersApi: SuppliersApiService, private router: Router,private route:ActivatedRoute) { }
  //

  ngOnInit(): void {
    this.suppliersApi.getAllSuppliers()
      .subscribe((response: Supplier) => {
        this.supplierData = {} as Supplier;
        this.supplierData = _.cloneDeep(response);
        console.log(response);
        console.log(this.supplierData);
        this.suppliers=response;
      });

  }

  navigateToSupplier(supplierName:string):void{
    this.router.navigate([`suppliers/${supplierName}`])
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
