import { ApitestService } from './apitest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dby-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.css']
})
export class ApitestComponent implements OnInit {

  constructor(private _srv: ApitestService) { }

  ngOnInit() { }

}
