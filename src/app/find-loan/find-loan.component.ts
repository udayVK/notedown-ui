import { Component, OnInit } from '@angular/core';
import { Loan } from '../pojo/loan';
import { Spend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-loan',
  templateUrl: './find-loan.component.html',
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
