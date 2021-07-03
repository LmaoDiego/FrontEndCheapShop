import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Comment} from "../models/comment/comment"
import {catchError, retry} from "rxjs/operators";
import {Product} from "../models/product/product";

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  //Products Endpoint
  basePath ='http://localhost:3000/api/comments'
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
  //Post Comment
  addComment(item: any): Observable<Comment> {
    return this.http.post<Comment>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Comment by Id
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Comment Data
  getAllComments(): Observable<Comment>{
    return this.http.get<Comment>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllCommentsByProduct(product: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.basePath}/?product=${product}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Comment
  updateComment(id: number, item: Comment): Observable<Comment>{
    return this.http.put<Comment>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Comment
  deleteComment(id: number): Observable<any> {
    return this.http.delete<Comment>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
