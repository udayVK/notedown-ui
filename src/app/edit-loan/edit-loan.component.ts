import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Loan, defaultLoan, LoanHistory, defaultLoanHistory } from '../pojo/loan';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent implements OnInit {
  
  @Input()
  loan:Loan = {...defaultLoan};
  loanHistory = {...defaultLoanHistory};
  payBackAmount:number = 0;
  takenAmount:number = 0;
  @Output()
  editLoanEventEnd:EventEmitter<1>=new EventEmitter<1>();

  constructor(private spnSrv:SpendsService, private router:Router) { }

  saveEditedLoan(){
    console.log("saving the edited loan");
    // if(this.loanHistory.amount < this.loan.pendingAmount){    //lent more loan
    //   this.loanHistory.type = true;
    //   this.loanHistory.amount = this.loan.pendingAmount - this.loanHistory.amount;
    //   this.loan.totalAmount += this.loanHistory.amount;
    // } else {            //loan paid partially
    //   this.loanHistory.type = false;
    //   this.loanHistory.amount = this.loanHistory.amount - this.loan.pendingAmount;
    // }

    this.loan.pendingAmount = this.loan.pendingAmount - this.payBackAmount + this.takenAmount;
    this.loan.totalAmount += this.takenAmount;

    this.spnSrv.addEditedLoan(this.loan).subscribe({next:()=>{window.alert("loan edited");
                                                    this.router.navigate(["/find/loan"])}});
    if(this.payBackAmount > 0) {
      this.loanHistory.type = false;
      this.loanHistory.amount = this.payBackAmount;
      this.spnSrv.addLoanHistory(this.loanHistory, this.loan.id).subscribe({
        next:()=>{this.payBackAmount = 0;},
        error:()=>{},})
    }
    if(this.takenAmount > 0) {
      this.loanHistory.type = true;
      this.loanHistory.amount = this.takenAmount;
      this.spnSrv.addLoanHistory(this.loanHistory, this.loan.id).subscribe({
        next:()=>{this.takenAmount = 0},
        error:()=>{},})
    }
  }
  
  emitEditLoanEndEvent(){
    this.editLoanEventEnd.emit(1);
  }

  payBackChanged() {
    console.log('payBackChanged')
    // this.loan.pendingAmount -= this.payBackAmount;
  }

  takenAmountChanged() {
    console.log('taken')
    // this.loan.pendingAmount += this.takenAmount;
    // this.loan.totalAmount += this.takenAmount;
  }

  ngOnInit(): void {
    const currentPendingAmount = this.loan.pendingAmount;
    this.loanHistory.amount = currentPendingAmount;
    this.loanHistory.date = new Date();
  }

}
