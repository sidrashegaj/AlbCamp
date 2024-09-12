

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { CampgroundListComponent } from './app/components/campground-list/campground-list.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campgrounds', component: CampgroundListComponent },
  { path: '', redirectTo: '/campgrounds', pathMatch: 'full' },
  { path: '**', redirectTo: '/campgrounds' } // Wildcard route for any undefined paths
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // To enable HTTP requests in services
  ]
}).catch(err => console.error(err));

