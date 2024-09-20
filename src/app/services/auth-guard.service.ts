import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FlashMessageComponent } from '../components/flash-message/flash-message.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private flashMessageService:FlashMessageComponent) { }

  canActivate(): boolean {
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }


  isLoggedIn():boolean{
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.flashMessageService.showMessage('You need to be logged in to contiune')
    return false;
  }
}
