import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {ResourceQuery} from './resource-query';
import {Category} from './category';
import {Resource} from './resource';

@Injectable()
export class ResourceApiService {

  apiRoot = environment.api;
  resource_url = `${this.apiRoot}/api/resource`;
  category_url = `${this.apiRoot}/api/category`;
  search_resource_url = `${this.apiRoot}/api/search`;
  token: string;

  constructor(private httpClient: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    let message = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned a status code ${error.status}, ` +
        `Code was: ${JSON.stringify(error.error.code)}, ` +
        `Message was: ${JSON.stringify(error.error.message)}`);
      message = error.error.message;
    }
    // return an observable with a user-facing error message
    // FIXME: Log all error messages to Google Analytics
    return throwError(message);
  };


  searchResources(query: ResourceQuery): Observable<ResourceQuery> {
    return this.httpClient.post<ResourceQuery>(this.search_resource_url, query)
      .pipe(catchError(this.handleError));
  }

  getCategory(id: Number): Observable<Category> {
    return this.httpClient.get<Category>(this.category_url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  getCategoryResources(category: Category): Observable<Resource[]> {
    return this.httpClient.get<Resource[]>(this.apiRoot + category._links.resources)
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiRoot + category._links.self, category)
      .pipe(catchError(this.handleError));
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.category_url, category)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(category: Category): Observable<any> {
    return this.httpClient.delete<Category>(this.apiRoot + category._links.self)
      .pipe(catchError(this.handleError));
  }

}
