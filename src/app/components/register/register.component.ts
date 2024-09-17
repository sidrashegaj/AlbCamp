import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
// import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule] // Add FormsModule here for form functionality
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor( private router: Router) {

//  onRegister() {

//  }
}}
//   this.authService.register(
//     this.username, this.email, this.password
//   ).subscribe({
//     next: (res: any) => {
//       this.router.navigate(['/login']); // Navigate to login after registration
//     },
//     error: (err) => {
//       console.error('Registration failed', err);
//     },
//     complete: () => {
//       console.log('Registration request complete');
//     }
//   });
// }
// }
