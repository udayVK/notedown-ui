import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Goal } from './pojo/goal';
import { Loan } from './pojo/loan';
import { Category } from './pojo/category';
import { Spend } from "./pojo/spend";

@Injectable({
  providedIn: 'root'
})
export class SpendsService {

  baseURL = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  //data
  setMonthlyLimit(limit: number) {
    return this.http.post<number>(this.baseURL+`data/monthlylimit/${limit}`,'');
  }
  getMonthlyLimit():Observable<number> {
    return this.http.get<number>(this.baseURL+`data/monthlylimit/`);
  }
 

  //spend
  getSpendsOfMonth(month:number, year:number):Observable<Spend[]>{
    return this.http.get<Spend[]>(this.baseURL+`spend/${year}/${month}`);
  }
  postSpend(sp:Spend):Observable<Spend>{
    console.log(sp)
    return this.http.post<Spend>(this.baseURL+`spend/add`,sp);
  }
  getMonthlySpent(year:number, month:number):Observable<number> {
    return this.http.get<number>(this.baseURL+`spend/monthlyspent/${year}/${month}`);
  }
  getAllExistingCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.baseURL+'spend/categories');
  }


  //loan
  addLoan(l:Loan){
    return this.http.post<Loan>(this.baseURL+'loan/new',l);
  }
  findAllLoans():Observable<Loan[]>{
   return this.http.get<Loan[]>(this.baseURL+'loan/all');
  }
  changeLoanStatus(id:number){
    return this.http.get(this.baseURL+'loan/change?lid='+id);
  }
  addEditedLoan(loan: Loan):Observable<Loan> {
    return this.http.put<Loan>(this.baseURL+'loan/edit',loan);
  }
  getTotalRecoveryAmount():Observable<number> {
    return this.http.get<number>(this.baseURL+'loan/pending/all');
  }

  //goal
  addNewGoal(g:Goal){
    return this.http.post<Goal>(this.baseURL+'goal/new',g);
  }
  findAllGoals():Observable<Goal[]>{
    return this.http.get<Goal[]>(this.baseURL+'goal/all');
  }
  changeGoalStatus(id: number) {
    console.log(id);
    return this.http.put<number>(this.baseURL+'goal/change',id);
  }
  
}
