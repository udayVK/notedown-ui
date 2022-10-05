import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc',
  template: `
  <div class="full-h-list">
    <button class="full-h" routerLink="/limit">Set Monthly Limit</button>
    <button class="full-h">Delete History</button>
    <button class="full-h">Coming Soon...</button>
  </div>
  `,
  styles: [`  
  `]
})
export class MiscComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}