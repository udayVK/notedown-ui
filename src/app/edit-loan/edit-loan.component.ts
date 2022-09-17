import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../pojo/loan';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'edit-loan',
  template: `
  <form class="comp">
    <table>
      <tr><h4> {{loan.name}}       {{loan.date}} </h4></tr>
      <tr> <td>Reason.?</td> </tr>
      <tr> <td><input type="text" name="why" placeholder="Reason" [(ngModel)]="loan.reason"></td> </tr>
      <tr> <td>Total Amount</td> </tr>
      <tr> <td><input type="number" name="amount" placeholder="How much.?" [(ngModel)]="loan.totalAmount"></td> </tr>
      <tr> <td>Pending Amount</td> </tr>
      <tr> <td><input type="number" name="amount" placeholder="How much.?" [(ngModel)]="loan.pendingAmount"></td> </tr>
    </table>
    <div style="margin-left:120px">
        <button  type="button" class=" dark" (click)="saveEditedLoan()">Submit</button>
    </div>
  </form>
  `,
  styles: ['']
})
export class EditLoanComponent implements OnInit {
//class="flex flex-space-around"
//(click)="addLoan()"
  @Input()
  loan:Loan = {id:0,name:'', totalAmount: 0, pendingAmount:0, date: new Date(), reason: '', type:true, status:false};
  constructor(private spnSrv:SpendsService) { }

  saveEditedLoan(){
    console.log("saving the edited loan");
    this.spnSrv.addEditedLoan(this.loan).subscribe({next:()=>window.alert("loan edited")});
  }

  ngOnInit(): void {
    console.log(this.loan);
  }

}
