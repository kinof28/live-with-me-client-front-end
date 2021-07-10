import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/modules/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-dashbord',
  templateUrl: './client-dashbord.component.html',
  styleUrls: ['./client-dashbord.component.css']
})
export class ClientDashbordComponent implements OnInit {
  client:Account=new Account();
  isSeller:boolean=false;
  constructor(private AccountService : AccountService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
   this.AccountService.getCurrent().subscribe(data=>{
     this.client=data;
     this.isSeller=data.isSeller;
     if(this.client.profileImg===""||this.client.profileImg===null){
      this.client.profileImg="../../../assets/avatar7.png";
    }else{
      this.client.profileImg=`/api/v0/public/img/${this.client.id}`;
    }

   });
  }
  logout():void{
    this.authService.logout();
    window.location.reload();
  }
  

}
