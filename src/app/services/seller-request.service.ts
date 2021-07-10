import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerRequest } from '../modules/seller-request';

@Injectable({
  providedIn: 'root'
})
export class SellerRequestService {

  constructor(private httpClient:HttpClient) { }

  
  submitSellerRequest(sellerRequest:SellerRequest):Observable<string>{
    return this.httpClient.post<string>("api/v0/client/seller",sellerRequest);
  }
  addSellerRequestImg(img:any,id:number):Observable<string>{
    return this.httpClient.post<string>(`api/v0/client/seller/img/${id}`,img);
  }
  canSubmit():Observable<string>{
    return this.httpClient.get<string>("api/v0/client/cansubmit");
  }
}
