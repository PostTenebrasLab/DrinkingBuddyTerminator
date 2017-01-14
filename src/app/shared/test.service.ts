
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { ADD_PROFILE } from '../model/action-names';

const BASE_URL = 'app/';

@Injectable()
export class TestService {

  private heroesUrl = '../model/test-data.json';

  private profile: Observable<any>;

  constructor(private _http: Http, private _store: Store<any>) {
    this.profile = _store.select('data');
  }

  public testconn() {

    this._http.get('app/heroes')
      .map(res => res.json().data)
      .map(data => ({ type: ADD_PROFILE, payload: data }))
      .subscribe(
      action => this._store.dispatch(action),
      error => this._apiErrorHandler(this.heroesUrl, error),
      () => {
        console.log('loadall: ' + this.heroesUrl);
      });

  }

  // ERROR HANDLER
  private _apiErrorHandler(label: string, response) {
    console.log(label + ' - LOAD ERROR: ');
  }

}
