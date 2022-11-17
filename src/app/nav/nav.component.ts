import { Component, OnInit } from '@angular/core';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  darkTheme:boolean = false;
  constructor(private spnSrv: SpendsService) { 
    this.spnSrv.commonEvent.subscribe((theme)=>{ theme==='dark'?this.darkTheme=true:this.darkTheme=false })
  }

  ngOnInit(): void {
  }

}
