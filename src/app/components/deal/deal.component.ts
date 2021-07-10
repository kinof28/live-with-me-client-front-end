import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deal } from 'src/app/modules/deal';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  public deal:Deal=new Deal();
  private id:number=0;
  constructor(private articleService:ArticleService,private accountService:AccountService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get("id"));
    this.articleService.getDealByArticleId(this.id).subscribe(data=>{
      this.deal=data;
    })
  }
  approave(id:number):void{
    this.accountService.approave(this.deal.article.id,id).subscribe(data=>{
      this.ngOnInit()
    });
  }
  decline(id:number):void{
    this.accountService.decline(this.deal.article.id,id).subscribe(data=>{
      this.ngOnInit()
    });
  }
  omit(buyerId:number,articleId:number,dealId:number):void{
    this.articleService.omitBuyerFromDeal(dealId,articleId,buyerId).subscribe(data=>{
      this.ngOnInit();
    });
    
  }
}
