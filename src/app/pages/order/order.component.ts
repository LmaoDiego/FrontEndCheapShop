import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Order} from "../../models/order/order";
import {OrdersApiService} from "../../services/orders-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('orderForm', { static: false })
  orderForm!: NgForm;
  isEditMode = false;
  orderId!: number;
  orderData: Order = {} as Order;
  defaultOrder: Order = { id: 0, userid:0,amount: 0, purchase_date:'', delivery_date: '', delivery_address: ''};
  constructor(private ordersApi: OrdersApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveOrder(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetOrder();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToOrders(): void {
    this.router.navigate(['/orders'])
      .then(() => console.log(this.route.url) );
  }
  resetOrder(): void {
    this.orderData = this.defaultOrder;
  }
  retrieveOrder(id: number): void {
    this.ordersApi.getOrderById(id)
      .subscribe((response: Order) => {
        this.orderData = {} as Order;
        this.orderData = _.cloneDeep(response);
        console.log(response);
        console.log(this.orderData);
      });
  }
  addOrder(): void {
    const newOrder = {userid: this.orderData.userid, amount: this.orderData.amount, purchase_date: this.orderData.purchase_date,delivery_date: this.orderData.delivery_date, delivery_address: this.orderData.delivery_address};
    this.ordersApi.addOrder(newOrder)
      .subscribe(() => {
        this.navigateToOrders();
      });
  }
  cancelEdit(): void {
    this.navigateToOrders();
  }
  updateOrder(): void {
    this.ordersApi.updateOrder(this.orderData.id, this.orderData as Order)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToOrders();
  }
  onSubmit(): void {
    if (this.orderForm.form.valid) {
      console.log(this.orderData);
      if (this.isEditMode) {
        this.updateOrder();
      } else {
        this.addOrder();
      }
    } else {
      console.log('Invalid Data');
    }
  }

}
