import { Component, OnDestroy, OnInit } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CampgroundService } from '../../services/campground.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import * as mapboxgl from 'mapbox-gl'; // Import mapbox-gl
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-campground-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './campground-detail.component.html',
  styleUrls: ['./campground-detail.component.css'],  
})
export class CampgroundDetailComponent implements OnInit, OnDestroy {
  campground: Campground = { 
    campgroundId: 0, 
    title: '', 
    description: '', 
    location: '', 
    images: [], // Initialize as an empty array to avoid null errors
    price: 0, 
    author: { _id: '', username: '' }, 
    reviews: [] ,
  };
  map!: mapboxgl.Map; // Define map variable
  id: any;
  randomImageUrl: string = '';
  reviews: Review[] = [];
  newReviewText: string = '';
  newRating: number=0;

  constructor(
    private route: ActivatedRoute,
    private campgroundService: CampgroundService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.randomImageUrl = `https://picsum.photos/400?random=${Math.random()}`;
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCampgroundDetails(this.id); // Fetch campground details based on id
        this.loadReviews(this.id);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Clean up the map when component is destroyed
    }
  }

  loadCampgroundDetails(id: number) {
    this.campgroundService.getCampground(id).subscribe({
      next: (data: Campground) => {
        this.campground = data;
        console.log("Campground data: ", this.campground);

        // If no images exist, use the random image URL as a fallback
        if (!this.campground.images || this.campground.images.length === 0) {
          this.campground.images = [{ url: this.randomImageUrl }];
        }
      },
      error: (err) => {
        console.error("Error fetching campground details", err);
      }
    });
  }


  deleteCampground(id: string): void {
    this.campgroundService.deleteCampground(id).subscribe({
      next: () => {
        console.log('Campground deleted successfully');
        // Add any logic for after the deletion (e.g., redirect or update the UI)
      },
      error: (error) => {
        console.error('Error deleting campground:', error);
      },
      complete: () => {
        console.log('Deletion process completed');
      }
    });
  }  

  loadReviews(campgroundId: number): void {
    this.reviewService.getReviewsForCampground(campgroundId).subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews;
        console.log('Loaded reviews: ', this.reviews);
      },
      error: err => {
        console.error('Error fetching reviews: ', err);
      },
    });
  }

  submitReview(): void {
    const newReview: Review = {
      reviewId: 0, // This will be set by the server
      body: this.newReviewText,
      rating: this.newRating, // Add rating to the review object
      campgroundId: this.campground.campgroundId,
      author: { _id: 'one', username: 'Current User' }, // Temporary user data
      timestamp: new Date() // Add a timestamp
      ,
      userId: 0
    };

    this.reviewService.postReview(newReview).subscribe({
      next: (review: Review) => {
        this.campground.reviews.push(review); // Add the new review to the list
        this.newReviewText = ''; // Reset the input field
        this.newRating = 0; // Reset the rating
      },
      error: err => {
        console.error('Error submitting review: ', err);
      },
    });
  }

  deleteReview(reviewId: string): void {
    console.log(`Delete review with ID: ${reviewId}`);
    // Implement the logic for deleting a review
  }
  initializeMap(): void {
    const map = new mapboxgl.Map({
      container: 'map', // The ID of the container element
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.accessToken, // Pass the accessToken here
      center: [0, 0], // Initial map center
      zoom: 12 // Initial zoom level
    });
  
    // Add navigation controls (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());
  }
  

  flyToLocation(lat: number, lng: number): void {
    // Fly to specific coordinates
    this.map.flyTo({
      center: [lng, lat],
      essential: true
    });

    // Add a marker to the map
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
}
