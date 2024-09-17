import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule  } from '@angular/router';
import { CampgroundService } from '../../services/campground.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-campground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import ReactiveFormsModule here
  templateUrl: './add-campground.component.html',
  styleUrls: ['./add-campground.component.css'],
})
export class AddCampgroundComponent {
  campgroundForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private campgroundService: CampgroundService,
    private router: Router
  ) {
    this.campgroundForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      images: ['', Validators.required],
    });
  }
  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.selectedFiles = Array.from(fileInput.files);  // Ensure files are captured properly
    }
  }
  
  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.campgroundForm.value.title);
    formData.append('location', this.campgroundForm.value.location);
    formData.append('price', this.campgroundForm.value.price.toString());
    formData.append('description', this.campgroundForm.value.description);
  
    // Ensure the images are correctly appended
    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });
  
    this.campgroundService.addCampground(formData).subscribe({
      next: (res) => {
        console.log('Campground added successfully', res);
        this.router.navigate(['/campgrounds']);
      },
      error: (err) => {
        console.error('Error adding campground', err);
      },
    });
  }
}  