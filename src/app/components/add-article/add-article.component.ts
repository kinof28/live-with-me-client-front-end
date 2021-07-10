import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AddArticleRequest } from 'src/app/modules/add-article-request';
import { Article } from 'src/app/modules/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  addArticleRequest : AddArticleRequest=new AddArticleRequest();
  message:string="";
  addInValid:boolean=false;
  invalid:boolean=false;
  uploadedImage:boolean=false;
  wait:boolean=false;
  counter: number = 0;
  imgs: Array<any> = new Array();
  files:Array<any>=new Array();
  id:string="";
  i:number=0;
  mainImageId:number=0;
  constructor(private articleService: ArticleService,private router:Router) { }

  ngOnInit(): void {
  }
  add(event:any): void {
    this.fill(event,this.counter);
  }
  submit():void{
    this.wait=true;
    this.articleService.addArticle(this.addArticleRequest).subscribe(data=>{
      if(data.startsWith("id")){
        this.id=(data.slice(3));
        if(this.uploadedImage){
          this.uploadImages();
        }
        else{
          this.router.navigateByUrl("/dashboard/my-articles");
        }
      }
      
    })
  }
  fill(event:any,id:number):void{
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.match(/image\/*/) === null) {
        this.message = "Only images are supported.";
        this.invalid = true;
        return;
      }
      if (event.target.files[0].size > 1048576) {
        this.message = "selected image is too big";
        return;
      }
      this.files[this.counter] = <File>event.target.files[0];
      this.message = "";
      this.invalid = false;
      var reader = new FileReader();
      reader.readAsDataURL(this.files[this.counter]);
      reader.onload = (_event) => {
        this.imgs[id] = reader.result;
      }
      this.uploadedImage=true;
      this.counter++;
      if(this.counter>6){
        this.addInValid=true;
        return;
      }
    }
  }
  delete(i:number):void{
    this.imgs.splice(i,1);
    this.files.splice(i,1);
    if(!(i>this.mainImageId))this.mainImageId--;
    if(this.mainImageId<0)this.mainImageId=0;
    this.counter--;
    this.addInValid=false;

  }
  uploadImages():void{
    this.articleService.addArticleImg(this.files[this.i],parseInt(this.id),this.i).subscribe(data=>{
      if(this.i===this.mainImageId)this.articleService.makeImgMain(data.slice(4),this.id).subscribe();
      this.i++;
      if(this.i>=this.files.length){
        this.router.navigateByUrl("/dashboard/my-articles");
        return;
      }
      else this.uploadImages();
    });
  }
  setMainImg(id:number):void{
    this.mainImageId=id;
  }


}
