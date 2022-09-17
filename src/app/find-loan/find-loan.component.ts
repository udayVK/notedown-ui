import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../pojo/loan';
import { Spend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-loan',
  template: 
  `<form class="comp" *ngIf=!editLoanMode>
   <h3 style="margin-top: 8px;">Month</h3>
   <table>
     <tr>
       <td><input type="month" name="month" style="width:150px;" [(ngModel)]="month"></td>
       <td><button type="button" (click)="findAllLoans()" style="margin-left:30px" class=" dark">Submit</button></td>
     </tr>
   </table>
   </form>
   <h4>Loans</h4>
   <div *ngIf=!editLoanMode>
     <app-loan  [loans]="pendingLoans" (editLoanEvent)="listenEditLoanEvent($event)" name="Pending Loans" ></app-loan>
     <app-loan  [loans]="completedLoans" name="Completed Loans" ></app-loan>
   </div>
   <div *ngIf=editLoanMode>
      <edit-loan [loan]="loanToEdit" ></edit-loan>
   </div>
`,
  styleUrls: ['./find-loan.component.css']
})
export class FindLoanComponent implements OnInit {

  //properties
  editLoanMode:boolean = false;
  
  //data
  month:string='';
  loans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  pendingLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  completedLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];

  loanToEdit:Loan = {id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}
  
  constructor(private spnSrv: SpendsService) { }

  //ng on init method calls this one
  findAllLoans(){
    this.spnSrv.findAllLoans().subscribe({next:(data:Loan[])=>{this.loans=data;this.classifyLoans()}});
  }

  classifyLoans(){
    this.pendingLoans = this.loans.filter(l=>!l.status)
    this.completedLoans = this.loans.filter(l=>l.status)
  }

  listenEditLoanEvent(loan:Loan){
    console.log("listening edit loan event");
    this.loanToEdit = loan;
    this.editLoanMode = !this.editLoanMode;

  }
  searchTheLoanToEdit(id:number){
    
  }
  ngOnInit(): void {
    this.findAllLoans();
  }
}
