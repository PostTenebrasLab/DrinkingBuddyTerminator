import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiService } from '../../../shared/api.service';
import { IbuddyItem } from '../../../model/buddy-item';
import {
  REMOVE_FROM_CART,
  EMPTY_CART,
} from '../../../model/action-names';

@Component({
  selector: 'dby-buddy-cart',
  templateUrl: './buddy-cart.component.html',
  styleUrls: ['./buddy-cart.component.scss']
})
export class BuddyCartComponent implements OnInit {

  private cart: IbuddyItem[];
  private total: any;

  constructor(private _srv: ApiService, private _store: Store<any>) {
    this.total = {
      price: 0,
      quantity: 0,
    };
  }

  ngOnInit() {
    this._srv.products.subscribe((o: any) => {
      console.log('subscribe');
      this.cart = o.cart;
      let totAmount = 0;
      let totQty = 0;
      o.cart.map((item) => {
        totAmount += (item.price * item.quantity);
        totQty += item.quantity;
      });
      this.total = {
        price: totAmount,
        quantity: totQty,
      };

    });
  }

  private removeFromCart(item) {
    this._store.dispatch({ type: REMOVE_FROM_CART, payload: item });
  }

  log() {
    console.log(this.total);
  }

  buyAction() {
    console.log('buyAction');

    this._srv.postBuy(this.cart);
  }

  cancelAction() {
    console.log('cancelAction');
    this._store.dispatch({ type: EMPTY_CART, payload: null });
    this._srv.sync();
  }

}
