import { Component, OnInit } from '@angular/core';
import { Goal } from '../pojo/goal';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-find-goal',
  templateUrl: './find-goal.component.html',
  styleUrls: ['./find-goal.component.css']
})
export class FindGoalComponent implements OnInit {

  goals:Goal[]=[{id:0,desc:'',upto:new Date(),status:false}]
  constructor(private spnSrv : SpendsService) { }

  findAllGoals(){
    this.spnSrv.findAllGoals().subscribe({ next:(data:Goal[])=>{this.goals=data;},complete:()=>{console.log(this.goals);} })

  }
  
  changeGoalStatus(id:number){
    this.goals.map(goal=>{
                            if(goal.id==id){
                              goal.status=!goal.status;
                            }
                          })
    this.spnSrv.changeGoalStatus(id).subscribe({
      next:()=>{console.log('status changed');window.alert('Successfully changed goal status')},
      error:()=>{window.alert('Error occured. Please refresh and try again.')},
    });
  }

  ngOnInit(): void {
    this.findAllGoals();
  }

}
