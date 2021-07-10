import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { Notification } from 'src/app/modules/notification';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications:Notification[]=Array();
  joinReq:string="JOINREQUEST";
  joinDeq:string="JOINREQUESTDECLINE";
  joinApp:string="JOINREQUESTAPPROAVAL";
  sel_demande_approval:string="DEMANDEAPPROAVAL";
  sel_demande_reject:string="DEMANDEDECLINE";
  omited:string="OMITED"
  requestedArticles: Array<Article> = new Array();


  constructor(private accountService:AccountService,private route:Router
                ,private articleService: ArticleService, private search: SearchService) { }

  ngOnInit(): void {
    this.accountService.getNotifications().subscribe(data=>{
      this.notifications=data;
    });
    this.articleService.getRequestedArticles().subscribe(data => {
      this.requestedArticles = data;
    });
  }
  approave(articleId:number,clientId:number,notificationId:number):void{
    this.accountService.approave(articleId,clientId).subscribe(data=>this.ignore(notificationId));
  }
  decline(articleId:number,clientId:number,notificationId:number):void{
    this.accountService.decline(articleId,clientId).subscribe(data=>this.ignore(notificationId));
  }
  ignore(notificationId:number):void{
    this.accountService.ignore(notificationId).subscribe(data=>this.ngOnInit());
  }
  seller(notificationId:number):void{
    this.ignore(notificationId);

    this.route.navigateByUrl("/dashboard/submit-seller-request");
  }
  upload(notificationId:number):void{
    this.ignore(notificationId);
    this.route.navigateByUrl("/dashboard/add");

  }

  canRequest(article: Article): boolean {
    for (let art of this.requestedArticles) {
      if (article.id === art.id) return false;
    }
    this.search.getArticleById(article.id).subscribe(data=>{
      return data!==null;
    })
    // this.search.getArticleById(article.id).subscribe(response=>{
    //   if(response==null)return false;
    // });
    return true;
  }
  requestJoin(articleId:number,notificationId:number): void {
    this.articleService.requestJoin(articleId);
    this.ignore(notificationId);
  }

}
