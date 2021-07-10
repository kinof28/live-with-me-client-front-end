import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalisationServiceService {

  constructor(private httpClient : HttpClient) { }
  private API_KEY:string='16d6efb71e9f443684f3b1023046e65f';
  getIpAddress() : Observable<any>{
    return this.httpClient.get('https://api.ipgeolocation.io/getip'); 
  }
  getLocalisationDetailes(ip : string):Observable<any>{
    return this.httpClient.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.API_KEY}&ip=${ip}`);
  }
}
