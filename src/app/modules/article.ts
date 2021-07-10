export class Article {
    public id : number  = 0;
    public publisherId:number=0;
    public title : string  = "";
    public address : string = "";
    public country : string  = "";
    public state :string = "";
    public province : string = "";
    public description : string = "";
    public type : string = "";
    public price : number = 0;
    public priceType : string = "";
    public numberOfRoomMates : number  = 0;
    public remainingRoomMates : number  = 0;
    public mainImage:string = "";
    public images:Array<string>=new Array();
    constructor(){}
    
}
