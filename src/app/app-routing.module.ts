import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { AddComponent } from './add/add.component';
import { EditLoanComponent } from './edit-loan/edit-loan.component';
import { FindGoalComponent } from './find-goal/find-goal.component';
import { FindLoanComponent } from './find-loan/find-loan.component';
import { FindSpendComponent } from './find-spend/find-spend.component';
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { LimitComponent } from './limit/limit.component';
import { MiscComponent } from './misc/misc.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path:"add", component : AddComponent },
  {path:"find", component : FindComponent},
  {path:"stats", component : HomeComponent },
  {path:"misc", component : MiscComponent },
  {path:'limit', component : LimitComponent },
  {path:"add/exp", component : AddExpenseComponent },
  {path:"find/exp", component : FindSpendComponent},
  {path:"add/loan", component : AddLoanComponent },  
  {path:"find/loan", component : FindLoanComponent},
  {path:"edit/loan/:id" ,component: EditLoanComponent},
  {path:"add/goal", component : AddGoalComponent },
  {path:"find/goal", component : FindGoalComponent},
  {path:"to-do", component : TodoComponent},

  {path: "**",component : HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
