import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- Add FormsModule here
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
authService: any;

  constructor(private router: Router) {}

  onSearch() {
    
      this.router.navigate(['/campgrounds']);
    
  }
}
