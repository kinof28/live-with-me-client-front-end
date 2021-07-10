import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/modules/account';
import { UpdateClientRequest } from 'src/app/modules/update-client-request';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  client: Account = new Account();
  isSeller: boolean = false;
  imgUpdated: boolean = false;
  message: string = "";
  successMessage!: string;
  errMessage!: string;
  public confirmationPassword:string="";

  addressPlaceHolder: string = "please add your adress here "
  selectedFile!: File;
  updateClientRequest: UpdateClientRequest = new UpdateClientRequest();
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getCurrent().subscribe(data => {
      this.client = data;
      this.isSeller = data.isSeller;
      if (this.client.profileImg === "" || this.client.profileImg === null) {
        this.client.profileImg = "../../../assets/avatar7.png";
      } else {
        this.client.profileImg = `/api/v0/public/img/${this.client.id}`;
      }
    });
  }
  sell(): void {
    if (this.isSeller) {
      this.router.navigateByUrl("/dashboard/add");
    } else {
      this.router.navigateByUrl("/dashboard/submit-seller-request");
    }
  }
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.match(/image\/*/) === null) {
        this.message = "Only images are supported.";
        return;
      }
      this.selectedFile = <File>event.target.files[0];
      if(this.selectedFile.size>1048576){
        this.message="selected image is too big";
        return;
      }
      this.message = "";
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.client.profileImg = reader.result;
      }
      this.imgUpdated = true;

    }
  }
  updateHundle(): void {
    if(this.updateClientRequest.newPassword!==this.confirmationPassword){
      this.successMessage="";
      this.errMessage="please confirm your password";
      return;
    }
    if (this.imgUpdated) {
      this.updateProfileImg();
    }
    if (this.updateClientRequest.firstName ||
      this.updateClientRequest.lastName ||
      this.updateClientRequest.phoneNumber ||
      this.updateClientRequest.address ||
      this.updateClientRequest.newPassword) {
      this.accountService.updateProfile(this.updateClientRequest).subscribe(data=>{
        if(data.startsWith("updated")){
          this.successMessage="Account updated succcefuly";
          this.errMessage=""
        }
        else {
          this.successMessage="";
          this.errMessage="some thing went wrong";
        }
      });
      this.clearHundle();
    }

  }
  clearHundle(): void {
    this.updateClientRequest=new UpdateClientRequest();
    this.confirmationPassword="";
  }
  reloadHundle():void{
    window.location.reload();
  }
  private updateProfileImg(): void {
    
    const formData = new FormData();
    formData.append("image", this.selectedFile)
    this.accountService.updateProfileImg(formData).subscribe(data=>{
      if(data.startsWith(" img")){
        this.errMessage="";
        this.successMessage="Account updated succcefuly";
      }
      else{
        this.errMessage="some thing went wrong";
        this.successMessage="";
      } 
    });
  }
}
