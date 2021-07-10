import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isLoged: boolean = false;
  searchText: string | null;
  titleList: Array<Article> = new Array();
  countryList: Array<Article> = new Array();
  stateList: Array<Article> = new Array();
  provinceList: Array<Article> = new Array();
  descriptionList: Array<Article> = new Array();
  typeList: Array<Article> = new Array();
  allList: Array<Article> = new Array();
  shown: Set<number> = new Set();
  shownAll: Set<number> = new Set();
  interestingArticles: Array<Article> = new Array();
  requestedArticles: Array<Article> = new Array();
  publishedArticles: Array<Article> = new Array();
  constructor(private accountService: AccountService,
    private articleService: ArticleService
    , private searchService: SearchService
    , private authService: AuthService
    , private rout: ActivatedRoute) {
    this.searchText = this.rout.snapshot.paramMap.get("text");
  }
  getArticles() {
    this.searchService.search(this.searchText ? this.searchText : "").subscribe(data => {
      if (data === null) return;
      this.titleList = data.title;
      this.countryList = data.country;
      this.stateList = data.state;
      this.provinceList = data.province;
      this.descriptionList = data.description;
      this.typeList = data.type;
      this.fillAllList();
    });
    if (!this.isLoged) return;
    this.articleService.getMyArticles().subscribe(data => {
      this.publishedArticles = data;
    });
    this.accountService.getCurrent().subscribe(data => {
      this.interestingArticles = data.interestingArticles;
    });
    this.articleService.getRequestedArticles().subscribe(data => {
      this.requestedArticles = data;
    });
  }
  ngOnInit(): void {
    this.isLoged = this.authService.isLogedIn();
    this.getArticles();
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
  show(id: number): void {
    this.shown.add(id);
  }
  fillAllList(): void {
    for (let article of this.titleList) {
      this.allList.push(article);
      this.shownAll.add(article.id);
    }
    for (let article of this.descriptionList) {
      if (!this.shownAll.has(article.id)) {
        this.allList.push(article);
        this.shownAll.add(article.id);
      }
    }
    for (let article of this.countryList) {
      if (!this.shownAll.has(article.id)) {
        this.allList.push(article);
        this.shownAll.add(article.id);
      }
    }
    for (let article of this.stateList) {
      if (!this.shownAll.has(article.id)) {
        this.allList.push(article);
        this.shownAll.add(article.id);
      }
    }
    for (let article of this.provinceList) {
      if (!this.shownAll.has(article.id)) {
        this.allList.push(article);
        this.shownAll.add(article.id);
      }
    }
    for (let article of this.typeList) {
      if (!this.shownAll.has(article.id)) {
        this.allList.push(article);
        this.shownAll.add(article.id);
      }
    }
  }

}
