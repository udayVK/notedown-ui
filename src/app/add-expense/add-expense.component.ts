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

  isLoading:boolean = false;
  isError:boolean = false;
  showSaveCategory:boolean = false;

  //using es6 spread operator to copy the values instead of reference
  spendAdd:Spend = {...defaultSpend,category:{...defaultCategory}};
  monthlyLimit:number=0;
  monthlySpent:number=0;
  categories:Array<Category> = [defaultCategory];
  categoryHeadings:Array<string> =[''];
  saveCategory:boolean = false;

  @ViewChild('addexpform')
  expForm!:ElementRef;
  

  constructor(private spnSrv: SpendsService) { }

  addSpend(){
    console.log('calling add spend');
    if(this.validateForm()){
      console.log('add form validation failed');
      return
    }
    this.isLoading = true;
    this.isError = false;
    this.spnSrv.postSpend(this.spendAdd, this.saveCategory).subscribe({
                                          next:()=>{
                                            this.isLoading=false;
                                            this.isError=false;
                                            window.alert("Added");
                                            this.resetSpendForm();
                                            this.showSaveCategory = false;
                                          },
                                          error:()=>{
                                            this.isError = true;
                                            this.isLoading = false;
                                            window.alert("error");
                                          },
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
    this.spnSrv.getAllExistingCategories().subscribe({
      next:(data)=>{
        this.categories = data;
        this.categoryHeadings = this.categories.map(cat => cat.heading);
      },
    });
  }

  getSpentData(){
    this.spnSrv.getMonthlyLimit().subscribe((data)=>{this.monthlyLimit=data});
    this.spnSrv.getMonthlySpent(new Date().getFullYear(),new Date().getMonth()+1).subscribe((data)=>{this.monthlySpent=data});
  }

  //reset the spend form to default except category, date
  resetSpendForm(){
    let spend:Spend = {...defaultSpend,category:{...defaultCategory}};
    spend.category = this.spendAdd.category;
    spend.date = this.spendAdd.date;
    this.spendAdd = spend;
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

  checkToShowSaveCategory() {
    this.showSaveCategory = false;
    this.showSaveCategory = !this.categoryHeadings.includes(this.spendAdd.category.heading)
  }

}
