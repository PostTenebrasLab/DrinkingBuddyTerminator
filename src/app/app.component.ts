import { TestService } from './shared/test.service';
import { Component } from '@angular/core';

@Component({
  selector: 'dby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _srv: TestService) { }

}
