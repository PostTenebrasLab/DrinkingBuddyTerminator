import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { mykey } from './local.conf';
import { IbalanceResponse } from '../model/api/balance-response';
import { IbalanceRequest } from '../model/api/balance-request';
import { IcreditRequest } from '../model/api/credit-request';
import { IsyncRequest } from '../model/api/sync.request';
import { IsyncResponse } from '../model/api/sync-response';
import { IcartItem } from '../model/api/cart-item';
import {
  ADD_PRODUCT,
  ADD_PROFILE,
  API_ERROR,
  API_ERROR_CLEAN,
  BUY_MSG,
  ADD_CREDIT,
} from '../model/action-names';

// const BASE_URL = 'app/';
// const BASE_URL = 'http://10.10.20.45:5000/';
// const BASE_URL = 'http://10.42.65.20:5000/';
const BASE_URL = 'http://ptlpi:5000/';
const TERMINAL_ID = 0;

@Injectable()
export class ApiService {

  private syncUrl = 'sync';
  private balanceUrl = 'balance';
  private buyUrl = 'buy';
  private creditUrl = 'credit';

  private fakeTime = 123456789;
  private fakeHash = '587a6b195d845c190261d6ab';

  public main: Observable<any>;
  private products: Observable<any>;
  private profile: Observable<any>;
  private sync_request: IsyncRequest;
  private balance_request: IbalanceRequest;
  private credit_request: IcreditRequest;

  constructor(private _http: Http, private _store: Store<any>) {

    this.main = _store.select('main');
    this.products = _store.select('products');
    this.profile = _store.select('profile');

    this.sync_request = {
      terminal_id: TERMINAL_ID,
    };

    this.balance_request = {
      badge: mykey,
      time: this.fakeTime,
      hash: this.fakeHash,
      terminal_id: TERMINAL_ID,
    };

    this.credit_request = {
      badge: mykey,
      time: this.fakeTime,
      hash: this.fakeHash,
      terminal_id: TERMINAL_ID,
      credit: 1000,
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
    this.postMessage(this.balanceUrl, this.balance_request, ADD_PROFILE);
  }

  public postCredit() {
    this.postMessage(this.creditUrl, this.credit_request, ADD_CREDIT);
  }

  public postBuy(items: IcartItem[]) {
    let request = {
      badge: mykey,
      cart: items,
      time: this.fakeTime,
      hash: this.fakeHash,
      terminal_id: TERMINAL_ID,
    };
    this.postMessage(this.buyUrl, request, BUY_MSG);
  }

  public postMessage(url: string, request: any, actionName: any) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      BASE_URL + url,
      request,
      options)
      .map(res => res.json())
      .map((response: IbalanceResponse) => ({ type: actionName, payload: response }))
      .subscribe(
      (action) => {
        console.log(action);
        return this._store.dispatch(action);
      },
      error => this._apiErrorHandler(url, error),
      () => console.log('complete: ' + url)
      );
  }

  // ERROR HANDLER
  private _apiErrorHandler(label: string, response) {
    console.log('API ERROR: ' + label);
    console.log(response);
    this._store.dispatch({ type: API_ERROR, payload: { label: label, msg: response } });
  }

  protected dismissError() {
    this._store.dispatch({ type: API_ERROR_CLEAN, payload: null });
  }

}
