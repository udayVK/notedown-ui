import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SpendRender } from '../find-spend/find-spend.component';
import { Category } from '../pojo/category';
import { Spend, defaultSpend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  
  // spend:Spend = {purpose:'test',money:20,date:new Date(),toWhom:2};
  @Input()
  spends:SpendRender = {spendMap: new Map<string,{listTotal:number, spendsList:Spend[]}>};
  @Input()
  displayType:number = 1;
  constructor(private spnSrv: SpendsService) { }

  ngOnInit(): void {
    setTimeout(()=>{console.log(this.spends);console.log(this.displayType)},2000);
  }

  repeatSpend(spendId:number, category:string){
    let spendToRepeat = this.spends.spendMap.get(category)?.spendsList.filter(sp=>sp.id===spendId)[0];
    console.log(spendToRepeat);
    if(spendToRepeat){
      let spend = {...spendToRepeat}
      spend.date = new Date();
      this.spends.spendMap.get(category)?.spendsList.push(spend);
      spend.id = NaN;
      this.spnSrv.postSpend(spend).subscribe((data)=>{console.log(data)},()=>{});
    }
  }

}