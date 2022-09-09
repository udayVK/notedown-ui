import { Component, OnInit } from '@angular/core';
import { Goal } from '../pojo/goal';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  addGoal:Goal = {id:0,desc:'',upto:new Date(),status:false}

  addNotif:string='';
  constructor(private spnSrv : SpendsService) { }

  addNewGoal(){
    this.spnSrv.addNewGoal(this.addGoal).subscribe({
                                                    next:()=>{this.addNotif="new goal added";},
                                                    error:()=>{this.addNotif="error adding new goal"},
                                                  })
  }

  ngOnInit(): void {
  }

}
