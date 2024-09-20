import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; // Import NavigationEnd
import { Campground } from '../../models/campground.model';
import { CampgroundService } from '../../services/campground.service';
import * as mapboxgl from 'mapbox-gl'; // Import Mapbox GL
import { environment } from '../../../environments/environment'; 
import { filter } from 'rxjs/operators'; // Import RxJS filter

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
  currentUser: any;
  map!: mapboxgl.Map;

  constructor(
    private campgroundService: CampgroundService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeMap();

    // Subscribe to router events to reload campgrounds on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadCampgrounds(); // Reload the campgrounds when navigation ends
      });

    this.loadCampgrounds(); // Initial load of campgrounds when the component is initialized
    this.currentUser = { username: 'testUser' }; 
  }

  // Method to load campgrounds
  loadCampgrounds(): void {
    this.campgroundService.getCampgrounds().subscribe({
      next: (data: Campground[]) => {
        this.campgrounds = data.map(campground => {
          // Assign a random image to campgrounds that don't have images
          if (!campground.images || campground.images.length === 0) {
            campground.images = [{ url: this.getRandomImageUrl() }]; 
          }
          return campground;
        });
        console.log(this.campgrounds);
      },
      error: (error: any) => {
        console.error('Error fetching campgrounds', error);
      },
      complete: () => {
        console.log('Completed fetching campgrounds');
      },
    });
  }
  
  initializeMap(): void {
    (mapboxgl as any).default.accessToken = environment.mapbox.accessToken;
  
    this.map = new mapboxgl.Map({
      container: 'map', // ID in HTML template
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-98.35, 39.5], // Center of the US (just an example)
      zoom: 3, // Initial zoom level
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  
  // Helper method to get a random image URL
  getRandomImageUrl(): string {
    return `https://picsum.photos/400?random=${Math.random()}`; // Return random image URL
  }
}  