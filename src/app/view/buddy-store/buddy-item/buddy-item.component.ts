import { Component, OnInit, Input } from '@angular/core';

import { IbuddyItem } from '../../../model/buddy-item';

@Component({
  selector: 'bdy-buddy-item',
  templateUrl: './buddy-item.component.html',
  styleUrls: ['./buddy-item.component.scss']
})
export class BuddyItemComponent implements OnInit {

  @Input() products: IbuddyItem[];

  drinkTitle: string = 'Coca-Cola';
  drinkPrice: number = 2;

  constructor() { }

  ngOnInit() {
  }



}
