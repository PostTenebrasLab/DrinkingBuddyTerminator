
import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/test.service';

@Component({
  selector: 'dby-buddy-sidebar',
  templateUrl: './buddy-sidebar.component.html',
  styleUrls: ['./buddy-sidebar.component.scss']
})
export class BuddySidebarComponent implements OnInit {
   
   userName: string = 'Boris';
   sold: number = 45;

  constructor(private _srv: TestService) { }

  ngOnInit() {
  }

  private testConnect() {
    this._srv.testconn();
  }
  
  addMoneyIsVisible: boolean;
  toggleMoneyPanel(newState: boolean){
    if(newState == true){
      this.addMoneyIsVisible = true;
    } else {
      this.addMoneyIsVisible = false;
    }
  }

  cancelAction(){
    if(this.addMoneyIsVisible = true){
      this.addMoneyIsVisible = false;
    }
  }
}
