import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isLogedIn():boolean{
    return localStorage.getItem("JWT token")!==null;
  }
  public login(authorisation:string):void{
    localStorage.setItem("JWT token",authorisation)
  }
  public logout():void{
    localStorage.clear();
  }
}
