import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Campground } from '../../models/campground.model';
import { CampgroundService } from '../../services/campground.service';

@Component({
  selector: 'app-campground-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css'],
  providers: [CampgroundService],
})
export class CampgroundListComponent implements OnInit {
  campgrounds: Campground[] = []; // Initialize as empty array
  randomImageUrl: string = '';
  currentUser: any;

  constructor(
    private campgroundService: CampgroundService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Set currentUser from AuthService

    // Set random image for campgrounds that don't have images
    this.randomImageUrl = `https://picsum.photos/400?random=${Math.random()}`;

    // Fetch campgrounds from the service
    this.campgroundService.getCampgrounds().subscribe({
      next: (data: Campground[]) => {
        this.campgrounds = data;
        console.log(this.campgrounds);
      },
      error: (error: any) => {
        console.error('Error fetching campgrounds', error);
      },
      complete: () => {
        console.log('Completed fetching campgrounds');
      },
    });
    this.currentUser = { username: 'testUser' }; 
  }

  // Method to generate random image if a campground doesn't have an image
  getRandomImageUrl(): string {
    return this.randomImageUrl;
  }

  
}
