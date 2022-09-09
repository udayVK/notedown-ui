import { Component, ElementRef, ViewChild } from '@angular/core';
import { Spend } from './pojo/spend';
import { SpendsService } from './spends.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Money Rules';
  

  //spends list that comes after call of specefic search
  // spends=[{id:0,purpose:'',money:0,date:Date.now(),toWhom:0}];
  

  constructor(private spnSrv: SpendsService){
  }

  

  makeSpendtoSend(spends:Object){
    
  }
}
