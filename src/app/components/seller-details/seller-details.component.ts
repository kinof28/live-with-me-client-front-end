import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/modules/account';
import { AccountService } from 'src/app/services/account.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {
  client:Account|null = new Account();
  constructor(private accountService:AccountService,private searchService:SearchService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let articleId=Number(this.route.snapshot.paramMap.get("id"));
    let sellerId;
    this.searchService.getArticleById(articleId).subscribe(data=>{
      if(data===null){
        this.client=null;
        return;
      } 
      sellerId=data.publisherId;
    this.accountService.getById(sellerId).subscribe(data=>{
      this.client=data;
    })
    })
  }

}
