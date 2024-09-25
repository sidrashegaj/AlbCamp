import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  
  
}
  


