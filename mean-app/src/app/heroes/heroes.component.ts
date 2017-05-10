import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';

import * as Hero from '../hero';
import { HeroService } from '../hero.service';
import * as gg from '../mock-data';

@Component({
  selector: 'app-hero',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  errorMessage: string;
  heroes: Hero.R[];
  // formGroup contains FormControl
  heroForm: FormGroup;
  // formError _messages: { [id: string]:}
  selectedHero: Hero.R;

  constructor(private _fb: FormBuilder, private router: Router, private heroService: HeroService) {
    this.createForm();
  };

  createForm() {
    this.heroForm = this._fb.group({
      id: '',
      type: '',
      name: '',
      price: '',
      imgUrl: ''
    });
    // to set all value use setvalue method.
    this.heroForm.patchValue({
      imgUrl: 'http://lorempixel.com/400/200',
    })
  }

  onSubmit() {
    this.add(this.heroForm.value);
  }

  ngOnInit() {
    /* create mock data, To remove the collection: db.prods.drop
    let mockData: Hero.W[];
    mockData = gg.createRandomCatalog(6);
    for (const hero of mockData) {
      this.add(hero);
    }
    */
    this.getHeroes();
  }

  onSelect(hero: any) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(
      heroes => this.heroes = heroes,
      error => this.errorMessage = <any>error);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero._id]);
  }

  add(hero: Hero.W): void {
    // name = name.trim();
    if (!hero) { return; }
    this.heroService.create(hero)
      .subscribe(
      res => this.selectedHero = null,
      error => this.errorMessage = <any>error);
  }

  delete(hero: Hero.R): void {
    this.heroService.delete(hero.id)
      .subscribe(
      // res => this.heroes = heroes,
      error => this.errorMessage = <any>error);
    /*
    .then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) { this.selectedHero = null; }
    });
    */
  }
}



