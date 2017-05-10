import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // <-- #2 add to Angular module imports
    HttpModule,
    AppRoutingModule,
  ],
  providers: [PostsService, HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
