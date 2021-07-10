import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/modules/account';
import { AccountService } from 'src/app/services/account.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-client-detailes',
  templateUrl: './client-detailes.component.html',
  styleUrls: ['./client-detailes.component.css']
})
export class ClientDetailesComponent implements OnInit {

  client:Account = new Account();
  constructor(private accountService:AccountService,private searchService:SearchService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let sellerId=Number(this.route.snapshot.paramMap.get("id"));
    this.accountService.getById(sellerId).subscribe(data=>{
      this.client=data;
    })
  }

}

