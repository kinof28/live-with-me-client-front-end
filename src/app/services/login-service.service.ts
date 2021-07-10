import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../modules/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient: HttpClient) { }

  public login(loginRequest:LoginRequest):Observable<string>{
    return this.httpClient.post<string>("/api/v0/public/login/",loginRequest);
  }
  
}
