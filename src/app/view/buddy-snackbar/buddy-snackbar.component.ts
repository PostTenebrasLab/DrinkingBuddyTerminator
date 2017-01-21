import { Component, OnInit } from '@angular/core';
import { ImessageError } from '../../model/api/message-error';

import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'dby-buddy-snackbar',
  templateUrl: './buddy-snackbar.component.html',
  styleUrls: ['./buddy-snackbar.component.css']
})
export class BuddySnackbarComponent implements OnInit {

  private errorMsg: ImessageError;
  private simpleMsg: string;

  constructor(private _srv: ApiService) { }

  ngOnInit() {
    this._srv.main.subscribe((o: any) => {
      this.errorMsg = o.err ? o.err : null;
      this.simpleMsg = o.msg ? o.msg : null;
      console.log('BuddySnackbarComponent');
      console.log(this.simpleMsg);
    });
  }

}
