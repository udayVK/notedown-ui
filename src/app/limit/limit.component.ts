import { Component, OnInit } from '@angular/core';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-limit',
  template: `
  <span>Set Monthly Limit</span>
  <div class="flex flex-space-between">
    <input name="limit" type="number" min="100" max="10000" class="input s-input" placeholder="enter amount" [(ngModel)]="limitAM">
    <button class="dark med" (click)="addMonthlyLimit()">Set</button>
  </div>
`,
  styles: []
})
export class LimitComponent implements OnInit {

  limitAM:number=0;
  constructor(private readonly spnSrv: SpendsService) {   }

  addMonthlyLimit():void {
    console.log(this.limitAM)
    this.spnSrv.setMonthlyLimit(this.limitAM).subscribe(()=>{});

  }

  ngOnInit(): void {
    let value:number;
    this.spnSrv.getMonthlyLimit().subscribe({next:(data:number)=>{this.limitAM=data},
                                            error:(error)=>{console.log(error)},
                                            complete:()=>{}
                                          });
  }

}
