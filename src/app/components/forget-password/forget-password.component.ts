import { Component, OnInit } from '@angular/core';
import { SubscribeServiceService } from 'src/app/services/subscribe-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email:string="";
  message:string="";
  wait:boolean=false;
  constructor(private service:SubscribeServiceService) { }

  ngOnInit(): void {
  }
  submit():void{
    this.wait=true;
    this.service.resetPassword(this.email).subscribe(data=>{
      if(data.startsWith("reset"))    this.message="message was sent to your mail use the sent password to login and change it later";
      else  this.message="please use a valide email or try to subscribe";
      this.wait=false;
    });
  }

}
