import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Spend } from '../pojo/spend';
import SubSpend from '../pojo/subspend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent implements OnInit {

  spendAdd:Spend = {id:0,heading:'',date:new Date(),spends:new Array<SubSpend>()};
  monthlyLimit:number=0;
  monthlySpent:number=0;
  currentSubSpend:SubSpend = {id:0,purpose:'',date:new Date(),money:NaN,forOthers:NaN};
  @ViewChild('addexpform')
  expForm!:ElementRef;
  

  constructor(private spnSrv: SpendsService) { }

  addSpend(){
    console.log('calling add spend');
    if(this.validateForm()){
      console.log('add form validation failed');
      return
    }
    this.spnSrv.postSpend(this.spendAdd).subscribe({
                                          next:()=>{window.alert("Added");},
                                          error:()=>{window.alert("error");},
                                          complete:()=>{this.getSpentData()}});
  }

  validateForm():boolean {
    //returns false for good form, true for bad form
    if(this.spendAdd.heading!=''){
      return false;
    }
    if(this.spendAdd.date!=null){
      return false;
    }
    return true;
  }

  addSubSpend(){
    this.spendAdd.spends.push(this.currentSubSpend);
    let defaultSubSpend = {id:0,purpose:'',date:new Date(),money:0,forOthers:0};
    // this.currentSubSpend = defaultSubSpend;
    console.log("add subspend");
  }

  getSpentData(){
    this.spnSrv.getMonthlyLimit().subscribe((data)=>{this.monthlyLimit=data});
    this.spnSrv.getMonthlySpent(new Date().getFullYear(),new Date().getMonth()+1).subscribe((data)=>{this.monthlySpent=data});
  }
  ngOnInit(): void {
    this.getSpentData();
    
  }

  //trying to reset the form after it loads but its not working
  ngAfterViewInit():void {
    let form:HTMLFormElement = this.expForm.nativeElement;
    form.reset();
  }


}
