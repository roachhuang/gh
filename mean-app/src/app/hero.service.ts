import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';

import * as Hero from './hero';
// import { Data } from './mock-data';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:3000/prods/hero';
    constructor(private http: Http) { }

/*
    getHeroes(): Promise<Hero[]> {
        let HEROES = Data.createRandomCatalog(5);
        return Promise.resolve(HEROES);
    }
*/
    // Each Http service method returns an Observable of HTTP Response objects.
    getHero(id: string): Observable<Hero.R> {
        return this.http
            .get(`${this.heroesUrl}/${id}`)
            // .filter(hero => hero.id === id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getHeroes(): Observable<Hero.R[]> {
        return this.http
            .get(this.heroesUrl)
            // chain map method to extract heroes from the response data
            .map((res: Response) => res.json())
            // .map(this.extractData)
            .catch(this.handleError);
    }

    // tslint:disable-next-line:member-ordering
    private headers = new Headers({ 'Content-Type': 'application/json' });

    update(hero: any): Observable<any> {
        const url = `${this.heroesUrl}/${hero._id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .map(res => res.json().data);
    }

    create(hero: Hero.W): Observable<Hero.W> {
        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), { headers: this.headers })
            .map(res => res.json().data);
    }

    delete(id: number): Observable<Response> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            // boolean
            .map(res => res.json().ok);
    }

    private extractData(res: Response) {
        // The response data are in JSON string form. The app must parse that string into JavaScript objects by calling response.json().
        const body = res.json();
        // console.dir(body.data);
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}


    /*
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }
    */

