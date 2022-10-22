import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Category, defaultCategory } from '../pojo/category';
import {Spend, defaultSpend }from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent implements OnInit {

  spendAdd:Spend = defaultSpend;
  monthlyLimit:number=0;
  monthlySpent:number=0;
  categories:Array<Category> = [defaultCategory];

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
                                          complete:()=>{this.getSpentData();this.getAllExistingCategories()}});
  }

  validateForm():boolean {
    //returns false for good form, true for bad form
    if(this.spendAdd.category.heading!=''){
      return false;
    }
    return true;
  }
  getAllExistingCategories(){
    this.spnSrv.getAllExistingCategories().subscribe({next:(data)=>{this.categories = data},});
  }

  getSpentData(){
    this.spnSrv.getMonthlyLimit().subscribe((data)=>{this.monthlyLimit=data});
    this.spnSrv.getMonthlySpent(new Date().getFullYear(),new Date().getMonth()+1).subscribe((data)=>{this.monthlySpent=data});
  }
  ngOnInit(): void {
    this.getSpentData();
    this.getAllExistingCategories();
  }

  //trying to reset the form after it loads but its not working
  ngAfterViewInit():void {
    let form:HTMLFormElement = this.expForm.nativeElement;
    form.reset();
  }


}
