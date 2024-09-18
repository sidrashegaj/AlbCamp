import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:5247/api/reviews';  // Your backend API

  constructor(private http: HttpClient) {}

  // Fetch reviews for a specific campground
  getReviewsForCampground(campgroundId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/campground/${campgroundId}`);
  }

  // Post a new review for a campground
  postReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  // Delete a review
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reviewId}`);
  }

}
