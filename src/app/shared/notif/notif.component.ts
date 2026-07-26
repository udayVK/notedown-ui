import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NotifComponent implements OnInit {

  @Input()
  message:string = '';
  @Input()
  typeStyle:string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  sendAlert(msg:string, type:string) {
    console.log(msg,type);
    this.message = msg;
    this.typeStyle = type
    window.setTimeout(()=>{this.removeNotif()}, 5000);
    console.log("in send alert last",this.message,this.typeStyle);
  }

  removeNotif() {
    console.log('remove notif method')
    console.log("Before remove ",this.message,this.typeStyle)
    this.message='';
    this.typeStyle='';
    console.log("After remove ",this.message,this.typeStyle)
  }

}
