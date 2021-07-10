import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/modules/register-request';
import { NgForm, NgModel } from '@angular/forms'
import { SubscribeServiceService } from 'src/app/services/subscribe-service.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  wait:boolean=false;
  registerRequest: RegisterRequest;
  public confirmationPassword: string = "";
  public errorMessage: string = "";
  constructor(private route: Router,private subscribeService:SubscribeServiceService) {

    this.registerRequest = new RegisterRequest();
  }

  ngOnInit(): void {
  }
  loginHundle(): void {
    this.route.navigateByUrl("/login");
  }
  registerHundle(ngForm: NgForm): void {
    if (this.confirmationPassword !== this.registerRequest.password) {
      this.errorMessage = "*please check your password and try again";
    } else {
      this.wait=true;
      this.subscribeService.register(this.registerRequest).subscribe(data=>{
        if(data.startsWith("subscribed")){
          this.route.navigateByUrl("/succ");
        }else {
          this.errorMessage="* please use another email or try to log in ";
          this.wait=false;
        }
      });
    }
  }
}
