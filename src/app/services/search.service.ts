import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../modules/article';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  public explore(city : string,country:string) : Observable<any>{
    return this.httpClient.get(`/api/v0/public/explore/${city}/${country}`);
  }
  public getArticleById(id:number):Observable<Article>{
    return this.httpClient.get(`/api/v0/public/article/${id}`) as Observable<Article>;
  }
  public search(text : string) : Observable<any>{
    return this.httpClient.get<any>(`/api/v0/public/search/${text}`) ;
  }
}
