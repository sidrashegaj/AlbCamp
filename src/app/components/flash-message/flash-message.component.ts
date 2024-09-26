import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FlashMessageService } from '../../services/flash-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css'],
})
export class FlashMessageComponent {
  message: string | null = null;

  constructor(private flashMessageService: FlashMessageService, private router: Router,) {}

  ngOnInit(): void {
    this.flashMessageService.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }
  onLoginClick(): void {
    this.router.navigate(['/login']); 
  }
}
