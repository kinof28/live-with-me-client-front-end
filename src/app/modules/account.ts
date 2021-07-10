import { Article } from "./article";

export class Account {
    id: number=0;
    email: string="";
    firstName: string="";
    lastName: string="";
    phoneNumber: string="";
    address: string="";
    profileImg:any;
    isSeller: boolean=false;
    publishedArticles: Article[]=[];
    interestingArticles: Article[]=[];
    deals: number[]=[];
}
