import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Order} from "../../models/order/order";
import {Router} from "@angular/router";
import {OrdersApiService} from "../../services/orders-api.service";
import * as _ from "lodash";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('orderForm', { static: false }) orderForm!: NgForm;
  orderData: Order;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userid', 'amount', 'purchase_date', 'delivery_date', 'delivery_address','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditMode = false;
  isFiltering = false;
  constructor(private ordersApi: OrdersApiService, private router: Router) {
    this.orderData = {} as Order;
  }

  ngOnInit(): void {
    this.getAllOrders();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }
  getAllOrders(): void {
    this.ordersApi.getAllOrders().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element: any): void {
    console.log(element);
    this.orderData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.orderForm.resetForm();
  }
  deleteItem(id: number): void {
    this.ordersApi.deleteOrder(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addOrder(): void {
    const newOrder = { userid: this.orderData.userid, amount: this.orderData.amount,purchase_date: this.orderData.purchase_date, delivery_date: this.orderData.delivery_date, delivery_address: this.orderData.delivery_address};
    this.ordersApi.addOrder(newOrder).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateOrder(): void {
    this.ordersApi.updateOrder(this.orderData.id, this.orderData)
      .subscribe((response: Order) => {
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
    if (this.orderForm.form.valid) {
      if (this.isEditMode) {
        this.updateOrder();
      } else {
        this.addOrder();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddOrder(): void {
    this.router.navigate(['/orders/new'])
      .then(() => console.log('Navigated to New Order'));
  }
  navigateToEditOrder(orderId: number): void {
    this.router.navigate([`/orders/${orderId}`])
      .then(() => console.log('Navigated to Edit Order'));
  }
  refresh(): void {
    console.log('about to reload');
    this.getAllOrders();
  }

}
