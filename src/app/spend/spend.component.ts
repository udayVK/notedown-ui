import { Component, Input, OnInit } from '@angular/core';
import { Spend } from '../pojo/spend';
import SubSpend from '../pojo/subspend';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  
  // spend:Spend = {purpose:'test',money:20,date:new Date(),toWhom:2};
  @Input()
  spends:Spend[] = [{id:0,heading:'',date:new Date(),spends:new Array<SubSpend>()}];
  constructor() { }

  ngOnInit(): void {
  }

}
