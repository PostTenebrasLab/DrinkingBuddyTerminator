import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { IbuddyItem } from '../../model/buddy-item';

@Component({
  selector: 'dby-buddy-store',
  templateUrl: './buddy-store.component.html',
  styleUrls: ['./buddy-store.component.scss']
})
export class BuddyStoreComponent implements OnInit {

  @Input() products: IbuddyItem[];

  constructor(private _srv: ApiService) { }

  ngOnInit() {
  }

  log() {
    console.log(this.products);
  }

}
