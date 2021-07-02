import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Product} from "../../models/product/product";
import {ProductsApiService} from "../../services/products-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-published-product',
  templateUrl: './published-product.component.html',
  styleUrls: ['./published-product.component.css']
})
export class PublishedProductComponent implements OnInit {
  @ViewChild('productForm', { static: false })
  productForm!: NgForm;
  productId!: number;
  productData: Product = {} as Product;
  defaultProduct: Product = { id: 0, name: '', price: 0, description: '',url:"",category:"",supplier:""};
  constructor(private productsApi: ProductsApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveProduct(id);
        return id;
      }
    }));
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
}
