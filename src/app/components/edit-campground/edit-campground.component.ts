import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { CampgroundService } from '../../services/campground.service';
import { FlashMessageService } from '../../services/flash-message.service';
import { Campground } from '../../models/campground.model';

@Component({
  selector: 'app-edit-campground',
  standalone: true,
  templateUrl: './edit-campground.component.html',
  styleUrls: ['./edit-campground.component.css'],
  imports: [CommonModule, FormsModule, RouterModule], // <-- Add FormsModule, RouterModule, and CommonModule to the imports
})
export class EditCampgroundComponent implements OnInit {
  campgroundId!: number;
  campground: Campground = {
    title: '',
    location: '',
    price: 0,
    description: '',
    images: [],
    name: undefined,
    campgroundId: 0,
    author: {
      _id: 0,
      username: '',
    },
    geometry: {
      coordinates: [],
    },
  };
  deleteImages: string[] = [];
  selectedImages: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private campgroundService: CampgroundService,
    private router: Router,
    private flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.campgroundId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCampgroundDetails();
  }

  loadCampgroundDetails(): void {
    this.campgroundService.getCampground(this.campgroundId).subscribe((campground) => {
      this.campground = campground;
      // Ensure you save only the filenames (PublicId) for deletion
      this.deleteImages = this.campground.images.map((img) => img.filename); // Save filenames for deletion
    });
  }

  onImageSelected(event: any): void {
    this.selectedImages = event.target.files;
  }

  onSubmit(): void {
    const formData = new FormData();
  
    // Ensure you use the correct field name that matches your backend
    formData.append('name', this.campground.title); // Use 'name' if backend expects 'Name'
    formData.append('location', this.campground.location);
    formData.append('price', this.campground.price.toString());
    formData.append('description', this.campground.description);
  
    // Add selected new images to form data
    for (let file of this.selectedImages) {
      formData.append('images', file); // Add new images
    }
  
    // Ensure existing images are included in form data unless deleted
    this.campground.images.forEach((img) => {
      if (!this.deleteImages.includes(img.filename)) {
        formData.append('existingImages[]', img.filename); // Add existing images that are not deleted
      }
    });
  
    // Handle deleteImages field for images marked for deletion
    if (this.deleteImages.length > 0) {
      for (let filename of this.deleteImages) {
        formData.append('deleteImages[]', filename); // Send filenames (PublicId) for deletion
      }
    } else {
      formData.append('deleteImages[]', ''); // Send empty if no images for deletion
    }
  
    // Call the service to update the campground
    this.campgroundService.updateCampground(this.campgroundId, formData).subscribe({
      next: () => {
        this.flashMessageService.showMessage('Campground updated successfully!', 5000);
        this.router.navigate(['/campgrounds']); // Redirect after update
      },
      error: (err) => {
        console.error('Error updating campground', err);
        this.flashMessageService.showMessage('Cannot update other users campgrounds!', 5000);
      },
    });
  }
  
  
}
