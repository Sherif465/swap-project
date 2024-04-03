import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../people';

@Injectable({
  providedIn: 'root'
})
export class FetchingPeopleService {
  private apiUrl = 'https://swapi.dev/api/people/'

  constructor(private http: HttpClient) { }

  getAllPeople(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`).pipe(
      catchError(this.handleError<any>('getAllPeople'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
