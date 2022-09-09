import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Goal } from './pojo/goal';
import { Loan } from './pojo/loan';
import { Spend } from './pojo/spend';

@Injectable({
  providedIn: 'root'
})
export class SpendsService {
  
  constructor(private http: HttpClient) { }

  //data
  setMonthlyLimit(limit: number) {
    return this.http.post<number>(`http://localhost:8080/data/monthlylimit/${limit}`,'');
  }
  getMonthlyLimit():Observable<number> {
    return this.http.get<number>(`http://localhost:8080/data/monthlylimit/`);
  }
 

  //spend
  getSpendsOfMonth(month:number, year:number):Observable<Spend[]>{
    return this.http.get<Spend[]>(`http://localhost:8080/spend/${year}/${month}`);
  }
  postSpend(sp:any){
    console.log("add call in service")
    return this.http.post<any>(`http://localhost:8080/spend/add`,sp);
  }
  getMonthlySpent(year:number, month:number):Observable<number> {
    return this.http.get<number>(`http://localhost:8080/spend/monthlyspent/${year}/${month}`);
  }


  //loan
  addLoan(l:Loan){
    return this.http.post<Loan>('http://localhost:8080/loan/new',l);
  }
  findAllLoans():Observable<Loan[]>{
   return this.http.get<Loan[]>('http://localhost:8080/loan/all');
  }
  changeLoanStatus(id:number){
    return this.http.get('http://localhost:8080/loan/complete?lid='+id);
  }

  //goal
  addNewGoal(g:Goal){
    return this.http.post<Goal>('http://localhost:8080/goal/new',g);
  }
  findAllGoals():Observable<Goal[]>{
    return this.http.get<Goal[]>('http://localhost:8080/goal/all');
  }
  changeGoalStatus(id: number) {
    console.log(id);
    return this.http.put<number>('http://localhost:8080/goal/change',id);
  }
  
}
