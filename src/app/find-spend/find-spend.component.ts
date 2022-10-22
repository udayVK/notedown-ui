import { Component, OnInit } from '@angular/core';
import { Category } from '../pojo/category';
import { Spend, defaultSpend }from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-spend',
  templateUrl: './find-spend.component.html',
  styleUrls: ['./find-spend.component.css']
})
export class FindSpendComponent implements OnInit {

  // spendToSend:Spend[]=[{purpose:'',money:0,date:new Date(),toWhom:0}];
  spends:Spend[]=[{...defaultSpend}];
  total:number=0;
  month:string='';
  constructor(private spnSrv: SpendsService) { }

  searchSpecefic(){
    let full = this.month.split('-');
    let month = Number(full[0]);
    let year = Number(full[1]);
    this.spnSrv.getSpendsOfMonth(year,month).subscribe((data:Spend[])=>{this.spends=data})
    this.getmonthlySpent();
  }

  getMonthArrFromString(month:string){
    let full = this.month.split('-');
    return full;
  }

  ngOnInit(): void {
    let now = new Date();
    this.month = now.getFullYear().toString()+'-'+(now .getMonth()+1).toString();
    this.searchSpecefic();
  }

  getmonthlySpent(){
    let full = this.getMonthArrFromString(this.month);
    this.spnSrv.getMonthlySpent(Number(full[0]),Number(full[1])).subscribe({next:(data:number)=>{this.total=data},
                                                                            error:()=>{this.total=0}});
  }
}
