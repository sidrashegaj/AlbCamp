import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient  } from '@angular/common/http';  
import { provideRouter } from '@angular/router';
import { AuthGuardService } from './app/services/auth-guard.service';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthGuardService , // Make sure HttpClient is provided
    AuthService
  ],
}).catch(err => console.error(err));
