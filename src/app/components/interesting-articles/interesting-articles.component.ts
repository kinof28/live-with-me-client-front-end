import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/modules/article';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-interesting-articles',
  templateUrl: './interesting-articles.component.html',
  styleUrls: ['./interesting-articles.component.css']
})
export class InterestingArticlesComponent implements OnInit {
  articles:Article[]=[];
  constructor(private accountService:AccountService,private articleService:ArticleService) { }

  ngOnInit(): void {
    this.accountService.getCurrent().subscribe(data=>{
      this.articles=data.interestingArticles;
    })
  }
  request(id:number):void{
    this.articleService.requestJoin(id).subscribe(console.log);
  }
  lostInterest(id:number):void{
    this.articleService.lostInterest(id).subscribe(data=>{
      this.ngOnInit();
    });
  }

}
