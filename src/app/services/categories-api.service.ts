import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Category} from "../models/category/category";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  //Categories EndPoint
  basePath='http://localhost:3000/api/categories'
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
  //Post Category
  addCategory(item:any):Observable<Category>{
    return this.http.post<Category>(this.basePath,JSON.stringify(item),this.httpOptions)
      .pipe(retry(2),catchError(this.handleError) );
  }
  // Get Category by Id
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  //DG
  getAllCategoriesById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.basePath}/${id}/products`,this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //
  // Get Category Data
  getAllCategories(): Observable<Category>{
    return this.http.get<Category>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Category
  updateCategory(id: number, item: Category): Observable<Category>{
    return this.http.put<Category>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<Category>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
