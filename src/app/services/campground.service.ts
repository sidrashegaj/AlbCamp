import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campground } from '../models/campground.model';

@Injectable({
  providedIn: 'root'
})
export class CampgroundService {

  private apiUrl = 'http://localhost:5247/api/campgrounds'; 

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
}
  


