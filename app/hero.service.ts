import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';
  private headers = new Headers({ 'ContentType': 'application/json' });

  constructor(private http: Http){}

  getHeroes(){
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number){
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  delete(hero: Hero){
    let url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  save(hero: Hero): Promise<Hero> {
    if(hero.id){
      return this.put(hero);
    } else {
      return this.post(hero);
    }
  }

  private post(hero: Hero): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private put(hero: Hero){
    let url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any){
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
