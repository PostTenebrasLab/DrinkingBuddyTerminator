import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { mykey } from './local.conf';
import { IbalanceResponse } from '../model/api/balance-response';
import { IbalanceRequest } from '../model/api/balance-request';
import { IsyncRequest } from '../model/api/sync.request';
import { IsyncResponse } from '../model/api/sync-response';
import {
  ADD_PRODUCT,
  ADD_PROFILE,
  API_ERROR,
  API_ERROR_CLEAN,
} from '../model/action-names';

// const BASE_URL = 'app/';
const BASE_URL = 'http://10.10.20.45:5000/';
const TERMINAL_ID = 0;

@Injectable()
export class ApiService {

  private syncUrl = 'sync';
  private balanceUrl = 'balance';
  public main: Observable<any>;
  private products: Observable<any>;
  private profile: Observable<any>;
  private sync_request: IsyncRequest;
  private balance_request: IbalanceRequest;

  constructor(private _http: Http, private _store: Store<any>) {

    this.main = _store.select('main');
    this.products = _store.select('products');
    this.profile = _store.select('profile');

    this.sync_request = {
      terminal_id: TERMINAL_ID,
    };

    this.balance_request = {
      badge: mykey,
      time: 123456789,
      hash: '587a6b195d845c190261d6ab',
      terminal_id: TERMINAL_ID,
    };

  }

  public postSync() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      BASE_URL + this.syncUrl,
      this.sync_request,
      options)
      .map(res => res.json())
      .map((response: IsyncResponse) => ({ type: ADD_PRODUCT, payload: response.products }))
      .subscribe(
      (action) => {
        console.log(action);
        return this._store.dispatch(action);
      },
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }

  public postBalance() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      BASE_URL + this.balanceUrl,
      this.balance_request,
      options)
      .map(res => res.json())
      .map((response: IbalanceResponse) => ({ type: ADD_PROFILE, payload: response.message }))
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

    this._store.dispatch({ type: API_ERROR, payload: {label: label, msg: response} });
  }

  protected dismissError(){
    this._store.dispatch({ type: API_ERROR_CLEAN, payload: null });
  }

}
