import { Component, OnInit, Input } from '@angular/core';

import { IbuddyItem } from 'app/model/buddy-item';


@Component({
  selector: 'dby-buddy-item',
  templateUrl: './buddy-item.component.html',
  styleUrls: ['./buddy-item.component.scss']
})
export class BuddyItemComponent implements OnInit {

  @Input() item: IbuddyItem;

  intPart: string;
  decPart: string;

  constructor() { }

  ngOnInit() {
    if (this.item) {
      let pr = this.item.price + '';
      this.decPart = pr.slice(-2);
      this.intPart = pr.slice(0, pr.length - 2);
    }
  }

}
