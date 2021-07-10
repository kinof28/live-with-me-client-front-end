import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit{

  isLoged: boolean = false;

  @Input() article: Article;
  @Input() isInteresting: boolean = false;
  @Input() isPublished: boolean = false;
  @Input() isRequested: boolean = false;
  @Output() created=new EventEmitter<number>();
  requestTitle:string="";
  requestedTitle:string="you already requested this article";
  constructor(private router: Router, private authService: AuthService,private articleService:ArticleService) {
    this.article = new Article();
  }
  ngOnInit(): void {
    this.isLoged = this.authService.isLogedIn();
  }
  
  plusDetailesHundle(): void {
    this.router.navigateByUrl(`/article/${this.article.id}`);
  }
  requestJoin():void{
    this.articleService.requestJoin(this.article.id).subscribe(console.log);
    this.isRequested=true;
  }
  interest():void{
    this.articleService.interest(this.article.id);this.articleService.lostInterest(this.article.id).subscribe(data=>{
      this.isInteresting=true;
    })
  }
  lostInterest():void{
    this.articleService.lostInterest(this.article.id).subscribe(data=>{
      this.isInteresting=false;
    })
  }
  update():void{
    this.articleService.getDealByArticleId(this.article.id).subscribe(data => {
      if (data.buyers.length >= 1) {
        alert("u cannot update article with buyers");
        return;
      } else {
        this.router.navigateByUrl(`/dashboard/update/${this.article.id}`);
      }
    })  
  }

}
