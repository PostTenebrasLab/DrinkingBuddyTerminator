
import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/test.service';

@Component({
  selector: 'dby-buddy-sidebar',
  templateUrl: './buddy-sidebar.component.html',
  styleUrls: ['./buddy-sidebar.component.css']
})
export class BuddySidebarComponent implements OnInit {
   
   userName: string = 'Boris';

  constructor(private _srv: TestService) { }

  ngOnInit() {
  }

  private testConnect() {
    this._srv.testconn();
  }
}
