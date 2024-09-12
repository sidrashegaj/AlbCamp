import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampgroundListComponent } from './components/campground-list/campground-list.component';

export const routes: Routes = [
    { path: 'campgrounds', component: CampgroundListComponent },
    { path: '', redirectTo: '/campgrounds', pathMatch: 'full' }, // Redirect to default route

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

