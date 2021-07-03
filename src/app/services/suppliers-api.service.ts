import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Supplier} from "../models/supplier/supplier";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SuppliersApiService {

  //Suppliers EndPoint
  basePath='http://localhost:3000/api/suppliers'
  constructor(private http:HttpClient) { }
  //HttpDefault Options
  httpOptions={ headers: new HttpHeaders({'Content-Type':'application.json'})};
  //
  //API Error Handling
  handleError(error:HttpErrorResponse):Observable<never>{
    if(error.error instanceof ErrorEvent){
      console.log('An error occurred:', error.error.message);
    }
    else{
      console.log(`Backend retunned code ${error.status}, body was:${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');

  }
  //Post Supplier
  addSupplier(item:any):Observable<Supplier>{
    return this.http.post<Supplier>(this.basePath,JSON.stringify(item),this.httpOptions)
      .pipe(retry(2),catchError(this.handleError) );
  }
  // Get Supplier by Id
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Supplier Data
  getAllSuppliers(): Observable<Supplier>{
    return this.http.get<Supplier>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Supplier
  updateSupplier(id: number, item: Supplier): Observable<Supplier>{
    return this.http.put<Supplier>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Supplier
  deleteSupplier(id: number): Observable<any> {
    return this.http.delete<Supplier>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
