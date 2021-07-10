import { Account } from "./account";
import { Article } from "./article";

export class Notification {
    id:number=0;
    type:string="";
    article:Article=new Article();
    origin:Account=new Account();
}
