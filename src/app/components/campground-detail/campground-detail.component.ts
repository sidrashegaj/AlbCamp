import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CampgroundService } from '../../services/campground.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import * as mapboxgl from 'mapbox-gl';
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
    images: [],
    price: 0,
    author: { _id: 0, username: '' },
    reviews: [],
    geometry: { coordinates: [0, 0] },
    name: ''
  };
  map!: mapboxgl.Map;
  id: any;
  randomImageUrl: string = '';
  reviews: Review[] = [];
  newReview: Review = {
    reviewId: 0,
    text: '',
    timestamp: new Date(),
    userId: 0,
    user: { userId: 0, username: '' },
    campgroundId: 0,
    rating: 0
  };
  newRating: number = 0;
  campgroundId: number = 0;
  isLoggedIn: boolean = false;
  currentUserId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private campgroundService: CampgroundService,
    private reviewService: ReviewService,
    public authService: AuthService,
    private flashMessageService: FlashMessageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    console.log('Logged-in User ID:', this.currentUserId); // debugg

    this.randomImageUrl = `https://picsum.photos/400?random=${Math.random()}`;

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCampgroundDetails(this.id);

        if (isPlatformBrowser(this.platformId)) {
          this.initializeMap();
        }

        this.loadReviews(+this.id);
      }
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserId = this.authService.getUserId();
  }

  navigateToLogin(): void {
    this.flashMessageService.showMessage('Please log in to leave a review.', 5000);
    this.router.navigate(['/login']);
  }

  canAddOrDelete(): boolean {
    return this.authService.isAuthenticated();
  }

  submitReview(): void {
    if (!this.isLoggedIn) {
      this.navigateToLogin();
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.userId || !currentUser.username) {
      console.error('User details are missing.');
      return;  
    }

    const reviewToSubmit: Review = {
      reviewId: 0,
      text: this.newReview.text,
      timestamp: new Date(),
      userId: currentUser.userId,  
      user: {
        userId: currentUser.userId,
        username: currentUser.username
      },
      campgroundId: this.campground.campgroundId,  // associates the review with the current campground
      rating: this.newRating  
    };

    // backend
    this.reviewService.addReview(this.campgroundId, reviewToSubmit).subscribe({
      next: (review) => {
        this.reviews.push(review);  
        this.newReview.text = '';   
        this.newRating = 0;         
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      },
    });
  }

  loadCampgroundDetails(id: number) {
    this.campgroundService.getCampground(id).subscribe({
      next: (data: Campground) => {
        this.campground = data;
        this.campgroundId = this.campground.campgroundId;

        if (isPlatformBrowser(this.platformId)) {
          this.initializeMap();
        }

        if (this.campground.images && this.campground.images.length > 0) {
          this.randomImageUrl = this.campground.images[0].url;
        }
      },
      error: (err) => {
        console.error('Error fetching campground details', err);
      },
    });
  }

  loadReviews(campgroundId: number): void {
    this.reviewService.getReviewsForCampground(campgroundId).subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews;
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      },
    });
  }

  deleteReview(reviewId: number): void {
    const review = this.reviews.find(r => r.reviewId === reviewId);
    console.log('Logged-in User ID:', this.currentUserId); 

    if (review && Number(review.userId) !== Number(this.currentUserId)) {
      this.flashMessageService.showMessage('You can only delete your own reviews!', 5000);
      return;
    }

    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.flashMessageService.showMessage('Review deleted successfully!', 5000);
        this.reviews = this.reviews.filter((r) => r.reviewId !== reviewId);
      },
      error: (err) => {
        console.error('Error deleting review:', err);
        this.flashMessageService.showMessage('Cannot delete review!', 5000);
      },
    });
  }

  initializeMap(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [this.campground.geometry.coordinates[0], this.campground.geometry.coordinates[1]],
        zoom: 12,
        accessToken: environment.mapbox.accessToken,
      });

      new mapboxgl.Marker()
        .setLngLat([this.campground.geometry.coordinates[0], this.campground.geometry.coordinates[1]])
        .addTo(this.map);
    }
  }

  deleteCampground(campgroundId: number): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    this.campgroundService.deleteCampground(campgroundId.toString()).subscribe({
      next: () => {
        this.flashMessageService.showMessage('Campground deleted successfully!', 5000);
        this.router.navigate(['/campgrounds']);
      },
      error: (error) => {
        this.flashMessageService.showMessage('Cannot delete campground of other users!', 5000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();  
    }
  }
  
  
}
