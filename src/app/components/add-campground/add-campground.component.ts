import { Component, OnInit, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule  } from '@angular/router';
import { CampgroundService } from '../../services/campground.service';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Add isPlatformBrowser and PLATFORM_ID
import { FlashMessageService } from '../../services/flash-message.service';
import { AuthService } from '../../services/auth.service';
import { Campground } from '../../models/campground.model';

@Component({
  selector: 'app-add-campground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import ReactiveFormsModule here
  templateUrl: './add-campground.component.html',
  styleUrls: ['./add-campground.component.css'],
})
export class AddCampgroundComponent implements OnInit {
  @Output() newCampgroundAdded = new EventEmitter<Campground>(); // Output event to emit new campground data
  campgroundForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private campgroundService: CampgroundService,
    private router: Router,
    private authService: AuthService,
    private flashMessageService: FlashMessageService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to detect the platform
  ) {
    this.campgroundForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      images: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Component initialized in the browser');
    }
  }

  canAddOrDelete(): boolean {
    return this.authService.isAuthenticated();
  }

  onFileSelected(event: any): void {
    // Check if this code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files) {
        this.selectedFiles = Array.from(fileInput.files);  
      }
    }
  }
  
  onSubmit(): void {
    // Ensure this code only runs in the browser, as FormData is browser-specific
    if (isPlatformBrowser(this.platformId)) {
      const formData = new FormData();
      formData.append('title', this.campgroundForm.value.title);
      formData.append('location', this.campgroundForm.value.location);
      formData.append('price', this.campgroundForm.value.price.toString());
      formData.append('description', this.campgroundForm.value.description);

      this.selectedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });

      this.campgroundService.addCampground(formData).subscribe({
        next: (res) => {
          this.flashMessageService.showMessage('Campground added successfully!', 5000);
          this.newCampgroundAdded.emit(res); // Emit the newly added campground
          this.router.navigate([`/campgrounds${res.campgroundId}`]);  
        },
        error: (err) => {
          console.error('Error adding campground', err);
          this.flashMessageService.showMessage('Failed to add campground!', 5000);
        }
      });
    }
  }
}
