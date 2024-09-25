import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here for form handling
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../services/flash-message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule] // Add FormsModule here for form handling
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router, private flashMessageService: FlashMessageService) {}

  
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/campgrounds']);  // Redirect to campgrounds after login
      },
      error: (err) => {
        console.error('Login error', err);
        this.flashMessageService.showMessage('Login failed!', 5000);
      }
    });
  }
  
}