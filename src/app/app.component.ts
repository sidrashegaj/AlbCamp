import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';  // Import the standalone NavbarComponent
import { FooterComponent } from './components/footer/footer.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FlashMessageComponent],  // Use NavbarModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   *
   */
  constructor(private authService: AuthService) {
    
  }
  ngOnInit(): void {
    // This will ensure the user stays logged in if there's a valid token in localStorage
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      console.log('User is already logged in:', currentUser);
    } else {
      console.log('No user is logged in.');
    }
  }
  title = 'AlbCamp';
}