import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string ="";
  constructor(private router:Router) { }
  search():void{
    this.router.navigateByUrl(`/search/${this.searchText}`);
  }
  ngOnInit(): void {
  }

}
