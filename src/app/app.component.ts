import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'dby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _srv: ApiService) { }

}
