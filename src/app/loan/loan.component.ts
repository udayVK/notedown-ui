import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../pojo/loan';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  @Input()
  loans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  pendingLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];
  completedLoans:Loan[]=[{id:0,name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason: '', type:true,status:false}];

  editPendingAmountMode:boolean=false;

  constructor(private spnSrv:SpendsService) { }

  changeEditMode(){this.editPendingAmountMode=!this.editPendingAmountMode}
  changeLoanStatus(id:number){
    console.log("changing loan status",id);
    this.spnSrv.changeLoanStatus(id).subscribe({
      next:(data)=>{window.alert('successfully changed')},
      error:()=>{window.alert('Error occured. Please refresh and try again')}
    })
    this.loans.map(l=>{if(l.id==id){l.status=!l.status}})

  }

  ngOnInit(): void {
    this.pendingLoans = this.loans.filter((loan)=>{!loan.status});
    console.log(this.pendingLoans);
    console.log(this.completedLoans);
    console.log(this.loans);
  }

}
