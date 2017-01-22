import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'dby-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: string;
  sold: string;
  decimal: string;

  constructor(private _srv: ApiService) { }

  ngOnInit() {
    this._srv.profile.subscribe((o: any) => {
      if (o.credit) {
        let cr = o.credit + '';
        this.decimal = cr.slice(-2);
        this.sold = cr.slice(0, cr.length - 2);
      }
      this.userName = o.name ? o.name : '';
    });
  }

}
