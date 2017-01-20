import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';
import { IerrorMsg } from '../../model/error-msg';

@Component({
  selector: 'dby-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.css']
})
export class ApitestComponent implements OnInit {

  private errorMsg: IerrorMsg;

  constructor(private _srv: ApiService) { }

  ngOnInit() {
    this._srv.main.subscribe((o: any) => this.errorMsg = o.err ? o.err : null);
  }

  

}
