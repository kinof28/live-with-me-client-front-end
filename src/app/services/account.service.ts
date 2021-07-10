import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../modules/account';
import { Notification } from '../modules/notification';
import { UpdateClientRequest } from '../modules/update-client-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private httpClient :HttpClient) { }
  
  public getCurrent():Observable<Account>{
    return this.httpClient.get<Account>("/api/v0/client/");
  }
  public updateProfileImg(img:any ):Observable<string>{
    return this.httpClient.post<string>(`/api/v0/client/profile/img/`,img);
  }
  public updateProfile(updateClientRequest:UpdateClientRequest ):Observable<string>{
    return this.httpClient.put<string>(`/api/v0/client/update/`,updateClientRequest);
  }
  public getById(id:number):Observable<Account>{
    return this.httpClient.get<Account>(`/api/v0/client/${id}`);
  }
  public getNotifications():Observable<Notification[]>{
    return this.httpClient.get<Notification[]>("/api/v0/client/notifications");
  }
  public approave(articleId:number,clientId:number):Observable<string>{
    return this.httpClient.get<string>(`/api/v0/client/accept_join/${articleId}/${clientId}`);
  }
  public decline(articleId:number,clientId:number):Observable<string>{
    return this.httpClient.get<string>(`/api/v0/client/decline_join/${articleId}/${clientId}`);
  }
  public ignore(notificationId:number):Observable<string>{
    return this.httpClient.get<string>(`/api/v0/client/ignore/${notificationId}`);
  }
}
