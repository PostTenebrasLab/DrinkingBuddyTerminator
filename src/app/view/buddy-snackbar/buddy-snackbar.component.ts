import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';
import { IerrorMsg } from '../../model/error-msg';

@Component({
  selector: 'dby-buddy-snackbar',
  templateUrl: './buddy-snackbar.component.html',
  styleUrls: ['./buddy-snackbar.component.css']
})
export class BuddySnackbarComponent implements OnInit {

  private errorMsg: IerrorMsg;
  private simpleMsg: string;

  constructor(private _srv: ApiService) { }

  ngOnInit() {
    this._srv.main.subscribe((o: any) => {
      this.errorMsg = o.err ? o.err : null;
      this.simpleMsg = o.msg ? o.msg : null;
    });
  }

}
