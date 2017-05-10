import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PostsComponent } from '../posts/posts.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from '../heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
