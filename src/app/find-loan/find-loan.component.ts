import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../pojo/loan';
import { Spend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-loan',
  template: 
  `
  <div *ngIf = "isLoading && !isError" class = "flex flex-row-center">
    <loading></loading>
  </div>
  <div *ngIf = "isError">
    <h4>Error Occured, sip some water.</h4>
  </div>

  <div *ngIf = "canShowLoanInfo()">
   <span>Total amount to be recovered is: {{totalReoveryAmount}}</span>

   <div *ngIf=!editLoanMode>
     <app-loan  [loans]="pendingLoans" (editLoanEvent)="listenEditLoanEvent($event)" name="Pending Loans" ></app-loan>
     <app-loan  [loans]="completedLoans" name="Completed Loans" ></app-loan>
   </div>
   <div *ngIf=editLoanMode>
      <edit-loan [loan]="loanToEdit" (editLoanEventEnd)="listenEditLoanEndEvent()"></edit-loan>
   </div>
  </div>
`,
  styleUrls: ['./find-loan.component.css']
})
export class FindLoanComponent implements OnInit {

  //properties
  editLoanMode:boolean = false;
  isLoading:boolean = false;
  isError:boolean = false;
  
  //data
  month:string='';
  loans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  pendingLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  completedLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  totalReoveryAmount:number=0;

  loanToEdit:Loan = {id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}
  
  constructor(private spnSrv: SpendsService) { }

  canShowLoanInfo(){
    return !this.isLoading && !this.isError ? true : false;
  }

  //ng on init method calls this one
  findAllLoans(){
    this.spnSrv.findAllLoans().subscribe({
      next:(data:Loan[])=>{
        this.loans=data;
        this.classifyLoans();
        this.findTotalPendingAmount();
        this.isLoading = false;
        this.isError = false;
      },
      error:(error)=>{this.isError=true}
  
    });
  }

  classifyLoans(){
    this.pendingLoans = this.loans.filter(l=>!l.status)
    this.completedLoans = this.loans.filter(l=>l.status)
  }

  listenEditLoanEvent(loan:Loan){
    console.log("listening edit loan event");
    this.loanToEdit = loan;
    this.editLoanMode = true;
  }
  listenEditLoanEndEvent(){
    this.editLoanMode = false;
  }
  findTotalPendingAmount(){
    this.loans.forEach(l=>{if(l.status===false)
                            this.totalReoveryAmount+=l.pendingAmount})
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.findAllLoans();
  }
}
