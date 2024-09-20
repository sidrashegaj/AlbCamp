import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
private messageSource= new BehaviorSubject<string | null>(null);
currentMessage= this.messageSource.asObservable();
  constructor() { }
  showMessage(message: string, timeout: number = 3000) {
    this.messageSource.next(message);
    setTimeout(() => {
      this.clearMessage();
    }, timeout);
  }
  clearMessage() {
    this.messageSource.next(null);
  }
}
