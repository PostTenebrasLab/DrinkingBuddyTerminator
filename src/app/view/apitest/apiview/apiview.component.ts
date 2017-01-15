import { Component, OnInit, Input } from '@angular/core';

import { IcartItem } from '../../../model/api/cart-item';
import { IbuddyItem } from '../../../model/buddy-item';
import { ImessageBalance } from '../../../model/api/message-balance';

@Component({
  selector: 'dby-apiview',
  templateUrl: './apiview.component.html',
  styleUrls: ['./apiview.component.css']
})
export class ApiviewComponent implements OnInit {

  @Input() products: IbuddyItem[];
  @Input() profile: ImessageBalance;

  constructor() { }

  ngOnInit() {
  }

}
