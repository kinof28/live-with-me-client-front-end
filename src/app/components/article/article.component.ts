import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = new Article();
  id: number;
  isLoged: boolean = false;
  mainImage: any;
  isMyArticlev: boolean = false;
  isInterestingv: boolean = false;
  isRequestedv: boolean = false;
  interestingArticles: Article[] = [];
  requestedArticles: Article[] = [];
  publishedArticles: Article[] = [];
  requestTitle: string = "";
  requestedTitle: string = "you already requested this article";
  constructor(private router: ActivatedRoute
    , private rout:Router
    , private articleService: ArticleService
    , private search: SearchService
    , private accountService: AccountService
    , private authService: AuthService) {
    this.id = Number(this.router.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.isLoged = this.authService.isLogedIn();
    this.loadArticle(this.id);
  }
  loadArticle(id: number): void {
    this.search.getArticleById(id).subscribe(response => {
      this.article = response;
      if(response===null) return;
      this.mainImage = `/api/v0/public/img/${this.article.id}/${this.article.mainImage ? this.article.mainImage : 1}`;
      if(!this.isLoged) return;
      this.articleService.getMyArticles().subscribe(data => {
        this.publishedArticles = data;
        this.accountService.getCurrent().subscribe(data => {
          this.interestingArticles = data.interestingArticles;
          this.articleService.getRequestedArticles().subscribe(data => {
            this.requestedArticles = data;
            this.isMyArticlev = this.isPublished(response);
            this.isRequestedv = this.isRequested(response);
            this.isInterestingv = this.isInteresting(response);
          });
        });
      });



    })
  }
  imageClicked(img: string): void {
    this.mainImage = `/api/v0/public/img/${this.article.id}/${img}`;
  }
  interest(): void {
    this.articleService.interest(this.article.id);
    this.isInterestingv=true;
  }
  lostInterest():void{
     this.articleService.lostInterest(this.article.id).subscribe(data=>{
      this.isInterestingv=false;
    });
    
  }
  requestJoin(): void {
    this.articleService.requestJoin(this.article.id);
    this.isRequestedv=true;
  }
  isPublished(article: Article): boolean {
    for (let art of this.publishedArticles) {
      if (article.id === art.id) return true;
    }
    return false;
  }
  isRequested(article: Article): boolean {
    for (let art of this.requestedArticles) {
      if (article.id === art.id) return true;
    }
    return false;
  }
  isInteresting(article: Article): boolean {
    for (let art of this.interestingArticles) {
      if (article.id === art.id) return true;
    }
    return false;
  }
  update():void{
    this.articleService.getDealByArticleId(this.article.id).subscribe(data => {
      if (data.buyers.length >= 1) {
        alert("u cannot update article with buyers");
        return;
      } else {
        this.rout.navigateByUrl(`/dashboard/update/${this.article.id}`);
      }
    })  

  }
  delete():void{
    this.articleService.getDealByArticleId(this.article.id).subscribe(data => {
      if (data.buyers.length >= 1) {
        alert("u cannot update article with buyers");
        return;
      } else {
        if (confirm("are u sure that u want to delete this article ?\n this action can not be undone please be carefull"))
          this.articleService.deleteArticle(this.article.id).subscribe(data=>{
            this.rout.navigateByUrl(`/dashboard/my-articles`);
          });
      }
    })
  }
}
