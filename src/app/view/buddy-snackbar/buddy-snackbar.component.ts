import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ImessageError } from '../../model/api/message-error';

import { ApiService } from '../../shared/api.service';

import {
  API_ERROR_CLEAN,
} from '../../model/action-names';

@Component({
  selector: 'dby-buddy-snackbar',
  templateUrl: './buddy-snackbar.component.html',
  styleUrls: ['./buddy-snackbar.component.css']
})
export class BuddySnackbarComponent implements OnInit {

  private errorMsg: ImessageError;
  private simpleMsg: string;

  constructor(
    private _srv: ApiService,
    private _store: Store<any>,
    ) { }

  ngOnInit() {
    this._srv.main.subscribe((o: any) => {
      this.errorMsg = o.err ? o.err : null;
      this.simpleMsg = o.msg ? o.msg : null;
      console.log('BuddySnackbarComponent');
      console.log(this.simpleMsg);
    });
  }

  private dismissError() {
    this._store.dispatch({ type: API_ERROR_CLEAN, payload: null });
  }

}
