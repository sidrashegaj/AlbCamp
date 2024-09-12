import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Campground } from '../../models/campground.model';
import { CampgroundService } from '../../services/campground.service';

@Component({
  selector: 'app-campground-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css'],
  providers: [CampgroundService]
})
export class CampgroundListComponent implements OnInit {
  campgrounds: Campground[] = []; // Initialize as empty array

  constructor(private campgroundService: CampgroundService) { }

  ngOnInit(): void {
    this.campgroundService.getCampgrounds().subscribe({
      next: (data: Campground[]) => {
        this.campgrounds = data;
      },
      error: (error: any) => {
        console.error('Error fetching campgrounds', error);
      },
      complete: () => {
        console.log('Completed fetching campgrounds');
      }
    });
    
  }

  getRandomImageUrl(): string {
    return `https://picsum.photos/400?random=${Math.random()}`;
  }
}
