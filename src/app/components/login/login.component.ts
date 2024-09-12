import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule] // Add FormsModule here for form functionality
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/campgrounds']); // Navigate after login
      },
      error: (err) => {
        console.error('Login failed', err);
      },
      complete: () => {
        console.log('Login request complete');
      }
    });
    
  }
}
