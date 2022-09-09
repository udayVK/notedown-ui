import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { AddComponent } from './add/add.component';
import { FindGoalComponent } from './find-goal/find-goal.component';
import { FindLoanComponent } from './find-loan/find-loan.component';
import { FindSpendComponent } from './find-spend/find-spend.component';
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { LimitComponent } from './limit/limit.component';
import { MiscComponent } from './misc/misc.component';

const routes: Routes = [
  {path:"add", component : AddComponent },
  {path:"add/exp", component : AddExpenseComponent },
  {path:"add/loan", component : AddLoanComponent },
  {path:"add/goal", component : AddGoalComponent },
  {path:"find", component : FindComponent},
  {path:"find/exp", component : FindSpendComponent},
  {path:"find/loan", component : FindLoanComponent},
  {path:"find/goal", component : FindGoalComponent},
  {path:"stats", component : HomeComponent },
  {path:"misc", component : MiscComponent },
  {path:'limit', component : LimitComponent },
  


  {path: "**",component : HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
