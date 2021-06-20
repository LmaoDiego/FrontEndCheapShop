import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Order} from "../models/order/order";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  //Products Endpoint
  basePath ='http://localhost:3000/api/orders'
  constructor(private http:HttpClient) { }
  //Http Default Options
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  //
  //API Error Handling (importante)
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  //Post Order
  addOrder(item: any): Observable<Order> {
    return this.http.post<Order>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Order by Id
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Order Data
  getAllOrders(): Observable<Order>{
    return this.http.get<Order>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Order
  updateOrder(id: number, item: Order): Observable<Order>{
    return this.http.put<Order>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<Order>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
