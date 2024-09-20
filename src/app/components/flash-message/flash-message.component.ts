import { Component } from '@angular/core';
import { FlashMessageService } from '../../services/flash-message.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf


@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-message.component.html',
  styleUrl: './flash-message.component.css'
})
export class FlashMessageComponent {
  showMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  message: string | null = null;
  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit(): void {
    this.flashMessageService.currentMessage.subscribe(
      (message) => (this.message = message)
    );

}
}
