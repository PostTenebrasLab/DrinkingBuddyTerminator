import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bdy-buddy-item',
  templateUrl: './buddy-item.component.html',
  styleUrls: ['./buddy-item.component.scss']
})
export class BuddyItemComponent implements OnInit {

  drinkTitle: string = 'Coca-Cola';
  drinkPrice: number = 2;
  
  constructor() { }

  ngOnInit() {
  }



}
