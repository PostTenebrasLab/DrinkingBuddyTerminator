import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { IbuddyUser } from '../../../model/buddy-user';
import { ApiService } from '../../../shared/api.service';

import {
  PROFILE_LOGOFF,
  EMPTY_CART,
} from '../../../model/action-names';

@Component({
  selector: 'dby-buddy-logo',
  templateUrl: './buddy-logo.component.html',
  styleUrls: ['./buddy-logo.component.scss'],
  animations: [
    trigger('buddyPulse', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out'))
    ]),
    trigger('buddySpin', [
      state('yes', style({
        transform: 'rotate(-360deg)'
      })),
      transition('* => *', animate('1000ms'))
    ])
  ]
})
export class BuddyLogoComponent implements OnInit {

  private static lastSync: any;
  private static lastAction: any;
  private buddyTime: any;
  private user: any;
  private pulse: string = 'inactive';
  private spin: string = 'inactive';

  constructor(private _srv: ApiService, private _store: Store<any>) {

    _srv.profile.subscribe((u: IbuddyUser) => {
      BuddyLogoComponent.lastAction = moment();
      BuddyLogoComponent.lastSync = moment();
      this.user = u;
      console.log('logo - profile subscribe');
      console.log(BuddyLogoComponent.lastAction);
    });

    _srv.products.subscribe((p: any) => {
      if (p.time) {
        BuddyLogoComponent.lastAction = p.time;
      }
      BuddyLogoComponent.lastSync = moment();
    });

  }

  ngOnInit() {

    this.buddyTime = moment().format('D MMMM YYYY HH:mm:ss');
    this._srv.sync();

    setInterval(() => {
      this.doPulse();
      const now = moment();
      this.buddyTime = now.format('D MMMM YYYY HH:mm:ss');
      const deltaAction = now.diff(BuddyLogoComponent.lastAction);
      const deltaSync = now.diff(BuddyLogoComponent.lastSync);
      console.log(deltaAction);
      if (deltaSync > 15000) {
        this._srv.sync();
        // BuddyLogoComponent.lastSync = now;
        this.doSpin();
      }
      if (deltaAction > 30000 && this.user.badge) {
        this._store.dispatch({ type: EMPTY_CART, payload: null });
        this._store.dispatch({ type: PROFILE_LOGOFF, payload: null });
      }

    }, 3000);
  }

  private togglePulse() {
    this.pulse = this.pulse === 'active' ? 'inactive' : 'active';
  }

  private doPulse() {
    this.togglePulse();
    setTimeout(() => this.togglePulse(), 260);
  }

  private doSpin() {
    this.spin = this.spin === 'yes' ? 'andyes' : 'yes';
  }

}
