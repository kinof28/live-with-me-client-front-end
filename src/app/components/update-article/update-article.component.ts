import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/modules/article';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  article: Article = new Article();
  message: string = "";
  oldImgs: Array<any> = new Array();
  newImgs: Array<any> = new Array();
  // imgs: Array<any> = new Array();
  files: Array<any> = new Array();
  mainImageId: number = 0;
  lastImageId: number = 0;
  // lastImageName:number=0;
  counter: number = 0;
  addInValid: boolean = false;
  invalid: boolean = false;
  uploadedImage: boolean = false;
  wait: boolean = false;
  // newMain :boolean=false;
  // updatedOldMain :boolean=false;
  i: number = 0;
  j: number = 0;
  private id: number = 0;
  constructor(private route: ActivatedRoute, private articleService: ArticleService, private SearchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.SearchService.getArticleById(this.id).subscribe(data => {
      this.article = data;
      if (data === null) return;
      this.articleService.getDealByArticleId(this.article.id).subscribe(data => {
        if (data.buyers.length >= 1) {
          this.router.navigateByUrl(`/dashboard/my-articles`);
        }
      })
      if (data.images === null || data.images.length < 1) return;
      this.oldImgs = data.images;
      this.lastImageId = data.images.length - 1;
      let lastImageName = Number(data.images[this.lastImageId].substring(0, data.images[this.lastImageId].indexOf(".")));
      this.i = lastImageName+1;
      let i: number = 0;
      for (let im of this.oldImgs) {
        if (data.mainImage === im) this.mainImageId = i;
        else i++;
      }
    })
  }
  add(event: any): void {
    this.fill(event, this.counter);
  }

  submit(): void {
    this.wait = true;
    this.articleService.updateArticle(this.article).subscribe(data => {
      if (data.startsWith("updated")) {
        if (this.uploadedImage === true) {
          this.uploadImages();
        }
        else{
          this.router.navigateByUrl("/dashboard/my-articles");
        }
      }
      
    })
  }
  setMainImg(id: number): void {
    this.mainImageId = id;
    this.uploadedImage = true;

  }

  fill(event: any, id: number): void {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.match(/image\/*/) === null) {
        this.message = "Only images are supported.";
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
        this.newImgs[id] = reader.result;
      }
      this.uploadedImage = true;
      this.counter++;
      if (this.counter > (7 - this.oldImgs.length - 1)) {
        this.addInValid = true;
        return;
      }
    }
  }
  deleteOld(i: number): void {
    this.articleService.deleteArticleimage(this.article.id, this.oldImgs[i]).subscribe(data => {
      this.oldImgs.splice(i, 1);
      this.lastImageId--;
      if (!(i > this.mainImageId)) {
        this.mainImageId--;
      }
      if (this.mainImageId < 0) this.mainImageId = 0;
      this.addInValid = false;
    });
    this.uploadedImage = true;

  }
  deleteNew(i: number): void {
    this.newImgs.splice(i, 1);
    this.files.splice(i, 1);
    if (!((i + this.lastImageId + 1) > this.mainImageId)) this.mainImageId--;
    if (this.mainImageId < 0) this.mainImageId = 0;
    this.counter--;
    this.addInValid = false;
    this.uploadedImage = true;

  }
  uploadImages(): void {
    if (this.j >= this.files.length) {
      if ((this.mainImageId <= this.lastImageId) && (this.article.mainImage !== this.oldImgs[this.mainImageId])) {
        this.articleService.makeImgMain(this.oldImgs[this.mainImageId], String(this.id)).subscribe();
      }
      this.router.navigateByUrl("/dashboard/my-articles");
      return;
    }
    this.articleService.addArticleImg(this.files[this.j], this.id, this.i).subscribe(data => {
      if (this.mainImageId > this.lastImageId) {
        if (this.j+this.lastImageId+1 === this.mainImageId) {
          console.log("updationg withing new images");
          this.articleService.makeImgMain(data.slice(4), String(this.id)).subscribe();
        }
      }
      this.i++;
      this.j++;
      
      this.uploadImages();
    });
  }
}
