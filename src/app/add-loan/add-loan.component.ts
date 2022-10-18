import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loan, defaultLoan } from '../pojo/loan';
import { SpendsService } from '../spends.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-loan',
  templateUrl: './add-loan.component.html',
  styles: [`
  .typel {
    border: 2px black solid;
    border-radius: 9px;
    margin: 4px 4px 4px 8px;
    padding: 3px;
    width: 120px;
    background-color: white;
  }
  `]
})
export class AddLoanComponent implements OnInit {

  type:boolean=false;

  loan: Loan  = defaultLoan;

  constructor(private route: ActivatedRoute,
              private spnSrv: SpendsService) { }
  
  addLoan(){
    console.log('adding loan');
    this.loan.pendingAmount = this.loan.totalAmount;
    this.spnSrv.addLoan(this.loan).subscribe({next:()=>window.alert("Loan Added")});
  }

  ngOnInit(): void {
  }

}
