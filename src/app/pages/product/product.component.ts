import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Product} from "../../models/product/product";
import {ProductsApiService} from "../../services/products-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
//
  @ViewChild('productForm', { static: false })
  productForm!: NgForm;
  isEditMode = false;
  productId!: number;
  productData: Product = {} as Product;
  defaultProduct: Product = { id: 0, name: '', price: 0, description: ''};

//
  constructor(private productsApi: ProductsApiService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveProduct(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetProduct();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToProducts(): void {
    this.router.navigate(['/products'])
      .then(() => console.log(this.route.url) );
  }
  resetProduct(): void {
    this.productData = this.defaultProduct;
  }
  retrieveProduct(id: number): void {
    this.productsApi.getProductById(id)
      .subscribe((response: Product) => {
        this.productData = {} as Product;
        this.productData = _.cloneDeep(response);
        console.log(response);
        console.log(this.productData);
      });
  }
  addProduct(): void {
    const newProduct = {name: this.productData.name, price: this.productData.price, description: this.productData.description};
    this.productsApi.addProduct(newProduct)
      .subscribe(() => {
        this.navigateToProducts();
      });
  }
  cancelEdit(): void {
    this.navigateToProducts();
  }
  updateProduct(): void {
    this.productsApi.updateProduct(this.productData.id, this.productData as Product)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToProducts();
  }
  onSubmit(): void {
    if (this.productForm.form.valid) {
      console.log(this.productData);
      if (this.isEditMode) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
