import { Account } from "./account";
import { Article } from "./article";

export class Deal {
    id:number=0;
    open:boolean=true;
    article:Article=new Article();
    requesters:Array<Account>=new Array();
    buyers:Array<Account>=new Array();
}
