import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { Deal } from 'src/app/modules/deal';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {
  articles: Article[] = [];
  deal: Deal = new Deal();
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.articleService.getMyArticles().subscribe(data => {
      this.articles = data;
    });
  }
  update(id: number): void {

    this.articleService.getDealByArticleId(id).subscribe(data => {
      if (data.buyers.length >= 1) {
        alert("u cannot update article with buyers");
        return;
      } else {
        this.router.navigateByUrl(`/dashboard/update/${id}`);
      }
    })
  }
  delete(id: number): void {
    this.articleService.getDealByArticleId(id).subscribe(data => {
      if (data.buyers.length >= 1) {
        alert("u cannot delete article with buyers");
        return;
      } else {
        if (confirm("are u sure that u want to delete this article ?\n this action can not be undone please be carefull"))
          this.articleService.deleteArticle(id).subscribe(data=>{
            this.ngOnInit();
          });
      }
    })

  }
  view(id: number): void {
    this.router.navigateByUrl(`/article/${id}`);
  }

}
