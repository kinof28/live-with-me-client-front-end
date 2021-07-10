import { Component, OnInit } from '@angular/core';
import { SellerRequest } from 'src/app/modules/seller-request';
import { SellerRequestService } from 'src/app/services/seller-request.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {

  canSubmit: boolean = false;
  faceImgUrl: any = "../../../assets/face.png";
  idImgUrl: any = "../../../assets/ID-front.png";
  message1: string = "";
  message2: string = "";
  messageR: string = "";
  messageG: string = "";
  invalid1: boolean = true;
  invalid2: boolean = true;
  invalid3: boolean = false;
  firstSelectedFile!: File;
  secondSelectedFile!: File;
  sellerRequest: SellerRequest = new SellerRequest();

  constructor(private sellerRequestService: SellerRequestService) { }

  ngOnInit(): void {
    this.sellerRequestService.canSubmit().subscribe(data => {
      if (data.startsWith("true")) this.canSubmit = true;
      else this.canSubmit = false;
    })

  }
  onSelectFile1(event: any): void {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.match(/image\/*/) === null) {
        this.message1 = "Only images are supported.";
        this.invalid1 = true;
        return;
      }

      this.firstSelectedFile = <File>event.target.files[0];
      if (this.firstSelectedFile.size > 1048576) {
        this.message1 = "selected image is too big";
        return;
      }
      this.message1 = "";
      this.invalid1 = false;
      var reader = new FileReader();
      reader.readAsDataURL(this.firstSelectedFile);
      reader.onload = (_event) => {
        this.faceImgUrl = reader.result;
      }

    }
  }
  onSelectFile2(event: any): void {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.match(/image\/*/) === null) {
        this.message2 = "Only images are supported.";
        this.invalid2 = true;
        return;
      }

      this.secondSelectedFile = <File>event.target.files[0];
      if (this.secondSelectedFile.size > 1048576) {
        this.message2 = "selected image is too big";
        return;
      }
      this.message2 = "";
      this.invalid2 = false;
      var reader = new FileReader();
      reader.readAsDataURL(this.secondSelectedFile);
      reader.onload = (_event) => {
        this.idImgUrl = reader.result;
      }

    }
  }
  submit(): void {
    const formData1 = new FormData();
    formData1.append("image", this.firstSelectedFile)
    this.sellerRequestService.addSellerRequestImg(formData1, 1).subscribe(data => {
      if (!data.startsWith("img")) {
        this.messageR = "some thing went wrong ... please try later";
        return;
      } else {
        this.sellerRequest.faceImg = data.slice(4);
        const formData2 = new FormData();
        formData2.append("image", this.secondSelectedFile)
        this.sellerRequestService.addSellerRequestImg(formData2, 2).subscribe(data => {
          if (!data.startsWith("img")) {
            this.messageR = "some thing went wrong ... please try later";
            return;
          } else {
            console.log(data);
            this.sellerRequest.idImg = data.slice(4);
            this.sellerRequestService.submitSellerRequest(this.sellerRequest).subscribe(data => {
              if (data.startsWith("submitted")) {
                this.messageG = ("your request submitted succefully");
                this.invalid3 = true;
              }
            });
          }
        })
      }
    })
  }

}
