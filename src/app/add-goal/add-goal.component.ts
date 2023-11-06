import { Component, OnInit } from '@angular/core';
import { Goal, defaultGoal } from '../pojo/goal';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  addGoal:Goal = {...defaultGoal};

  addNotif:string='';
  constructor(private spnSrv : SpendsService) { }

  addNewGoal(){
    this.spnSrv.addNewGoal(this.addGoal).subscribe({
                                                    next:()=>{this.addNotif="new goal added";},
                                                    error:()=>{this.addNotif="error adding new goal"},
                                                  })
  }

  ngOnInit(): void {
    // Change goal limit date to 3 months from now
    let currMonth = this.addGoal.upto.getMonth()
    this.addGoal.upto.setMonth(currMonth+3)
    console.log(this.addGoal)
  }

}
