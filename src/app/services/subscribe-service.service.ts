import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../modules/message';
import { RegisterRequest } from '../modules/register-request';

@Injectable({
  providedIn: 'root'
})
export class SubscribeServiceService {

  constructor(private httpClient : HttpClient) { }

  public register(registerRequest : RegisterRequest):Observable<string>{
    return this.httpClient.post<string>("/api/v0/public/subscribe",registerRequest);
  }
  public sendMessage(message :Message):Observable<string>{
    return this.httpClient.post<string>("/api/v0/public/help",message);
  }
  public resetPassword(email :string):Observable<string>{
    return this.httpClient.get<string>(`/api/v0/public/reset/${email}`);
  }
  
}
