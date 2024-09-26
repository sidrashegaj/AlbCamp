import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Campground } from '../models/campground.model';

@Injectable({
  providedIn: 'root'
})
export class CampgroundService {

  private apiUrl = 'https:/localhost:7136/api/campgrounds'; 
  campgrounds: Campground[] = [];

  constructor(private http: HttpClient) { }

  getCampgrounds(): Observable<Campground[]> {
    return this.http.get<Campground[]>(this.apiUrl); // Calls the backend to get campgrounds
  }
  //gets single cg by id
  getCampground(id: number): Observable<Campground> {
    return this.http.get<Campground>(`${this.apiUrl}/${id}`);
  }
  deleteCampground(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addCampground(campgroundData: FormData): Observable<Campground> {
    return this.http.post<Campground>(`${this.apiUrl}`, campgroundData);
  }
  updateCampground(campgroundId: number, updatedCampground: any): Observable<Campground> {
    return this.http.put<Campground>(`${this.apiUrl}/${campgroundId}`, updatedCampground);
  }
  searchCampgrounds(query: string): Observable<Campground[]> {
    const url = `https://localhost:7136/api/campgrounds/search?q=${query}`;
    return this.http.get<Campground[]>(url).pipe(
      catchError(this.handleError) // Catch errors and handle them
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong with the search.'));
  }
  
  
  
}
  


