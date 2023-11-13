import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Loan,defaultLoan } from '../pojo/loan';
import { SpendsService } from '../spends.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  @Input()
  loans:Loan[]=[{...defaultLoan}];
  @Input()
  name:string ='';
  @Output()
  editLoanEvent:EventEmitter<Loan> = new EventEmitter<Loan>();
  
  constructor(private spnSrv:SpendsService,
            private router: Router){ }

  changeLoanStatus(id:number){
    console.log("changing loan status",id);
    this.spnSrv.changeLoanStatus(id).subscribe({
      next:(data)=>{window.alert('successfully changed')},
      error:()=>{window.alert('Error occured. Please refresh and try again')},
    })
    this.loans.map(l=>{if(l.id==id){l.status=!l.status}})
  }
  
  emitEditLoanEvent(loan:Loan){
    console.log("emitting edit loan event ")
    this.editLoanEvent.emit(loan)
  }

  ngOnInit(): void {
  }

}
  
@Pipe({
  name: 'loanHistoryStatus'
})
export class LoanHistoryStatus implements PipeTransform {
  transform(value: boolean): string {
    return value ?  'Lent More' : 'Paid Back';;
  }
}
