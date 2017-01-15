import { Component, OnInit, Input } from '@angular/core';
import { IbuddyItem } from 'app/model/buddy-item'

@Component({
  selector: 'bdy-buddy-item',
  templateUrl: './buddy-item.component.html',
  styleUrls: ['./buddy-item.component.scss']
})
export class BuddyItemComponent implements OnInit {
  
  @Input() products: IbuddyItem[];
  
  constructor() { }

  ngOnInit() {
  }



}
