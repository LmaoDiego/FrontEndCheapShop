import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Product} from "../models/product/product";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  //Products Endpoint
  basePath ='http://localhost:3000/api/products'
  categoryFilter:string="";
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
  //Post Product
  addProduct(item: any): Observable<Product> {
    return this.http.post<Product>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Product by Id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Product Data
  getAllProducts(): Observable<Product>{
    return this.http.get<Product>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Product
  updateProduct(id: number, item: Product): Observable<Product>{
    return this.http.put<Product>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<Product>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
