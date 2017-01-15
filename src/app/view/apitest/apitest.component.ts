import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'dby-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.css']
})
export class ApitestComponent implements OnInit {

  constructor(private _srv: ApiService) { }

  ngOnInit() { }

}
