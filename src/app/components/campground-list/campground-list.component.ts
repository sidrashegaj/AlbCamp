import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Campground } from '../../models/campground.model';
import { CampgroundService } from '../../services/campground.service';
import * as mapboxgl from 'mapbox-gl'; 
import { environment } from '../../../environments/environment'; 
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-campground-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css'],
  providers: [CampgroundService],
})
export class CampgroundListComponent implements OnInit {
  campgrounds: Campground[] = []; 
  map!: mapboxgl.Map;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private campgroundService: CampgroundService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap(); 
      this.loadCampgrounds(); 
    }
  }
  
  loadCampgrounds(): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.campgroundService.getCampgrounds().subscribe({
        next: (data: Campground[]) => {
          this.campgrounds = data.map(campground => {
            if (!campground.images || campground.images.length === 0) {
              campground.images = [{ url: this.getRandomImageUrl(), filename: 'random-placeholder' }]; 
            }
            return campground;
          });
          
          this.addMarkersToMap(this.campgrounds);
        },
        error: (error: any) => {
          console.error('Error fetching campgrounds', error);
        },
        complete: () => {
          console.log('Completed fetching campgrounds');
        },
      });
    }
  }

  // map
  initializeMap(): void {
    if (isPlatformBrowser(this.platformId)) {
      mapboxgl.default.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [19.8189, 41.3275], //Albania
        zoom:  6,
      });
      this.map.addControl(new mapboxgl.NavigationControl());
    }
  }

  getRandomImageUrl(): string {
    return `https://picsum.photos/400?random=${Math.random()}`; 
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  addMarkersToMap(campgrounds: Campground[]): void {
    if (this.map) {
      campgrounds.forEach(campground => {
        if (campground.geometry && campground.geometry.coordinates) {
          const [longitude, latitude] = campground.geometry.coordinates;

          new mapboxgl.Marker()
            .setLngLat([longitude, latitude]) // Sets marker at campground location
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // Add popups
              .setHTML(`<h3>${campground.name}</h3><p>${campground.location}</p>`))
            .addTo(this.map); // Add marker to the map
        }
      });
    }
}
}
