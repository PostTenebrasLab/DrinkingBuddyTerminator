import { Component, OnInit, Input } from '@angular/core';

import { IbuddyItem } from '../../../model/buddy-item';

@Component({
  selector: 'dby-apiview',
  templateUrl: './apiview.component.html',
  styleUrls: ['./apiview.component.css']
})
export class ApiviewComponent implements OnInit {

  @Input() products: IbuddyItem[];

  constructor() { }

  ngOnInit() {
  }

}
