import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import * as Hero from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero.R;
  errorMessage: string;
  hero: Hero.R;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    // The hero id is a number. Route parameters are always strings.
    // So the route parameter value is converted to a number with the JavaScript (+) operator.
      this.route.params
      .switchMap((params: Params) => this.heroService.getHero(params['id']))
      .subscribe(hero => this.hero = hero,
      error => this.errorMessage = <any>error);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(() => this.goBack());
  }
}
