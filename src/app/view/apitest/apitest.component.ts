import { Component, OnInit } from '@angular/core';

import { IcartItem } from '../../model/api/cart-item';
import { ApiService } from '../../shared/api.service';
// import { IerrorMsg } from '../../model/error-msg';

@Component({
  selector: 'dby-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.css']
})
export class ApitestComponent implements OnInit {

  constructor(private _srv: ApiService) { }

  ngOnInit() { }

  buy() {

    console.log('buy');

    // let fakeCart: IcartItem[] = [
    let fakeCart: any[] = [
      {
        product_id: 1,
        quantity: 1,
      }, {
        product_id: 6,
        quantity: 1,
      },
    ];

    this._srv.postBuy(fakeCart);

  }
}
