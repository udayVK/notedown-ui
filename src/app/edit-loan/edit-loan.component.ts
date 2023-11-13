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

  ngOnInit(): void {
    const currentPendingAmount = this.loan.pendingAmount;
    this.loanHistory.amount = currentPendingAmount;
    this.loanHistory.date = new Date();
  }

}
// <tr> <td><input class="input long-input" type="text" name="why" placeholder="Reason" [(ngModel)]="loan.reason" disabled></td> </tr>
// <tr> <td><input class="input long-input" type="number" name="pamount" placeholder="How much.?" [(ngModel)]="loan.pendingAmount"></td> </tr>
// <tr> <input class="input long-input" type="number" name="tamount" placeholder="How much.?" [(ngModel)]="loan.totalAmount" disabled> </tr>