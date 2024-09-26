import { Component } from '@angular/core';
import { CampgroundService } from '../services/campground.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IndexComponent {
  searchQuery: string = '';
  campgrounds: any[] = [];
  noResultsFound: boolean = false;

  constructor(private campgroundService: CampgroundService, private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.campgroundService.searchCampgrounds(this.searchQuery).subscribe({
        next: (results) => {
          this.campgrounds = results;
          this.noResultsFound = results.length === 0;
        },
        error: (err) => {
          console.error('Error searching campgrounds: ', err);
          this.noResultsFound = true;
        }
      });
    }
  }

  navigateToCampgrounds(campgroundId: number): void {
    this.router.navigate(['/campgrounds', campgroundId]);  // to the detail page
  }

  navigateToAllCampgrounds(): void {
    this.router.navigate(['/campgrounds']); 
  }
}
