import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { IbalanceRequest } from '../model/api/balance-request';
import { IcreditRequest } from '../model/api/credit-request';
import { IsyncRequest } from '../model/api/sync.request';
import { IsyncResponse } from '../model/api/sync-response';
import { IcartItem } from '../model/api/cart-item';
import { IbuddyItem } from '../model/buddy-item';
import { IbuyRequest } from '../model/api/buy-request';
import { IbuddyUser } from '../model/buddy-user';
import {
  ADD_PRODUCT,
  API_BALANCE,
  API_ERROR,
  API_ERROR_CLEAN,
  BUY_MSG,
  ADD_CREDIT,
  MSG_NO_BADGE,
  PROFILE_LOGIN,
} from '../model/action-names';

const TERMINAL_ID = 0;

@Injectable()
export class ApiService {

  private BASE_URL: string;
  private syncUrl = 'sync';
  private balanceUrl = 'balance';
  private buyUrl = 'buy';
  private creditUrl = 'credit';

  public main: Observable<any>;
  public products: Observable<any>;
  public profile: Observable<any>;
  private sync_request: IsyncRequest;
  private balance_request: IbalanceRequest;
  private credit_request: IcreditRequest;
  private buy_request: IbuyRequest;
  private badge_key: any;
  private user: IbuddyUser;


  constructor(private _http: Http, private _store: Store<any>) {

    this.BASE_URL = environment.base_url;
    this.main = _store.select('main');
    this.products = _store.select('products');
    this.profile = _store.select('profile');

    this.profile.subscribe((u: IbuddyUser) => {
      if (u && this.user && u.badge !== this.user.badge) {
        this.postBalance(u.badge);
      }
      this.user = u;
    });

    if (!environment.production) {
      this.devSettings();
    }

  }

  // Settings for developement

  private devSettings() {

    this.badge_key = environment.fakeKey;

    this.sync_request = {
      terminal_id: TERMINAL_ID,
    };

    this.buy_request = {
      badge: null,
      cart: null,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
    };

    this.balance_request = {
      badge: null,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
    };

    this.credit_request = {
      badge: null,
      time: environment.fakeTime,
      hash: environment.fakeHash,
      terminal_id: TERMINAL_ID,
      credit: 1000,
    };

    // this.products.subscribe(q => {
    //   console.log('products subscribe ');
    //   console.log(q);
    // });

  }

  public login(badge: string) {
    this._store.dispatch({ type: PROFILE_LOGIN, payload: badge });
  }


  // API calls preparation
  // mock hack for dev at home
  // InMemoryWebApi return a proper response for the post request
  // ours API require a POST instead of a GET

  public sync() {
    if (environment.mock) {
      return this.getSync();
    }
    return this.postSync();
  }


  public postBalance(badge?: any) {

    if (!badge) {
      badge = this.user.badge;
    }

    this.balance_request.badge = badge;

    if (environment.mock) {
      return this.getMessage(this.balanceUrl, this.balance_request, API_BALANCE);
    }
    return this.postMessage(this.balanceUrl, this.balance_request, API_BALANCE);
  }

  public postCredit(amount = 0) {
    if (!this.user || !this.user.badge) {
      return this._store.dispatch({ type: MSG_NO_BADGE, payload: null });
    };

    this.credit_request.badge = this.user.badge;
    this.credit_request.credit = amount * 100;

    if (environment.mock) {
      return this.getMessage(this.creditUrl, this.credit_request, ADD_CREDIT);
    }
    return this.postMessage(this.creditUrl, this.credit_request, ADD_CREDIT);

  }

  // todo: filter IbuddyItems to IcartItem
  public postBuy(items: IbuddyItem[]) {

    if (!this.user || !this.user.badge) {
      return this._store.dispatch({ type: MSG_NO_BADGE, payload: null });
    };

    this.buy_request.badge = this.user.badge;
    this.buy_request.cart = items;

    if (environment.mock) {
      return this.getMessage(this.buyUrl, this.buy_request, BUY_MSG);
    } else {
      return this.postMessage(this.buyUrl, this.buy_request, BUY_MSG);
    }
  }

  // API calls
  private postSync() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      this.BASE_URL + this.syncUrl,
      this.sync_request,
      options)
      .map(res => res.json())
      .map((response: IsyncResponse) => ({ type: ADD_PRODUCT, payload: response.products }))
      .subscribe(
      (action) => this._store.dispatch(action),
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }

  public postMessage(url: string, request: any, actionName: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(
      this.BASE_URL + url,
      request,
      options)
      .map(res => res.json())
      .map((json_resp: any) => ({ type: actionName, payload: json_resp }))
      .subscribe(
      (action) => this._store.dispatch(action),
      error => this._apiErrorHandler(url, error),
      () => console.log('complete: ' + url)
      );
  }


  // Mocked APi Calls

  public getSync() {

    this._http.get(
      this.BASE_URL + this.syncUrl,
      this.sync_request)
      .map(res => res.json().data)
      .map((data: any) => ({ type: ADD_PRODUCT, payload: data }))
      .subscribe(
      (action) => {
        console.log(action);
        return this._store.dispatch(action);
      },
      error => this._apiErrorHandler(this.syncUrl, error),
      () => console.log('complete: ' + this.syncUrl)
      );
  }

  public getMessage(url: string, request: any, actionName: any) {

    this._http.get(
      this.BASE_URL + url,
      request)
      .map(res => res.json().data)
      .map((resp: any) => ({ type: actionName, payload: resp }))
      .subscribe(
      (action) => {
        console.log(action);
        this._store.dispatch(action);
      },
      error => this._apiErrorHandler(url, error),
      () => {
        console.log('complete: ' + url);
        this.sync();
        if (url === this.buyUrl) {
          this.postBalance();
        }
      });

  }

  // ERROR HANDLER
  private _apiErrorHandler(label: string, response) {
    console.log('API ERROR: ' + label);
    console.log(response);
    this._store.dispatch({ type: API_ERROR, payload: { error: label, desc: response } });
  }

  protected dismissError() {
    this._store.dispatch({ type: API_ERROR_CLEAN, payload: null });
  }

}
