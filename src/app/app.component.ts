import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';  // Import the standalone NavbarComponent
import { FooterComponent } from './components/footer/footer.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
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
  constructor() {
    
  }
  ngOnInit(): void {
  }
  title = 'YelpCampFrontend';
}
