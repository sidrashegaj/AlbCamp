import { Component, OnDestroy, OnInit } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { CampgroundService } from '../../services/campground.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import * as mapboxgl from 'mapbox-gl'; // Import mapbox-gl
import { environment } from '../../../environments/environment';
import { FlashMessageService } from '../../services/flash-message.service';
import { AuthService } from '../../services/auth.service';

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
    geometry: { coordinates: [0, 0] }
  };
  map!: mapboxgl.Map; // Define map variable
  id: any;
  randomImageUrl: string = '';
  reviews: Review[] = [];
  newReviewText: string = '';
  newRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private campgroundService: CampgroundService,
    private reviewService: ReviewService,
    public authService: AuthService,
    private flashMessageService: FlashMessageService,
    private router: Router // Add Router here
  ) {}

  ngOnInit(): void {
    this.randomImageUrl = `https://picsum.photos/400?random=${Math.random()}`;
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCampgroundDetails(this.id); // Fetch campground details based on id
        this.initializeMap(); // Initialize the map when the campground is loaded
        this.loadReviews(this.id);
      }
    });
  }

  // Method to redirect to login if the user is not logged in
  navigateToLogin(): void {
    this.flashMessageService.showMessage('Please log in to leave a review.', 5000);
    this.router.navigate(['/login']); // Navigate to the login page
  }

  canAddOrDelete(): boolean {
    return this.authService.isAuthenticated();  // Check if the user is authenticated
  }

  submitReview(): void {
    if (!this.authService.isAuthenticated()) {
      // If the user is not logged in, redirect them to login
      this.navigateToLogin();
      return;
    }

    const newReview: Review = {
      reviewId: 0, // This will be set by the server
      body: this.newReviewText,
      rating: this.newRating, // Add rating to the review object
      campgroundId: this.campground.campgroundId,
      author: { _id: 'one', username: 'Current User' }, // Temporary user data
      timestamp: new Date(), // Add a timestamp
      userId: 0
    };

    this.reviewService.postReview(newReview).subscribe({
      next: (review: Review) => {
        this.campground.reviews.push(review); // Add the new review to the list
        this.newReviewText = ''; // Reset the input field
        this.newRating = 0; // Reset the rating
        this.flashMessageService.showMessage('Review submitted successfully!', 5000); // 5 seconds
      },
      error: err => {
        this.flashMessageService.showMessage('Review could not be submitted!', 5000); // 5 seconds
      },
    });
  }

  // Load campground details
  loadCampgroundDetails(id: number) {
    this.campgroundService.getCampground(id).subscribe({
      next: (data: Campground) => {
        this.campground = data;
        this.initializeMap(); 
  
        if (this.campground.images && this.campground.images.length > 0) {
          console.log('Cloudinary images found:', this.campground.images);
          this.randomImageUrl = this.campground.images[0].url

        } else {
          console.log('No images found, using random image as fallback');
        }
  
        console.log('Final images to display:', this.campground.images);
      },
      error: (err) => {
        console.error('Error fetching campground details', err);
      }
    });
  }
  


  // Load reviews for the current campground
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

  // Delete the campground
  deleteCampground(campgroundId: number): void {
    this.campgroundService.deleteCampground(campgroundId.toString()).subscribe({
      next: () => {
        this.flashMessageService.showMessage('Campground deleted successfully!', 5000); // 5 seconds
        this.router.navigate(['/campgrounds']);
      },
      error: (error) => {
        this.flashMessageService.showMessage('Campground could not be deleted!', 5000); // 5 seconds
      }
    });
  }

  // **Delete a Review** - Only allow if the user is authenticated
  deleteReview(reviewId: number): void {
    if (!this.authService.isAuthenticated()) {
      this.navigateToLogin();
      return;
    }
    
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.flashMessageService.showMessage('Review deleted successfully!', 5000); // 5 seconds
        this.campground.reviews = this.campground.reviews.filter(review => review.reviewId !== reviewId);
      },
      error: err => {
        console.error('Error deleting review:', err);
        this.flashMessageService.showMessage('Review could not be deleted!', 5000); // 5 seconds
      }
    });
  }

  // Initialize the map with the campground's coordinates
  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // HTML element ID
      style: 'mapbox://styles/mapbox/streets-v12', // Mapbox style URL
      center: [this.campground.geometry.coordinates[0], this.campground.geometry.coordinates[1]], // Campground coordinates
      zoom: 12, // Initial zoom level
      accessToken: environment.mapbox.accessToken // Set the access token here
    });

    // Add a marker for the campground
    new mapboxgl.Marker()
      .setLngLat([this.campground.geometry.coordinates[0], this.campground.geometry.coordinates[1]])
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Clean up the map when the component is destroyed
    }
  }
}