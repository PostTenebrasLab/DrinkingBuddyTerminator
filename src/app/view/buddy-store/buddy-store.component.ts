import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiService } from '../../shared/api.service';
import { IbuddyItem } from '../../model/buddy-item';

import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART,
} from '../../model/action-names';

@Component({
  selector: 'dby-buddy-store',
  templateUrl: './buddy-store.component.html',
  styleUrls: ['./buddy-store.component.scss']
})
export class BuddyStoreComponent implements OnInit {

  @Input() products: IbuddyItem[];

  constructor(private _srv: ApiService, private _store: Store<any>) { }

  ngOnInit() {
  }

  log() {
    console.log(this.products);
  }

  private addToCart(item: IbuddyItem) {
    console.log(item);
    if (item.quantity < 1) {
      this._store.dispatch({ type: ADD_TO_CART_ERROR, payload: null });
    } else {
      this._store.dispatch({ type: ADD_TO_CART, payload: item });
    }
  }
}
