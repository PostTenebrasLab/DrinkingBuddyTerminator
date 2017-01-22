
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'dby-buddy-sidebar',
  templateUrl: './buddy-sidebar.component.html',
  styleUrls: ['./buddy-sidebar.component.scss']
})
export class BuddySidebarComponent implements OnInit {

  addMoneyIsVisible: boolean;

  constructor(private _srv: ApiService) {
    this.addMoneyIsVisible = false;
  }

  ngOnInit() { }

  toggleMoneyPanel() {
    this.addMoneyIsVisible = !this.addMoneyIsVisible;
  }

  cancelAction() {
    if (this.addMoneyIsVisible = true) {
      this.addMoneyIsVisible = false;
    }
  }


  private addMoney(amount: number) {
    this._srv.postCredit(amount);
  }


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
