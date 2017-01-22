import { Component, OnInit, Input } from '@angular/core';

import { IbuddyItem } from '../../../../model/buddy-item';

@Component({
  selector: 'dby-buddy-cart-item',
  templateUrl: './buddy-cart-item.component.html',
  styleUrls: ['./buddy-cart-item.component.scss']
})
export class BuddyCartItemComponent implements OnInit {

  @Input() item: IbuddyItem;

  intPart: string;
  decPart: string;

  constructor() { }

// todo: duplicate code - implement a pipe
  ngOnInit() {
    if (this.item) {
      let pr = this.item.price + '';
      this.decPart = pr.slice(-2);
      this.intPart = pr.slice(0, pr.length - 2);
    }
  }

}
