import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';  // Import CommonModule for basic Angular directives like *ngIf
import { FlashMessageService } from '../../services/flash-message.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessageComponent } from '../flash-message/flash-message.component';  // Import FlashMessageComponent

@Component({
  selector: 'app-navbar',
  standalone: true,  // This makes it a standalone component
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]  // Add CommonModule here
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  flashMessage: string | null=null;
  username: string | null = null; 

  constructor(
    private flashMessageService: FlashMessageService,  // Fix typo in FlashMessageService
    private router: Router,
    public authService: AuthService  // Make authService public to use it in the template
  ) {}
  ngOnInit(): void {
    // Subscribe to flash message updates
    this.flashMessageService.currentMessage.subscribe((message) => {
      this.flashMessage = message;  // Update flashMessage property
    });
    if (this.authService.isAuthenticated()) {
      this.username = this.authService.getUsername();  // Get username
    }
  }

  // When "New Campground" is clicked
  onNewCampgroundClick() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/campgrounds/new']);
    } else {
      if (!this.flashMessage) {
        // Show the flash message only if it hasn't been shown yet
        this.flashMessageService.showMessage('You need to be logged in to add a new campground!', 5000);
      }
    }
  }

  onLogo(): void{
    this.router.navigate(['/']);
  }
  onAll(): void{
    this.router.navigate(['/campgrounds']);
  }
  

  onLogout(): void {
    this.authService.logout();  // Log out the user
    this.router.navigate(['/campgrounds']);  // Redirect to campgrounds after logging out
  }
  onLoginClick(): void {
    this.router.navigate(['/login']);  // Navigate to the login page
  }

  // Register Method
  onRegisterClick(): void {
    this.router.navigate(['/register']);  // Navigate to the register page
  }
}
