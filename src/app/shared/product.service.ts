import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {

  public products: Observable<any>;
  public profile: Observable<any>;
  public cart: Observable<any>;

  constructor( private _store: Store<any>) {
    this.products = _store.select('products');
    this.profile = _store.select('profile');
    this.cart = _store.select('cart');
  }
  
}
