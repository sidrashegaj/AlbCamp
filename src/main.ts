import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth-interceptor.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthGuardService } from './app/services/auth-guard.service';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, {

  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    AuthGuardService , // Make sure HttpClient is provided
    AuthService
  ]
}).catch(err => console.error(err));
