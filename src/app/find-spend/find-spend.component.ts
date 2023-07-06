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
  total:number=0;
  month:string='';
  //spend object that is easy to render
  spendsToRender:SpendRender = {spendMap:new Map<string, Spend[]>}
  
  constructor(private spnSrv: SpendsService) { }

  searchSpecefic(){
    console.log("in search" + this.month);
    let full = this.month.split('-');
    let month = Number(full[0]);
    let year = Number(full[1]);
    this.spnSrv.getSpendsOfMonth(year,month).subscribe((data:Spend[])=>{this.convertToRenderSpends(data)})
    this.getmonthlySpent();
  }

  convertToRenderSpends(spends:Spend[]){
    let spendsMap:Map<string,Spend[]> = new Map();
    spends.forEach(sp=>{
      if(spendsMap.has(sp.category.heading)){
        spendsMap.get(sp.category.heading)?.push(sp)
      }
      else{spendsMap.set(sp.category.heading,[sp])}
    });
    this.spendsToRender = {spendMap:spendsMap};
    console.log(this.spendsToRender);
  }

  getMonthArrFromString(month:string){
    let full = this.month.split('-');
    return full;
  }

  ngOnInit(): void {
    let now = new Date();
    this.month = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString();
    this.searchSpecefic();
    console.log(document.getElementById('expenseInput')?.nodeValue)
  }

  getmonthlySpent(){
    let full = this.getMonthArrFromString(this.month);
    this.spnSrv.getMonthlySpent(Number(full[0]),Number(full[1])).subscribe({next:(data:number)=>{this.total=data},
                                                                            error:()=>{this.total=0}});
  }

  navigateMonth(flag:string){
    console.log(flag);
    console.log(this.month);
    let monthToNavigate = '';
    let detailMonth = this.getMonthArrFromString(this.month);
    if(flag == '+'){
      if(detailMonth[1] == '12'){
        monthToNavigate += parseInt(detailMonth[0])+1
        monthToNavigate += '-';
        monthToNavigate += '1';
      } else {
        monthToNavigate += detailMonth[0];
        monthToNavigate += '-';
        monthToNavigate += parseInt(detailMonth[1])+1
      }
    } else {
      if(detailMonth[1] == '1'){
        monthToNavigate += parseInt(detailMonth[0])-1
        monthToNavigate += '-';
        monthToNavigate += '12';
      } else {
        monthToNavigate += detailMonth[0];
        monthToNavigate += '-';
        monthToNavigate += parseInt(detailMonth[1])-1
      }
    }
    this.month = monthToNavigate;
    console.log(this.month);
    this.searchSpecefic();
  }

}

export interface SpendRender {
  spendMap: Map<string, Spend[]>;
}