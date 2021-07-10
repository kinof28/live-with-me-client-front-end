import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/modules/message';
import { SubscribeServiceService } from 'src/app/services/subscribe-service.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  message:Message=new Message();
  wait:boolean=false;
  constructor(private service:SubscribeServiceService,private route:Router) { }

  ngOnInit(): void {
  }

  send():void{
    this.wait=true;
    this.service.sendMessage(this.message).subscribe(data=>{
      this.route.navigateByUrl("/");
    });
  }

}
