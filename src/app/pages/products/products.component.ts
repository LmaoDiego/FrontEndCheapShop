import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ProductsApiService} from "../../services/products-api.service";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {Product} from "../../models/product/product";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('productForm', { static: false }) productForm!: NgForm;
  productData: Product;
  dataSource = new MatTableDataSource();
  isFiltering = false;
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditMode = false;


  constructor(public productsApi: ProductsApiService, private router: Router) {
    this.productData = {} as Product;
  }

  ngOnInit(): void {

    this.getAllProducts();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }

  applyFilter(): void {
    //const filterValue = (event.target as HTMLInputElement).value;
    const filterValue = (document.getElementById("1")as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }
  getAllProducts(): void {
    this.productsApi.getAllProducts().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element: any): void {
    console.log(element);
    this.productData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.productForm.resetForm();
  }
  deleteItem(id: number): void {
    this.productsApi.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addProduct(): void {
    const newProduct = {name: this.productData.name, price: this.productData.price, description: this.productData.description};
    this.productsApi.addProduct(newProduct).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateProduct(): void {
    this.productsApi.updateProduct(this.productData.id, this.productData)
      .subscribe((response: Product) => {
        this.dataSource.data = this.dataSource.data.map((o: any) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.productForm.form.valid) {
      if (this.isEditMode) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddProduct(): void {
    this.router.navigate(['/products/new'])
      .then(() => console.log('Navigated to New Product'));
  }
  navigateToEditProduct(productId: number): void {
    this.router.navigate([`/products/${productId}`])
      .then(() => console.log('Navigated to Edit Product'));
  }
  refresh(): void {
    console.log('about to reload');
    this.getAllProducts();
  }


}
