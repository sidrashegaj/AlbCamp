import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


import { AppComponent } from './app/app.component';
import { CampgroundListComponent } from './app/components/campground-list/campground-list.component';

const routes: Route[] = [
  { path: 'campgrounds', component: CampgroundListComponent },
  { path: '', redirectTo: '/campgrounds', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Provides HttpClient
  ],
}).catch(err => console.error(err));
