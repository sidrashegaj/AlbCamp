import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Import RouterModule for routing
import { CommonModule } from '@angular/common';  // Import CommonModule for basic Angular directives like *ngIf
import { FlashMessageService } from '../../services/flash-message.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,  // This makes it a standalone component
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule]  // Add RouterModule and CommonModule here
})
export class NavbarComponent  {
  isLoggedIn: boolean = false;

  constructor( private flashMessageSercie: FlashMessageService, private router: Router, private authService: AuthService,) {

  }

  onNewCampgroundClick(){
      this.router.navigate(['/campgrounds/new']);
    
  }
 

  onLogout(): void {
    this.router.navigate(['/campgrounds']);  // Redirect to login page
  }
  
}
