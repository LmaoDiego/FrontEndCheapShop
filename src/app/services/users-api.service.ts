import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../models/user/user";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService{
  //Users Endpoint
  basePath ='http://localhost:3000/users'
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
  //Post User
  addUser(item: any): Observable<User> {
    return this.http.post<User>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get User by Id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get User Data
  getAllUsers(): Observable<User>{
    return this.http.get<User>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update User
  updateUser(id: number, item: User): Observable<User>{
    return this.http.put<User>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete User
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<User>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
