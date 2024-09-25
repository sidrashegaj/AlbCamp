import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7136/api/reviews';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getReviewsForCampground(campgroundId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/campground/${campgroundId}`);
  }

  addReview(campgroundId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/campground/${campgroundId}`, review);
  }
  
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reviewId}`);
  }
}



