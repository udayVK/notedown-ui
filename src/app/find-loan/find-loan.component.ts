import { Component, OnInit } from '@angular/core';
import { Loan } from '../pojo/loan';
import { Spend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-loan',
  template: 
  `<form class="comp">
   <h3 style="margin-top: 8px;">Month</h3>
   <table>
     <tr>
       <td><input type="month" name="month" style="width:150px;" [(ngModel)]="month"></td>
       <td><button type="button" (click)="findAllLoans()" style="margin-left:30px" class=" dark">Submit</button></td>
     </tr>
   </table>

   <h4>Loans</h4>
   <app-loan  [loans]="loans" ></app-loan>

   </form>
`,
  styleUrls: ['./find-loan.component.css']
})
export class FindLoanComponent implements OnInit {


  month:string='';
  loans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  constructor(private spnSrv: SpendsService) { }

  //ng on init method calls this one
  findAllLoans(){
    this.spnSrv.findAllLoans().subscribe({next:(data:Loan[])=>{this.loans=data}});
  }

  ngOnInit(): void {
    this.findAllLoans();
  }
}
