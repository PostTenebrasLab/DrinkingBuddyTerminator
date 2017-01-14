import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { IsyncResponse } from '../../model/api/sync-response';
import { ADD_PRODUCT } from '../../model/action-names';

// const BASE_URL = 'app/';
const BASE_URL = 'http://10.10.20.45:5000/';


@Injectable()
export class ApitestService {

  private syncUrl = 'sync';
  private products: Observable<any>;

  constructor(private _http: Http, private _store: Store<any>) {
    this.products = _store.select('products');

    this.products.subscribe((s) => {
      console.log('SYNC');

      console.log(s);
    });

  }

  public getSync() {

    let test_data = {
      TID: 0,
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      BASE_URL + this.syncUrl,
      test_data,
      options)
      .map(res => res.json())
      .map((response: IsyncResponse) => ({ type: ADD_PRODUCT, payload: response.Products }))
      .subscribe(
      (action) => {
        console.log(action);
        return this._store.dispatch(action);
      },
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }

  // ERROR HANDLER
  private _apiErrorHandler(label: string, response) {
    console.log(label + ' - LOAD ERROR: ');
    console.log(response);
  }


}
