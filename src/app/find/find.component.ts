import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find',
  template: `
  <div class="comp">
    <button class="full-h" routerLink="/find/exp">Expenses</button>
    <button class="full-h" routerLink="/find/loan">Loans</button>
    <button class="full-h" routerLink="/find/goal">Goals</button>
  </div>
  `
})

export class FindComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
