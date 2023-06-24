import { Component, OnInit } from '@angular/core';
import LoginCargo  from '../pojo/LoginCargo';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCargo:LoginCargo = {username:'', password:''};
  constructor(private spnSrv:SpendsService) { }

  ngOnInit(): void {
  }
  
  cancel(){
    console.log('cancel')

  }
  login(){
    console.log(this.loginCargo);
    this.spnSrv.login(this.loginCargo).subscribe((result)=>{console.log(result)},(error)=>{console.log(error)})
    
  }

}
