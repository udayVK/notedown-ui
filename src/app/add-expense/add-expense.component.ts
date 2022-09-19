import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Spend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent implements OnInit {

  spendAdd:Spend = {purpose:'',money:0,date:new Date(),forOthers:0};
  monthlyLimit:number=0;
  monthlySpent:number=0;
  @ViewChild('addexpform')
  expForm!:ElementRef;
  

  constructor(private spnSrv: SpendsService) { }

  addSpend(){
    console.log('calling add ')
    if(this.validateForm()){
      console.log('add form validation failed');
      return
    }
    let obj = {purpose:'',money:0,date:new Date(),forOthers:0};
    obj.date=this.spendAdd.date;
    obj.money=this.spendAdd.money;
    obj.purpose=this.spendAdd.purpose;
    obj.date=this.spendAdd.date;
    obj.forOthers=this.spendAdd.forOthers;
    this.spnSrv.postSpend(obj).subscribe({
                                          next:()=>{window.alert("Added");},
                                          error:()=>{window.alert("error");},
                                          complete:()=>{this.getSpentData()}});
  }

  validateForm():boolean {
    if(this.spendAdd.purpose!=''){
      return false;
    }
    if(this.spendAdd.money<0){
      return false;
    }
    if(this.spendAdd.date!=null){
      return false;
    }
    return true;
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
