import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../services/flash-message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router, private flashMessageService: FlashMessageService) {}

  
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/campgrounds']); 
      },
      error: (err) => {
        console.error('Login error', err);
        this.flashMessageService.showMessage('Login failed!', 5000);
      }
    });
  }
  
}