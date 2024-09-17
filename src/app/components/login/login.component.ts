import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here for form handling
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule] // Add FormsModule here for form handling
})
export class LoginComponent {
  username: string = '';
  password: string = '';

constructor( private authService: AuthService, private router: Router){}
  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Assuming your backend returns a JWT token
        this.authService.setToken(res.token);  // Store the token
        this.router.navigate(['/campgrounds']);  // Redirect after successful login
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
}
}

