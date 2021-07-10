import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/modules/article';
import { AccountService } from 'src/app/services/account.service';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalisationServiceService } from 'src/app/services/localisation-service.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isLoged: boolean = false;
  warningMessage:string="";
  ip: string = "";
  city: string = "";
  country: string = "";
  shown: Set<number> = new Set();
  countryList: Article[] = new Array();
  stateList: Article[] = new Array();
  provinceList: Article[] = new Array();
  interestingArticles: Article[] = new Array();
  requestedArticles: Article[] = new Array();
  publishedArticles: Article[] = new Array();
  constructor(private accountService: AccountService
    , private articleService: ArticleService
    , private localisationService: LocalisationServiceService
    , private searchService: SearchService
    , private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isLoged = this.authService.isLogedIn();
    this.localisationService.getIpAddress().subscribe(data => {
      if(data===null){
        this.warningMessage="localisation Service is not working";
        return;
      }
      this.ip = data.ip;
      this.localisationService.getLocalisationDetailes(this.ip).subscribe(data => {

        if(data===null){
          this.warningMessage="localisation detailes Service is not working";
          return;
        }

        this.country = data.country_name;
        this.city = data.city;
        this.searchService.explore(this.city, this.country).subscribe(response => {
          if(response===null){
            this.warningMessage="explore Service is not working";
            return;
          }
          this.countryList = response.country;
          this.stateList = response.state;
          this.provinceList = response.province;
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
        })
      });
    })
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
}
