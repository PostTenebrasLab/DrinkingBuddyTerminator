import { IbuddyUser } from '../../../model/buddy-user';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { ApiService } from '../../../shared/api.service';

import {
  PROFILE_LOGOFF,
  EMPTY_CART,
} from '../../../model/action-names';

@Component({
  selector: 'dby-buddy-logo',
  templateUrl: './buddy-logo.component.html',
  styleUrls: ['./buddy-logo.component.scss']
})
export class BuddyLogoComponent implements OnInit {

  private buddyTime: any;
  private lastSync: any;
  private lastAction: any;
  private user: any;

  public main: Observable<any>;
  public products: Observable<any>;
  public profile: Observable<any>;

  constructor(private _srv: ApiService, private _store: Store<any>) {

    this.products = _store.select('products');
    this.profile = _store.select('profile');

    this.profile.subscribe((u: IbuddyUser) => {
      this.lastAction = moment();
      this.lastSync = moment();
      this.user = u;
      console.log('logo - profile subscribe');
      console.log(this.lastAction);
    });

    this.products.subscribe((p: any) => {
      if (p.time) {
        this.lastAction = p.time;
      }
      this.lastSync = moment();
    });

  }

  ngOnInit() {
    setInterval(() => {
      const now = moment();
      this.buddyTime = now.format('D MMMM YYYY HH:mm:ss');
      const deltaAction = now.diff(this.lastAction);
      const deltaSync = now.diff(this.lastSync);
      console.log(deltaAction);
      if (deltaSync > 15000) {
        this._srv.sync();
        this.lastSync = now;
      }
      if (deltaAction > 30000 && this.user.badge) {
        this._store.dispatch({ type: EMPTY_CART, payload: null });
        this._store.dispatch({ type: PROFILE_LOGOFF, payload: null });
      }

    }, 3000);
  }

}
