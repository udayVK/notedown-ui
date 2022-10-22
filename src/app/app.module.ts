//services in providers
import { SpendsService } from './spends.service';
//modules in imports(external libraries)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//components in declarations
import { AppComponent } from './app.component';
import { CalenderComponent } from './calender/calender.component';
import { NavComponent } from './nav/nav.component';
import { AddComponent } from './add/add.component';
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { SpendComponent } from './spend/spend.component';
import { MiscComponent } from './misc/misc.component';
import { LimitComponent } from './limit/limit.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FindSpendComponent } from './find-spend/find-spend.component';
import { FindLoanComponent } from './find-loan/find-loan.component';
import { LoanComponent } from './loan/loan.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { FindGoalComponent } from './find-goal/find-goal.component';
import { EditLoanComponent } from './edit-loan/edit-loan.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    NavComponent,
    AddComponent,
    FindComponent,
    HomeComponent,
    SpendComponent,
    MiscComponent,
    LimitComponent,
    AddLoanComponent,
    AddExpenseComponent,
    FindSpendComponent,
    FindLoanComponent,
    LoanComponent,
    AddGoalComponent,
    FindGoalComponent,
    EditLoanComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SpendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
