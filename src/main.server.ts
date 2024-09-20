import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // Provide HttpClient for SSR
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
});

export default bootstrap;
