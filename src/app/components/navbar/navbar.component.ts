import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';  // Make sure the path is correct
import { Router, RouterModule } from '@angular/router';  // Import RouterModule for routing
import { CommonModule } from '@angular/common';  // Import CommonModule for basic Angular directives like *ngIf

@Component({
  selector: 'app-navbar',
  standalone: true,  // This makes it a standalone component
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule]  // Add RouterModule and CommonModule here
})
export class NavbarComponent  {
  isLoggedIn: boolean = false;

  constructor( private router: Router) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // ngOnInit(): void {
  //   this.isLoggedIn = this.authService.isLoggedIn();  // Check if the user is logged in
  // }

  onLogout(): void {
    // this.authService.logout();  // Remove token and log out the user
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
