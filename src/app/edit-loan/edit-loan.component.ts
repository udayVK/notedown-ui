import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Loan, defaultLoan } from '../pojo/loan';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'edit-loan',
  template: `
  <form class="comp">
    <table>
      <tr><h4> {{loan.name}}       {{loan.date}} </h4></tr>
      <tr> <td>Reason.?</td> </tr>
      <tr> <td><input class="input long-input" type="text" name="why" placeholder="Reason" [(ngModel)]="loan.reason"></td> </tr>
      <tr> <td>Total Amount</td> </tr>
      <tr> <input class="input long-input" type="number" name="tamount" placeholder="How much.?" [(ngModel)]="loan.totalAmount"> </tr>
      <tr> <td>Pending Amount</td> </tr>
      <tr> <td><input class="input long-input" type="number" name="pamount" placeholder="How much.?" [(ngModel)]="loan.pendingAmount"></td> </tr>
    </table>
  </form>
  <div class="flex flex-space-between">
    <button type="button" class="light" (click)="emitEditLoanEndEvent()">Back</button>
    <button  type="button" class=" dark" (click)="saveEditedLoan()">Submit</button>
  </div>
  `,
  styles: ['']
})
export class EditLoanComponent implements OnInit {
  
  @Input()
  loan:Loan = defaultLoan;
  @Output()
  editLoanEventEnd:EventEmitter<1>=new EventEmitter<1>();

  constructor(private spnSrv:SpendsService, private router:Router) { }

  saveEditedLoan(){
    console.log("saving the edited loan");
    this.spnSrv.addEditedLoan(this.loan).subscribe({next:()=>{window.alert("loan edited");
                                                    this.router.navigate(["/find","/loan"])}});
  }
  
  emitEditLoanEndEvent(){
    this.editLoanEventEnd.emit(1);
  }

  ngOnInit(): void {
  }

}
