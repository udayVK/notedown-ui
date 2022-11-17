import { Component, OnInit } from '@angular/core';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-misc',
  template: `
  <div class="full-h-list">
    <button class="full-h" (click)="toggleTheme()">Dark Theme</button>
    <button class="full-h" routerLink="/limit">Set Monthly Limit</button>
    <button class="full-h">Delete History</button>
    <button class="full-h">Coming Soon...</button>
  </div>
  `,
  styles: [`  
  `]
})
export class MiscComponent implements OnInit {

  constructor(private spnSrv:SpendsService) { }

  darkTheme = false;
  toggleTheme(){
    this.darkTheme = !this.spnSrv.darkTheme;
    // this.spnSrv.emitCommonEvent(this.darkTheme?'dark':'light');
    
    let rootStyler:Element | null = document.querySelector(':root');
    let rootStyles = getComputedStyle(rootStyler);




    this.spnSrv.darkTheme=this.darkTheme;
  }
  
  ngOnInit(): void {
  }
}


// this.darkTheme = !this.darkTheme;
// document.body.style.backgroundColor=(this.darkTheme?'grey':'#CFD8DC');
// document.documentElement.style.setProperty('--body-bg-color', 'grey');
// document.body.style.color=(this.darkTheme?'white':'black');
// // document.querySelectorAll(".full-h").style.backgroundColor='black';