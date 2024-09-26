import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampgroundListComponent } from './components/campground-list/campground-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CampgroundDetailComponent } from './components/campground-detail/campground-detail.component';
import { AddCampgroundComponent } from './components/add-campground/add-campground.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditCampgroundComponent } from './components/edit-campground/edit-campground.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campgrounds', component: CampgroundListComponent },
  { path: 'campgrounds/new', component: AddCampgroundComponent,canActivate: [AuthGuardService]}, 
  { path: 'campgrounds/:id', component: CampgroundDetailComponent },
  { path: 'campgrounds/:id/edit', component: EditCampgroundComponent },
  { path: '**', redirectTo: '/campgrounds' },
 
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }