
import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';

@Component({
  selector: 'dby-buddy-profile',
  templateUrl: './buddy-profile.component.html',
  styleUrls: ['./buddy-profile.component.css']
})
export class BuddyProfileComponent implements OnInit {

  constructor(private _srv: TestService) { }

  ngOnInit() {
  }

  private testConnect() {
    this._srv.testconn();
  }
}
