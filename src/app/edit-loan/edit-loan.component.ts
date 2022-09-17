import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../pojo/loan';

@Component({
  selector: 'edit-loan',
  template: `
  <form class="comp">
    <table>
      <tr><h4> {{loan.name}}       {{loan.date}} </h4></tr>
      <tr> <td>Any reason.?</td> </tr>
      <tr> <td><input type="text" name="why" placeholder="Reason" [(ngModel)]="loan.reason"></td> </tr>
      <tr> <td>Total Amount</td> </tr>
      <tr> <td><input type="number" name="amount" placeholder="How much.?" [(ngModel)]="loan.totalAmount"></td> </tr>
      <tr> <td>Pending Amount Amount</td> </tr>
      <tr> <td><input type="number" name="amount" placeholder="How much.?" [(ngModel)]="loan.totalAmount"></td> </tr>
    </table>
  </form>
  `,
  styles: ['']
})
export class EditLoanComponent implements OnInit {

  @Input()
  loan:Loan = {id:0,name:'', totalAmount: 0, pendingAmount:0, date: new Date(), reason: '', type:true, status:false};
  constructor() { }

  ngOnInit(): void {
    console.log(this.loan);
  }

}
