import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-my-dead-articles',
  templateUrl: './my-dead-articles.component.html',
  styleUrls: ['./my-dead-articles.component.css']
})
export class MyDeadArticlesComponent implements OnInit {

  articles:Article[]=[];
  constructor(private articleService:ArticleService,private router:Router) { }

  ngOnInit(): void {
    this.articleService.getMyDeadArticles().subscribe(data=>{
      this.articles=data;
    });
  }
  update(id:number):void{
    this.router.navigateByUrl(`/dashboard/update/${id}`);
  }
  delete(id:number):void{
    if(confirm("are u sure that u want to delete this article ?\n this action can not be undone please be carefull"))
    console.log(id ,"delete");
  }
  

}
