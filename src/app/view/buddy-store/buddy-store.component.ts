import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dby-buddy-store',
  templateUrl: './buddy-store.component.html',
  styleUrls: ['./buddy-store.component.scss']
})
export class BuddyStoreComponent implements OnInit {

  @Input() profile: any;

  constructor() { }

  ngOnInit() {
  }

}
