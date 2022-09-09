import { Component, Input, OnInit } from '@angular/core';
import { Spend } from '../pojo/spend';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  
  // spend:Spend = {purpose:'test',money:20,date:new Date(),toWhom:2};
  @Input()
  spends:Spend[] = [{purpose:'',money:0,date:new Date(),forOthers:0}];
  constructor() { }

  ngOnInit(): void {
  }

}
