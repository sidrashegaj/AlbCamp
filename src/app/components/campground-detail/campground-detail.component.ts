import { Component, OnInit } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CampgroundService } from '../../services/campground.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel


@Component({
  selector: 'app-campground-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './campground-detail.component.html',
  styleUrls: ['./campground-detail.component.css'],  
})export class CampgroundDetailComponent implements OnInit {
  campground: Campground = { 
    campgroundId: 0, 
    title: '', 
    description: '', 
    location: '', 
    images: [], // Initialize as an empty array to avoid null errors
    price: 0, 
    author: { _id: '', username: '' }, 
    reviews: [] 
  };

  id: any;
  randomImageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private campgroundService: CampgroundService
  ) {}

  ngOnInit(): void {
    this.randomImageUrl = `https://picsum.photos/400?random=${Math.random()}`;
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCampgroundDetails(this.id); // Fetch campground details based on id
      }
    });
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

  // submitReview(): void {
  //   const reviewData = {
  //     rating: this.review.rating,
  //     body: this.review.body
  //   };
  //   // Submit the review logic (not fully implemented)
  //   console.log('Review submitted:', reviewData);
  //   // Optionally, call the service to submit review to the backend
  // }

  deleteReview(reviewId: string): void {
    console.log(`Delete review with ID: ${reviewId}`);
    // Implement the logic for deleting a review
  }
}
