import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampgroundListComponent } from './components/campground-list/campground-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CampgroundDetailComponent } from './components/campground-detail/campground-detail.component';
import { AddCampgroundComponent } from './components/add-campground/add-campground.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campgrounds', component: CampgroundListComponent },
  { path: 'campgrounds/new', component: AddCampgroundComponent, canActivate: [AuthGuard] }, 
  { path: 'campgrounds/:id', component: CampgroundDetailComponent },
  { path: '', redirectTo: '/campgrounds', pathMatch: 'full' },
  { path: '**', redirectTo: '/campgrounds' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }